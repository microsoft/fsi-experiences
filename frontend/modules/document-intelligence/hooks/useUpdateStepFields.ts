import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { useMutation } from 'react-query';
import { GET_STEPS_RESULTS_QUERY_KEY } from '../constants/DocumentQueries.const';
import { IDocumentBaseFetcher, UpdateStepFieldDataProps } from '../interfaces/IDocumentsFetcher';

export const useUpdateStepFields = (fetcher: IDocumentBaseFetcher, pipelineId?: string, options?: any) => {
    const {
        isLoading,
        isError,
        mutate: onSave,
    } = useMutation(async (updateStepFieldsObj: UpdateStepFieldDataProps) => {
        await fetcher.updateStepFieldsData(updateStepFieldsObj);

        if (pipelineId) {
            await queryClient.invalidateQueries([GET_STEPS_RESULTS_QUERY_KEY, pipelineId]);
        }
    }, options);

    return {
        isLoading,
        isError,
        onSave,
    };
};
