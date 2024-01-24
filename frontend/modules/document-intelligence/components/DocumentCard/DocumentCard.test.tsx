import React from 'react';
import { render } from '@testing-library/react';
import { DocumentCard } from './DocumentCard';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import { IDocumentRecommendationProps } from '../DocumentRecommendation/DocumentRecommendation.interface';
import { IDocumentCardFooterProps } from '../DocumentCardFooter/DocumentCardFooter.interface';
import { HAS_FILE_CLASS } from './DocumentCard.const';
import { IDocumentRegardingProps } from '../DocumentRegarding/DocumentRegarding.interface';

const docRecMocked = jest.fn();
jest.mock('../DocumentRecommendation/DocumentRecommendation', () => (props: IDocumentRecommendationProps) => {
    docRecMocked(props);
    return <span data-testid="doc-rec-mocked" />;
});

const docFooterMocked = jest.fn();
jest.mock('../DocumentCardFooter/DocumentCardFooter', () => (props: IDocumentCardFooterProps) => {
    docFooterMocked(props);
    return <span data-testid="doc-footer" />;
});

const docRegardingMocked = jest.fn();
jest.mock('../DocumentRegarding/DocumentRegarding', () => (props: IDocumentRegardingProps) => {
    docRegardingMocked(props);
    return <span data-testid="doc-regarding" />;
});

const callbacks = {
    onDocumentDelete: jest.fn(),
    onFileView: jest.fn(),
    onUpload: jest.fn(),
};

describe('[Document Intelligence] DocumentCard', () => {
    beforeEach(() => {
        docRegardingMocked.mockReset();
        docFooterMocked.mockReset();
        docRecMocked.mockReset();
        Object.values(callbacks).forEach(callback => {
            callback.mockReset();
        });
    });

    it('Should render missing file document card', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { getByRole } = render(<DocumentCard document={document} {...callbacks} />);

        expect(docRegardingMocked).toHaveBeenCalledWith(
            expect.objectContaining({
                regarding: document.regarding,
            })
        );
        expect(docFooterMocked).toHaveBeenCalledWith({ document, ...callbacks });
        expect(docRecMocked).not.toBeCalled();

        expect(getByRole('listitem')).not.toHaveClass(HAS_FILE_CLASS);
    });

    it('Should render handled document card', () => {
        const document = mockedDocuments.approvedDocMock;
        const { getByRole } = render(<DocumentCard document={document} {...callbacks} />);

        expect(docRegardingMocked).toHaveBeenCalledWith(
            expect.objectContaining({
                regarding: document.regarding,
            })
        );
        expect(docFooterMocked).toHaveBeenCalledWith({ document, ...callbacks });
        expect(docRecMocked).not.toBeCalled();

        expect(getByRole('listitem')).toHaveClass(HAS_FILE_CLASS);
    });

    it('Should render pending review document card', () => {
        const document = mockedDocuments.pendingReviewDocMock;
        const { getByRole } = render(<DocumentCard document={document} {...callbacks} />);

        expect(docRegardingMocked).toHaveBeenCalledWith(
            expect.objectContaining({
                regarding: document.regarding,
            })
        );
        expect(docFooterMocked).toHaveBeenCalledWith({ document, ...callbacks });
        expect(docRecMocked).not.toBeCalled();

        expect(getByRole('listitem')).toHaveClass(HAS_FILE_CLASS);
    });

    it('Should render pending review document card with rec', () => {
        const document = mockedDocuments.recRejectDocMock;
        const { pipelineResult } = document;
        const { getByRole } = render(<DocumentCard document={document} {...callbacks} />);

        expect(docRegardingMocked).toHaveBeenCalledWith(
            expect.objectContaining({
                regarding: document.regarding,
            })
        );
        expect(docFooterMocked).toHaveBeenCalledWith({ document, ...callbacks });
        expect(docRecMocked).toHaveBeenCalledWith({ pipelineResult });

        expect(getByRole('listitem')).toHaveClass(HAS_FILE_CLASS);
    });

    it('Should call onFileView when clicking on the document', () => {
        const document = mockedDocuments.approvedDocMock;
        const { getByRole } = render(<DocumentCard document={document} {...callbacks} />);

        getByRole('listitem').click();

        expect(callbacks.onFileView).toHaveBeenCalledWith(document);
    });

    it('Should not call onFileView when clicking on the missing file document', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { getByRole } = render(<DocumentCard document={document} {...callbacks} />);

        getByRole('listitem').click();

        expect(callbacks.onFileView).not.toHaveBeenCalled();
    });

    it('Should show description in card', () => {
        const document = mockedDocuments.docMockIncludeDescription;
        const { getByText } = render(<DocumentCard document={document} {...callbacks} showDescription={true} />);

        expect(getByText('test description')).toBeVisible();
    });
});
