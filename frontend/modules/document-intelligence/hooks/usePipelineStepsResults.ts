import { useQuery } from 'react-query';
import { useEffect, useMemo, useRef } from 'react';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { IStepDefinition, IStepResultWithDefinition } from '../interfaces/IDocumentInsight';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';
import { DELAY_DOC_RESET_QUERY, REFETCH_FETCH_INTERVAL } from '../constants/DocumentIntelligence.const';
import { StepStatuses } from '../constants/StepStatuses.const';
import { GET_STEPS_RESULTS_QUERY_KEY, GROUPED_DOCUMENTS_QUERY_KEY, SINGLE_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';
import { IDocumentRequest } from '../interfaces';
import { PipelineStatus } from '../constants';

export interface IPipelineStepsResponse {
    pipelineSteps: IStepResultWithDefinition[];
    isError: boolean;
    isLoading: boolean;
}

export const usePipelineStepsResults = (
    fetcher: IDocumentBaseFetcher,
    options: {
        stepsDefinitions: IStepDefinition[];
        document?: IDocumentRequest;
    }
): IPipelineStepsResponse => {
    const { stepsDefinitions, document } = options;
    const { pipelineResult, id: documentId, contextId } = document || {};

    const pipelineId = pipelineResult?.id || '';
    const isPipelineRunning = !pipelineResult?.pipelineStatus || pipelineResult?.pipelineStatus === PipelineStatus.Running;

    const initialPipelineId = useRef(pipelineId);
    const {
        data: stepResults,
        isLoading,
        isError,
    } = useQuery([GET_STEPS_RESULTS_QUERY_KEY, pipelineId], () => fetcher.getPipelineStepsResults(pipelineId || ''), {
        cacheTime: 0,
        staleTime: 0,
        refetchInterval: () => (isPipelineRunning ? REFETCH_FETCH_INTERVAL : 0),
        enabled: !!pipelineId,
    });

    const pipelineSteps = useMemo(
        () =>
            stepsDefinitions.map((definition: IStepDefinition) => {
                const result = stepResults?.[definition.id];

                if (!result) return { ...definition, skipped: !isPipelineRunning };

                const fieldDefinitions = definition.fields || [];

                const fields = fieldDefinitions.map(fieldDefinition => {
                    const fieldResult = result.fields?.[fieldDefinition.id];

                    return {
                        ...fieldDefinition,
                        ...(fieldResult || {}),
                    };
                });

                return {
                    ...definition,
                    ...result,
                    fields,
                };
            }),
        [stepsDefinitions, stepResults, isPipelineRunning]
    ) as IStepResultWithDefinition[];

    useEffect(() => {
        const isCompleted = pipelineSteps.length && pipelineSteps.every(step => step.status && step.status !== StepStatuses.Running);

        if (isCompleted) {
            setTimeout(() => {
                queryClient.invalidateQueries([GROUPED_DOCUMENTS_QUERY_KEY, contextId]);
                queryClient.invalidateQueries([SINGLE_DOCUMENTS_QUERY_KEY, documentId]);
            }, DELAY_DOC_RESET_QUERY);
        }
    }, [pipelineSteps, contextId, documentId]);

    useEffect(() => {
        if (!pipelineResult?.pipelineStatus || pipelineResult.pipelineStatus === PipelineStatus.Running) {
            return;
        }
        queryClient.invalidateQueries([GET_STEPS_RESULTS_QUERY_KEY, pipelineResult.id]);
    }, [pipelineResult]);

    return {
        pipelineSteps,
        isError,
        isLoading: isLoading && !!initialPipelineId.current,
    };
};
