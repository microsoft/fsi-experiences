import { renderHook } from '@testing-library/react-hooks';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import * as documents from '../interfaces/mocks/DocumentData.mock';
import { IDocumentRequest } from '../interfaces/IDocument';
import { useUpdateDocumentDescription } from './useUpdateDocumentDescription';
import { waitFor } from '@testing-library/react';

const mockFetcher = new MockDocumentsFetcher();

const simpleFetcher = {
    ...mockFetcher,
    updateDocumentDescription: (document: IDocumentRequest, description: string) => Promise.resolve({ ...document, description }),
} as IDocumentsFetcher;

const notificationShowMocked = jest.fn();
jest.mock('@fsi/core-components/dist/hooks/useNotificationService/useNotificationService', () => ({
    useNotificationService: () => ({
        show: notificationShowMocked,
    }),
}));

describe('useUpdateDocumentDescription', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should call useUpdateDocumentDescription', async () => {
        const updateDocumentDescriptionSpy = jest.spyOn(simpleFetcher, 'updateDocumentDescription');
        const { result } = renderHook(() => useUpdateDocumentDescription(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            document: documents.docMockIncludeDescription,
            description: 'test description',
        };

        result.current.mutate(params);
        await waitFor(() => {
            expect(updateDocumentDescriptionSpy).toBeCalledWith(params.document, params.description);
        });
    });
});
