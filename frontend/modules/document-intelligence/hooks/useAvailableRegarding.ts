import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IDocumentRegarding } from '../interfaces';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';

export interface IPipelineMessagesResponse {
    regardingEntities?: IDocumentRegarding[];
    isError: boolean;
    isLoading: boolean;
    refetch: Function;
}

export const useAvailableRegarding = (fetcher: IDocumentsFetcher, contextId: string): IPipelineMessagesResponse => {
    const { data, isLoading, isError, isFetched, refetch } = useQuery([`document-regarding-entities`, contextId], () =>
        fetcher.getContextRegardingEntities(contextId)
    );

    const regardingEntities = useMemo(
        () => (data || []).sort(({ isPrimary: primaryA }, { isPrimary: primaryB }) => (primaryA === primaryB ? 0 : primaryA ? -1 : 1)),
        [data]
    );
    return {
        refetch,
        regardingEntities,
        isError,
        isLoading: isLoading || !isFetched,
    };
};
