import { useMutation } from 'react-query';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { IAddDocumentRequestData } from '../interfaces/IDocument';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { useDocumentsMetadata } from './useDocumentsMetadata';
import { GROUPED_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';

export const useCreateDocumentRequest = (fetcher: IDocumentsFetcher) => {
    const { metadata } = useDocumentsMetadata(fetcher);
    return useMutation(
        (params: IAddDocumentRequestData) =>
            fetcher.createDocumentRequest({
                ...params,
                contextEntitySetName: metadata?.contextEntitySetName,
                contextRelationshipName: metadata?.contextRelationshipName,
                regardingEntitySetName: metadata?.regardingEntitySetName,
                regardingRelationshipName: metadata?.regardingRelationshipName,
            }),
        {
            onSuccess: (data, vars) => {
                queryClient.resetQueries([GROUPED_DOCUMENTS_QUERY_KEY, vars.contextId || '']);
            },
        }
    );
};
