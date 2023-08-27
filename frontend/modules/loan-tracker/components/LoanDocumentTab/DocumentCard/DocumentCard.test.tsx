import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { mockDocuments, statusesMock } from '../../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import { DocumentsContext, initialContextDocuments } from '../../../contexts/Documents/Documents.context';
import documentsSectionStrings from '@fsi/core-components/dist/assets/strings/LoanApplicationFilesControl/LoanApplicationFilesControl.1033.json';
let isMediaMatched = false;
jest.mock('@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener', () => {
    return jest.fn(() => isMediaMatched);
});

const defaultParams = {
    document: mockDocuments[0],
    onFileView: jest.fn(),
    onDelete: jest.fn(),
    onUpload: jest.fn(),
};

const renderWithContext = (props, context) => {
    return render(
        <DocumentsContext.Provider value={context}>
            <DocumentCard {...props} />
        </DocumentsContext.Provider>
    );
};

const context = {
    ...initialContextDocuments,
    uploadDocument: jest.fn(),
    documentStatuses: statusesMock,
    hasDocumentPrivilege: jest.fn().mockReturnValue(true),
};

const file = new File([new ArrayBuffer(1)], 'file.txt');

let DocumentCard;

describe('DocumentCard', () => {
    beforeEach(() => {
        isMediaMatched = false;
        defaultParams.onUpload = jest.fn();
    });

    beforeAll(() => {
        jest.mock('@fsi/core-components/dist/components/atoms/Tag/Tag', () => params => <div data-testid="role-tag-text">{params.text}</div>);

        /* eslint @typescript-eslint/no-var-requires: "off" */
        DocumentCard = require('./DocumentCard').default;
    });

    afterAll(() => {
        jest.unmock('@fsi/core-components/dist/components/atoms/Tag/Tag');
    });

    it('should render header with icon according to the status', () => {
        const context = {
            ...initialContextDocuments,
            documentStatuses: statusesMock,
        };
        const { getByTestId, getByText } = renderWithContext(defaultParams, context);

        expect(getByText(mockDocuments[0].name)).toBeVisible();
        expect(getByTestId('status-icon')).toBeVisible();
    });

    it('should render description', () => {
        const { getByText } = renderWithContext(defaultParams, context);

        expect(getByText(mockDocuments[0].description)).toBeVisible();
    });

    it('should render empty description text if document is missing discription', () => {
        const customParams = { ...defaultParams, document: { ...mockDocuments[0], description: '' } };
        const { queryByTestId } = renderWithContext(customParams, context);

        expect(queryByTestId('description-text')).toBeNull();
    });

    it('should render details text if document not missing', () => {
        const { getByTestId } = renderWithContext(defaultParams, context);

        expect(getByTestId('details-text').textContent).toBeTruthy();
    });

    it('should render empty details text if document is missing', () => {
        const { getByTestId } = renderWithContext({ ...defaultParams, document: mockDocuments[2] }, context);

        expect(getByTestId('details-text').textContent).toBeFalsy();
    });

    it('should render role text if document (validate printing primary applicant if its primary, regardless of the role', () => {
        const { getByTestId } = renderWithContext(defaultParams, context);

        expect(getByTestId('role-tag-text')).toBeVisible();
        expect(getByTestId('role-tag-text').textContent).toMatch('Primary applicant');
    });

    it('should render and click review file button if document is rejected', () => {
        const { getByTestId } = renderWithContext(defaultParams, context);

        const reviewButton = getByTestId('review-button');
        expect(reviewButton).toBeVisible();
        fireEvent.click(reviewButton);

        expect(defaultParams.onFileView).toBeCalledWith(defaultParams.document);
    });

    it('should render and click review file button if document is approved', () => {
        const { getByTestId } = renderWithContext({ ...defaultParams, document: mockDocuments[1] }, context);

        const reviewButton = getByTestId('review-button');
        expect(reviewButton).toBeVisible();
        fireEvent.click(reviewButton);

        expect(defaultParams.onFileView).toBeCalledWith(mockDocuments[1]);
    });

    it('should render and click review file button if document is pending', () => {
        const { getByTestId } = renderWithContext({ ...defaultParams, document: mockDocuments[3] }, context);

        const reviewButton = getByTestId('review-button');
        expect(reviewButton).toBeVisible();
        fireEvent.click(reviewButton);

        expect(defaultParams.onFileView).toBeCalledWith(mockDocuments[3]);
    });

    it('should render file upload field', async () => {
        let component;

        await act(async () => {
            component = renderWithContext({ ...defaultParams, document: mockDocuments[2] }, context);
        });

        const { getByTestId } = component;

        const uploadButton = getByTestId('upload-button');

        expect(uploadButton).toBeVisible();
    });

    it('should render remove document button when more button clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext({ ...defaultParams, document: mockDocuments[3] }, context);
        });

        const { getByTestId, getByText } = component;

        fireEvent.click(getByTestId('more-button'));

        const removeButton = getByText(documentsSectionStrings.REMOVE_DOCUMENT_BUTTON_TEXT);

        expect(removeButton).toBeInTheDocument();
    });

    it('should render remove request button when more button clicked', async () => {
        let component;

        await act(async () => {
            component = renderWithContext({ ...defaultParams, document: mockDocuments[2] }, context);
        });

        const { getByTestId, getByText } = component;

        fireEvent.click(getByTestId('more-button'));

        const removeButton = getByText(documentsSectionStrings.REMOVE_REQUEST_BUTTON_TEXT);

        expect(removeButton).toBeInTheDocument();
    });

    it('should call onDelete when Remove document clicked', async () => {
        let component;

        const document = mockDocuments[3];
        await act(async () => {
            component = renderWithContext({ ...defaultParams, document }, context);
        });

        const { getByTestId, getByText } = component;

        fireEvent.click(getByTestId('more-button'));

        const removeButton = getByText(documentsSectionStrings.REMOVE_DOCUMENT_BUTTON_TEXT);
        fireEvent.click(removeButton);

        expect(defaultParams.onDelete).toBeCalledWith(document.id, false);
    });

    it('should call onDelete when Remove request clicked', async () => {
        let component;

        const document = mockDocuments[2];
        await act(async () => {
            component = renderWithContext({ ...defaultParams, document }, context);
        });

        const { getByTestId, getByText } = component;

        fireEvent.click(getByTestId('more-button'));

        const removeButton = getByText(documentsSectionStrings.REMOVE_REQUEST_BUTTON_TEXT);
        fireEvent.click(removeButton);

        expect(defaultParams.onDelete).toBeCalledWith(document.id, true);
    });

    it('should show and call review and delete button when small screen', async () => {
        isMediaMatched = true;

        let component;

        const document = mockDocuments[3];
        await act(async () => {
            component = renderWithContext({ ...defaultParams, document }, context);
        });

        const { getByTestId, getByText } = component;

        fireEvent.click(getByTestId('more-button'));

        const removeButton = getByText(documentsSectionStrings.REMOVE_DOCUMENT_BUTTON_TEXT);
        expect(removeButton).toBeInTheDocument();

        const reviewButton = getByText(documentsSectionStrings.REVIEW_DOCUMENT_MENU_ITEM_BUTTON);
        expect(reviewButton).toBeInTheDocument();

        fireEvent.click(reviewButton);

        expect(defaultParams.onFileView).toBeCalledWith(document);
    });

    it('should show and call upload and delete button when small screen', async () => {
        isMediaMatched = true;

        let component;

        const document = mockDocuments[2];
        await act(async () => {
            component = renderWithContext({ ...defaultParams, document }, context);
        });

        const { getByTestId, getByText } = component;

        fireEvent.click(getByTestId('more-button'));

        const removeButton = getByText(documentsSectionStrings.REMOVE_REQUEST_BUTTON_TEXT);
        expect(removeButton).toBeInTheDocument();

        const uploadButton = getByText(documentsSectionStrings.UPLOAD_DOCUMENT_MENU_ITEM_BUTTON);
        expect(uploadButton).toBeInTheDocument();
        fireEvent.click(uploadButton);

        const inputFile = getByTestId('input-file-small-screen');

        fireEvent.change(inputFile, { target: { files: [file] } });

        expect(defaultParams.onUpload).toBeCalledWith(document, file);
    });

    it('should not call onUpload if no file selected', async () => {
        isMediaMatched = true;

        let component;

        const document = mockDocuments[2];
        await act(async () => {
            component = renderWithContext({ ...defaultParams, document }, context);
        });

        const { getByTestId } = component;

        fireEvent.click(getByTestId('more-button'));

        const inputFile = getByTestId('input-file-small-screen');

        fireEvent.change(inputFile, { target: { files: null } });

        expect(defaultParams.onUpload).toBeCalledTimes(0);
    });

    it('should return focus to `more-button` when ESC key is clicked, after menu is open', async () => {
        let component;

        const document = mockDocuments[2];
        await act(async () => {
            component = renderWithContext({ ...defaultParams, document }, context);
        });

        const { getByTestId, getByText } = component;

        const moreButton = getByTestId('more-button');
        const menuID = moreButton.getAttribute('aria-controls');

        await fireEvent.click(moreButton);

        const removeButtonText = getByText(documentsSectionStrings.REMOVE_REQUEST_BUTTON_TEXT);

        const removeButtonContainer = removeButtonText.closest(`#${menuID}`);

        await fireEvent.keyDown(removeButtonContainer, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });

        expect(moreButton).toHaveFocus();
    });
});
