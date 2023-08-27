import { useMutation } from 'react-query';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { IDocumentRequest } from '../interfaces/IDocument';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';
import { GROUPED_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';

export interface IDeleteDocumentMutationParams {
    document: IDocumentRequest;
    deleteRequest: boolean;
}

export const useDeleteDocument = (fetcher: IDocumentBaseFetcher, contextId = '') => {
    return useMutation((params: IDeleteDocumentMutationParams) => fetcher.removeDocument(params.document, params.deleteRequest), {
        onSuccess: () => {
            /* istanbul ignore next */
            queryClient.resetQueries([GROUPED_DOCUMENTS_QUERY_KEY, contextId]);
        },
    });
};
