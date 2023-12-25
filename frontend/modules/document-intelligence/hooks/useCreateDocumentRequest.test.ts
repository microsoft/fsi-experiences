import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as regardingEntities from '../interfaces/mocks/RegardingData.mock';
import * as definitions from '../interfaces/mocks/DocumentDefinition.mock';
import { IAddDocumentRequestData } from '../interfaces/IDocument';
import { useCreateDocumentRequest } from './useCreateDocumentRequest';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    createDocumentRequest: (data: IAddDocumentRequestData) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    createDocumentRequest: (data: IAddDocumentRequestData) => Promise.resolve({ id: 'test' }),
} as IDocumentsFetcher;

const request: IAddDocumentRequestData = {
    contextId: 'contextId',
    regarding: regardingEntities.regardingPrimaryMock,
    definition: definitions.docDefinitionIdentity,
};

describe('useCreateDocumentRequest', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call createDocumentRequest', async () => {
        const createDocumentRequestSpy = jest.spyOn(simpleFetcher, 'createDocumentRequest');
        const { result } = renderHook(() => useCreateDocumentRequest(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });

        result.current.mutate(request);
        await waitFor(() => !result.current.isLoading);
        expect(createDocumentRequestSpy).toBeCalledWith(request);
    });

    it('Should return an error when uploading failed after loading', async () => {
        const createDocumentRequestSpy = jest.spyOn(errorFetcher, 'createDocumentRequest');
        const { result } = renderHook(() => useCreateDocumentRequest(errorFetcher), {
            wrapper: QueryClientWrapper,
        });

        result.current.mutate(request);
        await waitFor(() => !result.current.isLoading);
        expect(createDocumentRequestSpy).toBeCalledWith(request);
        expect(result.current.isError).toBeTruthy();
    });
});
