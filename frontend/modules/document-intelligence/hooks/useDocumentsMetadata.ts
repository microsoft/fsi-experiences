import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IDocumentsMetadata } from '../interfaces';
import { IDocumentPipelineStatusMessage } from '../interfaces/IDocumentInsight';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';

export type DocPipelineStatusToMessage = {
    [key: number]: IDocumentPipelineStatusMessage;
};

export interface IPipelineMessagesResponse {
    statuses: DocPipelineStatusToMessage;
    metadata?: IDocumentsMetadata;
    isError: boolean;
    isLoading: boolean;
}

export const useDocumentsMetadata = (fetcher: IDocumentBaseFetcher): IPipelineMessagesResponse => {
    const {
        data: metadata,
        isLoading,
        isError,
        isFetched,
    } = useQuery([`documents-metadata`, fetcher.regardingEntity], () => fetcher.getDocumentsMetadata(), {
        cacheTime: Infinity,
        staleTime: Infinity,
    });

    const statuses = useMemo(
        () =>
            (metadata?.pipelineMessages || []).reduce((previousValue: DocPipelineStatusToMessage, currentValue: IDocumentPipelineStatusMessage) => {
                previousValue[currentValue.status] = currentValue;
                return previousValue;
            }, {}),
        [metadata]
    );

    return {
        statuses,
        metadata,
        isError,
        isLoading: isLoading || !isFetched,
    };
};
