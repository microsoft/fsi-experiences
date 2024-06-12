import { useMutation, useQueryClient } from 'react-query';
import { GROUPED_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';
import { IDocumentRequest } from '../interfaces/IDocument';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';

export interface IUpdateDocumentDescriptionMutationParams {
    document: IDocumentRequest;
    description: string;
}

export const useUpdateDocumentDescription = (fetcher: IDocumentBaseFetcher) => {
    const queryClient = useQueryClient();
    return useMutation((params: IUpdateDocumentDescriptionMutationParams) => fetcher.updateDocumentDescription(params.document, params.description), {
        onSuccess: data => {
            /* istanbul ignore next */
            queryClient.invalidateQueries([GROUPED_DOCUMENTS_QUERY_KEY, data.contextId || '']);
        },
    });
};
