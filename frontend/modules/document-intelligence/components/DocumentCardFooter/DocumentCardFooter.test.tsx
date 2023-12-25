import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DocumentCardFooter } from './DocumentCardFooter';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import { IUploadFileButtonProps } from '../UploadFileButton/UploadFileButton.interface';
import { IDocumentStatusTagProps } from '../DocumentStatusTag/DocumentStatusTag.interface';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';

const statusTagMocked = jest.fn();
jest.mock('../DocumentStatusTag/DocumentStatusTag', () => (props: IDocumentStatusTagProps) => {
    statusTagMocked(props);
    return <span data-testid="status-tag-mocked" />;
});

let mockUploadFunction;
const file = new File([], 'test');
jest.mock('../UploadFileButton/UploadFileButton', () => (props: IUploadFileButtonProps) => {
    mockUploadFunction = () => props.onUpload(file);
    return <button disabled={props.disabled} data-testid={`upload-file-btn-mocked-${props.isMissingFile ? 'missing' : 'not-missing'}`} />;
});

const callbacks = {
    onDocumentDelete: jest.fn(),
    onFileView: jest.fn(),
    onUpload: jest.fn(),
};

describe('[Document Intelligence] DocumentCardFooter', () => {
    beforeEach(() => {
        Object.values(callbacks).forEach(callback => {
            callback.mockReset();
        });
    });

    it('Should render footer for document with rejected status', () => {
        const document = mockedDocuments.rejectedDocMock;
        const { status, autoUpdated } = document;
        const { getByTestId } = render(<DocumentCardFooter document={document} {...callbacks} />);

        expect(getByTestId('document-card-footer')).toBeVisible();
        expect(getByTestId('status-tag-mocked')).toBeVisible();
        expect(getByTestId('upload-file-btn-mocked-not-missing')).toBeVisible();
        expect(statusTagMocked).toBeCalledWith({ status, autoUpdated });

        mockUploadFunction();
        expect(callbacks.onUpload).toBeCalledWith(document, file);
    });

    it('Should render footer for document with auto approved status', () => {
        const document = mockedDocuments.approvedDocMock;
        const { status, autoUpdated } = document;
        const { getByTestId, queryByTestId } = render(<DocumentCardFooter document={document} {...callbacks} />);

        expect(getByTestId('document-card-footer')).toBeVisible();
        expect(getByTestId('status-tag-mocked')).toBeVisible();
        expect(queryByTestId('upload-file-btn-mocked-not-missing')).toBeNull();
        expect(statusTagMocked).toBeCalledWith({ status, autoUpdated });
    });

    it('Should render footer for missing file document', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { status, autoUpdated } = document;
        const { getByTestId } = render(<DocumentCardFooter document={document} {...callbacks} />);

        expect(getByTestId('status-tag-mocked')).toBeVisible();
        expect(getByTestId('upload-file-btn-mocked-missing')).toBeVisible();
        expect(statusTagMocked).toBeCalledWith({ status, autoUpdated });
        mockUploadFunction();
        expect(callbacks.onUpload).toBeCalledWith(document, file);
    });

    it('Should render footer for pending document', () => {
        const document = mockedDocuments.recInProgressDocMock;
        const { status, autoUpdated } = document;
        const { queryByTestId, getByText } = render(<DocumentCardFooter document={document} {...callbacks} />);

        expect(getByText(commonStrings.REVIEW)).toBeVisible();
        expect(queryByTestId('upload-file-btn-mocked-missing')).toBeNull();
        expect(statusTagMocked).toBeCalledWith({ status, autoUpdated });
        mockUploadFunction();

        fireEvent.click(getByText(commonStrings.REVIEW));
        expect(callbacks.onFileView).toBeCalledWith(document);
    });

    it('Should render footer and allow deleting document', () => {
        const document = mockedDocuments.approvedDocMock;
        const { getByTestId, getByText, queryByText } = render(<DocumentCardFooter document={document} {...callbacks} />);

        fireEvent.click(getByTestId('more-button'));

        expect(queryByText(diStrings.REMOVE_DOCUMENT_BUTTON_TEXT)).not.toBeNull();
        expect(queryByText(diStrings.REMOVE_REQUEST_BUTTON_TEXT)).not.toBeNull();

        fireEvent.click(getByText(diStrings.REMOVE_DOCUMENT_BUTTON_TEXT));

        expect(callbacks.onDocumentDelete).toBeCalledWith(document, false);
    });

    it('Should render footer and allow deleting request', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { getByTestId, getByText } = render(<DocumentCardFooter document={document} {...callbacks} />);

        fireEvent.click(getByTestId('more-button'));
        fireEvent.click(getByText(diStrings.REMOVE_REQUEST_BUTTON_TEXT));

        expect(callbacks.onDocumentDelete).toBeCalledWith(document, true);
    });

    it('Should render footer without delete request option when missing file', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { getByTestId, getByText, queryByText } = render(<DocumentCardFooter document={document} {...callbacks} />);

        fireEvent.click(getByTestId('more-button'));
        expect(queryByText(diStrings.REMOVE_DOCUMENT_BUTTON_TEXT)).toBeNull();
    });

    it('Should disable delete button', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { getByTestId } = render(<DocumentCardFooter disableDelete document={document} {...callbacks} />);

        fireEvent.click(getByTestId('more-button'));
        expect(getByTestId('remove-req-btn').getAttribute('aria-disabled')).toEqual('true');
    });

    it('Should disable update buttons', () => {
        const document = mockedDocuments.missingFileDocMock;
        const { getByTestId } = render(<DocumentCardFooter disableUpdate document={document} {...callbacks} />);
        expect(getByTestId('upload-file-btn-mocked-missing')).toBeDisabled();
    });
});
