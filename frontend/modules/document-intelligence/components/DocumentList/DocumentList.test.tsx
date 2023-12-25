import React from 'react';
import { render } from '@testing-library/react';
import DocumentList from './DocumentList';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';

const docCardMocked = jest.fn();
jest.mock('../DocumentCard/DocumentCard', () => props => {
    docCardMocked(props);
    return <li data-testid="card"></li>;
});
describe('DocumentList', () => {
    const documents = [mockedDocuments.missingFileDocMock, mockedDocuments.approvedDocMock];
    const callbacks = {
        onDocumentDelete: jest.fn(),
        onFileView: jest.fn(),
        onFileUpload: jest.fn(),
    };

    beforeEach(() => {
        docCardMocked.mockReset();
    });

    it('Should render document list', () => {
        const { getAllByRole, getByRole } = render(<DocumentList documents={documents} {...callbacks} />);

        expect(getByRole('list')).toBeVisible();
        expect(getAllByRole('listitem')).toHaveLength(documents.length);
    });

    it('Should have render document card with the right props', () => {
        render(<DocumentList documents={documents} {...callbacks} />);

        expect(docCardMocked).toHaveBeenCalledTimes(documents.length);
        expect(docCardMocked).toHaveBeenNthCalledWith(1, expect.objectContaining({ document: documents[0] }));
        expect(docCardMocked).toHaveBeenNthCalledWith(2, expect.objectContaining({ document: documents[1] }));
    });
});
