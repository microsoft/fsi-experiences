import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { mockDocuments } from '../../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import { DocumentsContext, initialContextDocuments } from '../../../contexts/Documents/Documents.context';
import documentsSectionStrings from '@fsi/core-components/dist/assets/strings/LoanApplicationFilesControl/LoanApplicationFilesControl.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

const defaultParams = {
    documents: mockDocuments,
    title: 'test',
    onDocumentViewerOpen: jest.fn(),
    onFileUpload: jest.fn(),
};

const renderWithContext = (props, context) => {
    return render(
        <DocumentsContext.Provider value={context}>
            <DocumentsSection {...props} />
        </DocumentsContext.Provider>
    );
};

let DocumentsSection;
describe('DocumentsSection', () => {
    beforeAll(() => {
        jest.mock('../DocumentCard/DocumentCard', () => () => <div data-testid="card"></div>);

        /* eslint @typescript-eslint/no-var-requires: "off" */
        DocumentsSection = require('./DocumentsSection').default;
    });

    afterAll(() => {
        jest.unmock('../DocumentCard/DocumentCard');
    });

    it('should render the title of the section with numbers of items', async () => {
        let component;
        const context = {
            ...initialContextDocuments,
            documents: mockDocuments,
            isLoading: false,
        };
        await act(async () => {
            component = await renderWithContext(defaultParams, context);
        });
        const { getByTestId, getByText } = component;

        expect(getByTestId('documents-group')).toBeVisible();
        expect(getByText(`${defaultParams.title} (${defaultParams.documents.length})`)).toBeVisible();
    });

    it('should render the opened section', async () => {
        let component;
        const context = {
            ...initialContextDocuments,
            documents: mockDocuments,
        };
        await act(async () => {
            component = await renderWithContext(defaultParams, context);
        });
        const { getByTestId } = component;

        expect(getByTestId('documents-group')).toBeVisible();
        expect(getByTestId('cards-section')).toBeVisible();
    });

    it('should close cards section when clicked on section title icon', async () => {
        let component;
        await act(async () => {
            component = await renderWithContext(defaultParams, initialContextDocuments);
        });
        const { getByTestId, queryByTestId } = component;

        const button = getByTestId('documents-group');
        expect(button).toBeVisible();
        fireEvent.click(button);

        expect(queryByTestId('cards-section')).toBeNull();
    });

    it('should render one row of documents cards when section opened', async () => {
        let component;
        const context = {
            ...initialContextDocuments,
            documents: mockDocuments,
            isLoading: false,
        };
        await act(async () => {
            component = await renderWithContext(defaultParams, context);
        });
        const { getAllByTestId, getByTestId } = component;

        expect(getByTestId('cards-section')).toBeVisible();
        expect(getAllByTestId('document-card-row')).toHaveLength(1);
        expect(getAllByTestId('card')).toHaveLength(mockDocuments.length);
    });

    it('should render two rows of documents cards if more than 4 cards', async () => {
        let component;
        const newDocument = { ...mockDocuments[0], id: '5' };
        const newDocuments = [...mockDocuments, newDocument];
        const context = {
            ...initialContextDocuments,
            documents: newDocuments,
            isLoading: false,
        };
        await act(async () => {
            component = await renderWithContext({ ...defaultParams, documents: newDocuments }, context);
        });
        const { getAllByTestId, getByTestId } = component;

        expect(getByTestId('cards-section')).toBeVisible();
        expect(getAllByTestId('card')).toHaveLength(mockDocuments.length + 1);
    });

    it('should render loading view if loading', async () => {
        let component;
        await act(async () => {
            component = await renderWithContext(defaultParams, initialContextDocuments);
        });
        const { getByText, getByTestId } = component;

        expect(getByText(commonStrings.LOADING)).toBeVisible();
        expect(getByTestId('connecting-view')).toBeVisible();
    });

    it('should render add document button', async () => {
        let component;
        const customParams = { ...defaultParams, onAddDocument: jest.fn() };
        await act(async () => {
            component = await renderWithContext(customParams, initialContextDocuments);
        });
        const { getByText } = component;

        expect(getByText(documentsSectionStrings.LOAN_APP_ADD_NEW_DOCUMENT)).toBeVisible();
    });

    it('should call onAddDocument action when clicked on add button', async () => {
        let component;
        const onAddDocumentFunc = jest.fn();
        const customParams = { ...defaultParams, onAddDocument: onAddDocumentFunc };
        await act(async () => {
            component = await renderWithContext(customParams, initialContextDocuments);
        });
        const { getByTestId } = component;

        const addButton = getByTestId('add-button');
        fireEvent.click(addButton);
        expect(onAddDocumentFunc).toBeCalled();
    });

    it('should disable add button and documents group button if locked', async () => {
        let component;

        const customParams = { ...defaultParams, onAddDocument: jest.fn(), addDocumentDisabled: true };
        await act(async () => {
            component = await renderWithContext(customParams, initialContextDocuments);
        });
        const { getByTestId } = component;

        const addButton = getByTestId('add-button');

        expect(addButton).toBeDisabled();
    });

    it('should disable documents group button if section is empty', async () => {
        let component;

        const customParams = { ...defaultParams, onAddDocument: jest.fn(), documents: [] };
        await act(async () => {
            component = await renderWithContext(customParams, initialContextDocuments);
        });
        const { getByTestId } = component;

        const documentsGroupButton = getByTestId('documents-group');

        expect(documentsGroupButton).toHaveStyle(`color: ${COLORS.disabledButtonColor}`);
    });
});
