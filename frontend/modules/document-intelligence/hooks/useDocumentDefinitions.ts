import { useQuery } from 'react-query';
import { IDocumentDefinition } from '../interfaces';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';

export interface IPipelineMessagesResponse {
    definitions?: IDocumentDefinition[];
    isError: boolean;
    isLoading: boolean;
}

export const useDocumentDefinitions = (fetcher: IDocumentsFetcher): IPipelineMessagesResponse => {
    const { data, isLoading, isError, isFetched } = useQuery(`document-definitions`, () => fetcher.getDocumentDefinitions(), {
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    return {
        definitions: data,
        isError,
        isLoading: isLoading || !isFetched,
    };
};
