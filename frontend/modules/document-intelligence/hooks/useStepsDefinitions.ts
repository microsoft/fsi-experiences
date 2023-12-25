import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';
import { IStepDefinition } from '../interfaces';
import { useQuery } from 'react-query';

export interface IStepsDefinitionResponse {
    stepsDefinitions?: IStepDefinition[];
    isError: boolean;
    isLoading: boolean;
}

export const useStepsDefinitions = (fetcher: IDocumentBaseFetcher, documentDefinitionId: string): IStepsDefinitionResponse => {
    const { data, isLoading, isError, isFetched } = useQuery(
        `steps-definition-${documentDefinitionId}`,
        () => fetcher.getStepsDefinitions(documentDefinitionId),
        {
            cacheTime: Infinity,
            staleTime: Infinity,
        }
    );
    return {
        stepsDefinitions: data,
        isError,
        isLoading: isLoading || !isFetched,
    };
};
