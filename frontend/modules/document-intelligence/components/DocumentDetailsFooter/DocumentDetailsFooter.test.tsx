import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DocumentDetailsFooter from './DocumentDetailsFooter';
import { IDocumentDetailsFooterProps } from './DocumentDetailsFooter.interface';
import * as mockedDocuments from '../../interfaces/mocks/DocumentData.mock';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { IUploadFileButtonProps } from '../UploadFileButton/UploadFileButton.interface';

let mockUploadFunction;
const file = new File([], 'test');
jest.mock('../UploadFileButton/UploadFileButton', () => (props: IUploadFileButtonProps) => {
    mockUploadFunction = () => props.onUpload(file);
    return <span data-testid={`upload-file-btn-mocked-${props.isMissingFile ? 'missing' : 'not-missing'}`} />;
});

describe('[Document Intelligence] DocumentDetailsFooter', () => {
    const callbacks = {
        onApprove: jest.fn(),
        onReject: jest.fn(),
        onCancel: jest.fn(),
        onUpload: jest.fn(),
        onReset: jest.fn(),
    };
    const footerProps: IDocumentDetailsFooterProps = {
        document: mockedDocuments.pendingReviewDocMock,
        ...callbacks,
    };
    beforeEach(() => {
        Object.values(callbacks).forEach(callback => {
            callback.mockReset();
        });
    });

    it('Should render footer with approve/reject buttons', () => {
        const { getByText } = render(<DocumentDetailsFooter {...footerProps} />);
        expect(getByText(commonStrings.APPROVE)).toBeVisible();
        expect(getByText(commonStrings.REJECT)).toBeVisible();

        fireEvent.click(getByText(commonStrings.REJECT));
        expect(callbacks.onReject).toHaveBeenCalled();

        fireEvent.click(getByText(commonStrings.APPROVE));
        expect(callbacks.onApprove).toHaveBeenCalled();
    });

    it('Should render footer with upload new button without approve/reject buttons', () => {
        const { getByTestId, queryByText } = render(<DocumentDetailsFooter {...footerProps} document={mockedDocuments.approvedDocMock} />);
        expect(getByTestId('upload-file-btn-mocked-not-missing')).toBeVisible();
        expect(queryByText(commonStrings.APPROVE)).toBeNull();
        expect(queryByText(commonStrings.REJECT)).toBeNull();

        mockUploadFunction();
        expect(callbacks.onUpload).toHaveBeenCalled();
    });

    it('Should render footer with reset status button', () => {
        const { getByText, getByTestId } = render(<DocumentDetailsFooter {...footerProps} document={mockedDocuments.approvedDocMock} />);
        expect(getByText(diStrings.DOCUMENT_RESET_STATUS)).toBeVisible();
        expect(getByTestId('reset-status-button')).toBeVisible();
        fireEvent.click(getByText(diStrings.DOCUMENT_RESET_STATUS));
        expect(callbacks.onReset).toHaveBeenCalled();
    });

    it('Should render footer with reset status button at the right side', () => {
        const { getByText, getByTestId } = render(<DocumentDetailsFooter {...footerProps} document={mockedDocuments.autoApprovedDocMock} />);
        expect(getByText(diStrings.DOCUMENT_RESET_STATUS)).toBeVisible();
        expect(getByTestId('reset-status-button-right')).toBeVisible();
        fireEvent.click(getByText(diStrings.DOCUMENT_RESET_STATUS));
        expect(callbacks.onReset).toHaveBeenCalled();
    });

    it('Should not render upload when no file exists', () => {
        const { queryByTestId } = render(<DocumentDetailsFooter {...footerProps} document={mockedDocuments.missingFileDocMock} />);
        expect(queryByTestId('upload-file-btn-mocked-missing')).toBeNull();
    });

    it('should render footer with disabled Approved', () => {
        const { getByTestId } = render(<DocumentDetailsFooter {...footerProps} disabledApprove />);
        expect(getByTestId('approve-button')).toBeDisabled();
        expect(getByTestId('reject-button')).toBeEnabled();
    });

    it('should render disable Footer', () => {
        const { getByTestId } = render(<DocumentDetailsFooter {...footerProps} disabled />);
        expect(getByTestId('approve-button')).toBeDisabled();
        expect(getByTestId('reject-button')).toBeDisabled();
    });
});
