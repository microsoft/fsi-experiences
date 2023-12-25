import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { MockDocumentDetailsFetcher } from '../../interfaces/mocks/MockDocumentDetailsFetcher';
import DocumentIntelligenceDetails from './DocumentIntelligenceDetails';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import { IDocumentDetailsFetcher } from '../../interfaces/IDocumentsFetcher';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';

const mockFetcher = new MockDocumentDetailsFetcher();
const documentId = '123';
mockFetcher.getSingleDocument = (id: string) => Promise.resolve(mockedDocuments.recUnclearDocMock);

const docDetailsViewMocked = jest.fn();
let detailsViewProps;
jest.mock('../DocumentDetailsView/DocumentDetailsView', () => props => {
    docDetailsViewMocked(props);
    detailsViewProps = props;
    return <span data-testid="document-details-view-mock" />;
});

const renderDocumentIntelligenceDetails = (fetcher: IDocumentDetailsFetcher = mockFetcher) => {
    return render(<DocumentIntelligenceDetails fetcher={fetcher} documentId={documentId} />, { wrapper: QueryClientWrapper });
};

describe('DocumentIntelligenceDetails', () => {
    beforeEach(() => {
        docDetailsViewMocked.mockReset();
        testingQueryClient.clear();
    });

    it('Should render widget loading', () => {
        const { getByTestId } = renderDocumentIntelligenceDetails();
        expect(getByTestId('loading-spinner')).toBeVisible();
        expect(getByTestId('doc-details-widget')).toBeVisible();
    });

    it('Should render documents details', async () => {
        const { getByTestId } = renderDocumentIntelligenceDetails();
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(getByTestId('document-details-view-mock')).toBeVisible();
        expect(docDetailsViewMocked).toHaveBeenCalledWith(
            expect.objectContaining({ document: mockedDocuments.recUnclearDocMock, fetcher: mockFetcher })
        );
    });
});
