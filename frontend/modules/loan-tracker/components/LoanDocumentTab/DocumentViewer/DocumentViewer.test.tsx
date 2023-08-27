import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { mockDocuments, statusesMock } from '../../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import { DocumentsContext, initialContextDocuments } from '../../../contexts/Documents/Documents.context';

const defaultParams = {
    isUploading: false,
    onCancel: jest.fn(),
    onReset: jest.fn(),
    onReject: jest.fn(),
    onAccept: jest.fn(),
    onUpload: jest.fn(),
};

const renderWithContext = (props, context) => {
    return render(
        <DocumentsContext.Provider value={context}>
            <DocumentViewer {...props} />
        </DocumentsContext.Provider>
    );
};

const context = {
    ...initialContextDocuments,
    selectedDocument: mockDocuments[0],
    documentStatuses: statusesMock,
    getDocumentSrc: jest.fn().mockResolvedValue({ fileId: 'fileId', src: 'src' }),
    hasDocumentPrivilege: jest.fn().mockReturnValue(true),
};

let DocumentViewer;
describe('DocumentViewer', () => {
    beforeAll(() => {
        jest.mock('@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar', () => params => (
            <div data-testid="error-message-bar">{params.highlight}</div>
        ));
        jest.mock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState', () => () => <div data-testid="error-state" />);

        /* eslint @typescript-eslint/no-var-requires: "off" */
        DocumentViewer = require('./DocumentViewer').default;
    });

    afterAll(() => {
        jest.unmock('@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar');
        jest.unmock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState');
    });

    it('should render header with icon if document is approved or rejected', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, context);
        });

        const { getByTestId, getByText } = component;

        expect(getByText(mockDocuments[0].name)).toBeVisible();
        expect(getByTestId('status-icon')).toBeVisible();
    });

    it('should render header with no icon if document is pending', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { queryByTestId, getByText } = component;

        expect(getByText(mockDocuments[3].name)).toBeVisible();
        expect(queryByTestId('status-icon')).toBeNull();
    });

    it('should call cancel when cancel button is clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { getByTestId } = component;

        const cancelButton = getByTestId('cancel-button');
        expect(cancelButton).toBeVisible();
        await act(async () => {
            fireEvent.click(cancelButton);
        });

        expect(defaultParams.onCancel).toBeCalled();
    });

    it('should show error message if there is an error message', async () => {
        let component;

        const errorMessage = 'error';
        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, errorMessage: errorMessage });
        });

        const { getByTestId, getByText } = component;

        expect(getByText(errorMessage)).toBeVisible();
        expect(getByTestId('error-message-bar')).toBeVisible();
    });

    it('should not show error message if there is no error message', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, context);
        });

        const { queryByTestId } = component;

        expect(queryByTestId('error-message-bar')).toBeNull();
    });

    it('should show error state if document cannot be showed', async () => {
        let component;

        const customContext = { ...context, getDocumentSrc: jest.fn().mockResolvedValue({ fileId: '', src: '' }) };
        await act(async () => {
            component = renderWithContext(defaultParams, { ...customContext, selectedDocument: mockDocuments[1] });
        });

        const { getByTestId } = component;

        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should show document if src fetched', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, context);
        });

        const { getByTestId } = component;

        expect(getByTestId('document-frame-view')).toBeVisible();
    });

    it('should not show reset file button if document is pending', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { queryByTestId } = component;

        const resetButton = queryByTestId('reset-button');
        expect(resetButton).toBeNull();
    });

    it('should call reset when reset button is clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, context);
        });

        const { getByTestId } = component;

        const resetButton = getByTestId('reset-button');
        expect(resetButton).toBeVisible();
        await act(async () => {
            fireEvent.click(resetButton);
        });

        expect(defaultParams.onReset).toBeCalled();
    });

    it('should call close when close button is clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[1] });
        });

        const { getByTestId } = component;

        const closeButton = getByTestId('close-button');
        expect(closeButton).toBeVisible();
        await act(async () => {
            fireEvent.click(closeButton);
        });

        expect(defaultParams.onCancel).toBeCalled();
    });

    it('should call accept when accept button is clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { getByTestId } = component;

        const acceptButton = getByTestId('accept-button');
        expect(acceptButton).toBeVisible();
        await act(async () => {
            fireEvent.click(acceptButton);
        });

        expect(defaultParams.onAccept).toBeCalled();
    });

    it('should call reject when reject button is clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { getByTestId } = component;

        const rejectButton = getByTestId('reject-button');
        expect(rejectButton).toBeVisible();
        await act(async () => {
            fireEvent.click(rejectButton);
        });

        expect(defaultParams.onReject).toBeCalled();
    });

    it('should disable reject and accept buttons if document is pending and src not valid', async () => {
        let component;

        const customContext = { ...context, getDocumentSrc: jest.fn().mockResolvedValue({ fileId: '', src: '' }) };
        await act(async () => {
            component = renderWithContext(defaultParams, { ...customContext, selectedDocument: mockDocuments[3] });
        });

        const { getByTestId } = component;

        const rejectButton = getByTestId('reject-button');
        const acceptButton = getByTestId('accept-button');
        expect(acceptButton).toBeDisabled();
        expect(rejectButton).toBeDisabled();
    });

    it('should disable accept, reject and upload buttons when missing privileges', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, {
                ...context,
                selectedDocument: mockDocuments[3],
                hasDocumentPrivilege: jest.fn().mockReturnValue(false),
            });
        });

        const { getByTestId } = component;

        const rejectButton = getByTestId('reject-button');
        const acceptButton = getByTestId('accept-button');
        const uploadButton = getByTestId('upload-button');

        expect(acceptButton).toBeDisabled();
        expect(rejectButton).toBeDisabled();
        expect(uploadButton).toBeDisabled();
    });

    it('disable reset button when missing privileges', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, hasDocumentPrivilege: jest.fn().mockReturnValue(false) });
        });

        const { getByTestId } = component;

        const resetButton = getByTestId('reset-button');
        expect(resetButton).toBeDisabled();
    });

    it('should show loading state', async () => {
        const { getByTestId } = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });

        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('should render file upload field', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { getByTestId } = component;

        const uploadButton = getByTestId('upload-button');

        expect(uploadButton).toBeVisible();
    });

    it('should call onUpload when file selected to upload', async () => {
        const file = new Blob([''], { type: 'text/plain' });
        let component;

        await act(async () => {
            component = renderWithContext(defaultParams, { ...context, selectedDocument: mockDocuments[3] });
        });

        const { getByTestId } = component;
        const inputFile = getByTestId('input-file');

        fireEvent.change(inputFile, { target: { files: [file] } });

        expect(defaultParams.onUpload).toBeCalledWith(mockDocuments[3], file, 'fileId');
    });
});
