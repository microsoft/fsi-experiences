import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IDocumentRequest, IDocumentsMetadata } from '../interfaces/IDocument';
import { IDocumentPipelineResult } from '../interfaces/IDocumentInsight';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { DocumentSectionKey, REFETCH_DOCUMENT_INTERVAL, StatusToSectionMapping } from '../constants/DocumentIntelligence.const';
import { useDocumentsMetadata } from './useDocumentsMetadata';
import { GROUPED_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';

export type DocumentToSectionMapping = {
    [key in DocumentSectionKey]: IDocumentRequest[];
};

export interface IUseGroupedDocumentsResponse {
    sections: DocumentToSectionMapping;
    allDocuments: IDocumentRequest[];
    metadata?: IDocumentsMetadata;
    isError: boolean;
    isLoading: boolean;
    refetch: Function;
}

export const useGroupedDocuments = (fetcher: IDocumentsFetcher, contextId: string, search?: string): IUseGroupedDocumentsResponse => {
    const { data, isLoading, isError, isFetched, refetch } = useQuery(
        [GROUPED_DOCUMENTS_QUERY_KEY, contextId, search],
        () => fetcher.getDocuments(contextId, search),
        {
            cacheTime: 0,
            staleTime: 0,
            refetchInterval: search ? 0 : REFETCH_DOCUMENT_INTERVAL,
            refetchOnWindowFocus: true,
        }
    );

    const { statuses, metadata, isLoading: isLoadingMessages, isError: isErrorMessages } = useDocumentsMetadata(fetcher);

    const documents = useMemo(
        () =>
            (data || [])
                .map((document: IDocumentRequest) => {
                    const pipelineResult: IDocumentPipelineResult | undefined = document.pipelineResult && {
                        ...document.pipelineResult,
                        docPipelineStatusMessage: statuses[document.pipelineResult.docStatus],
                    };
                    return { ...document, pipelineResult };
                })
                .sort((a, b) => {
                    if (b.status !== a.status) {
                        return b.status - a.status;
                    }
                    return (b.lastStatusDate?.getTime() || 0) - (a.lastStatusDate?.getTime() || 0);
                }),
        [data, statuses]
    );

    const sections = useMemo(
        () =>
            documents.reduce(
                (previousValue: DocumentToSectionMapping, currentValue: IDocumentRequest) => {
                    previousValue[StatusToSectionMapping[currentValue.status] || 'ACTION_REQUIRED'].push(currentValue);
                    return previousValue;
                },
                {
                    FOR_REVIEW: [],
                    ACTION_REQUIRED: [],
                    APPROVED: [],
                } as DocumentToSectionMapping
            ),
        [documents]
    );

    return {
        sections,
        allDocuments: documents,
        metadata,
        isError: isErrorMessages || isError,
        isLoading: isLoadingMessages || isLoading || !isFetched,
        refetch,
    };
};
