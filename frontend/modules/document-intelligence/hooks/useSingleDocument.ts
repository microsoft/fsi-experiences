import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { REFETCH_DOCUMENT_INTERVAL } from '../constants/DocumentIntelligence.const';
import { SINGLE_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';
import { IDocumentRequest, IDocumentsMetadata } from '../interfaces/IDocument';
import { IDocumentPipelineResult } from '../interfaces/IDocumentInsight';
import { IDocumentDetailsFetcher } from '../interfaces/IDocumentsFetcher';
import { useDocumentsMetadata } from './useDocumentsMetadata';

export interface IUseSingleDocumentResponse {
    document?: IDocumentRequest;
    metadata?: IDocumentsMetadata;
    isError: boolean;
    isLoading: boolean;
}

export const useSingleDocument = (fetcher: IDocumentDetailsFetcher, docId: string): IUseSingleDocumentResponse => {
    const { data, isLoading, isError, isFetched } = useQuery([SINGLE_DOCUMENTS_QUERY_KEY, docId], () => fetcher.getSingleDocument(docId), {
        cacheTime: 0,
        staleTime: 0,
        refetchInterval: REFETCH_DOCUMENT_INTERVAL,
        refetchOnWindowFocus: true,
    });

    const { statuses, metadata, isLoading: isLoadingMessages, isError: isErrorMessages } = useDocumentsMetadata(fetcher);

    const document = useMemo(() => {
        if (!data) {
            return undefined;
        }
        const pipelineResult: IDocumentPipelineResult | undefined = data.pipelineResult && {
            ...data.pipelineResult,
            docPipelineStatusMessage: statuses[data.pipelineResult.docStatus],
        };
        return { ...data, pipelineResult };
    }, [data, statuses]);

    return {
        document,
        metadata,
        isError: isErrorMessages || isError,
        isLoading: isLoadingMessages || isLoading || !isFetched,
    };
};
