import { useQuery } from 'react-query';
import { IDocumentFile } from '../interfaces/IDocumentFile';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';

export interface IPipelineMessagesResponse {
    file?: IDocumentFile;
    isError: boolean;
    isLoading: boolean;
}

export const useDocumentFile = (fetcher: IDocumentBaseFetcher, documentId?: string): IPipelineMessagesResponse => {
    /* istanbul ignore next */
    const {
        data: file,
        isLoading,
        isError,
        isFetched,
    } = useQuery([`get-document-file`, documentId], () => fetcher.getDocumentFile(documentId || ''), {
        cacheTime: 0,
        staleTime: 0,
        enabled: !!documentId,
    });

    return {
        file,
        isError,
        isLoading: isLoading || !isFetched,
    };
};
