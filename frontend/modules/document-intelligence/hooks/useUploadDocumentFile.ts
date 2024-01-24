import { useMutation } from 'react-query';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { IDocumentRequest } from '../interfaces/IDocument';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';
import { GROUPED_DOCUMENTS_QUERY_KEY, SINGLE_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';

export interface IUploadMutationParams {
    document: IDocumentRequest;
    file: File;
}

export const useUploadDocumentFile = (fetcher: IDocumentBaseFetcher, contextId = '') => {
    return useMutation((params: IUploadMutationParams) => fetcher.uploadDocument(params.document, params.file), {
        onSuccess: data => {
            queryClient.resetQueries([GROUPED_DOCUMENTS_QUERY_KEY, contextId]);
            queryClient.resetQueries([SINGLE_DOCUMENTS_QUERY_KEY, data.id]);
        },
    });
};
