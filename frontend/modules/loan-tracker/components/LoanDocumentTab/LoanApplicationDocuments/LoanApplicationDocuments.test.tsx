import { act, render } from '@testing-library/react';
import React from 'react';
import { mockDocuments } from '../../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import { DocumentsContext, initialContextDocuments } from '../../../contexts/Documents/Documents.context';
import { LoanApplicationDocuments } from './LoanApplicationDocuments';

jest.mock('../DocumentCard/DocumentCard', () => params => <div data-testid="card"></div>);
jest.mock('../DocumentDialog/DocumentDialog', () => params => <div data-testid="dialog"></div>);
jest.mock('../DocumentViewer/DocumentViewer', () => params => <div data-testid="viewer"></div>);
jest.mock('../DocumentsSection/DocumentsSection', () => params => <div data-testid="section"></div>);
jest.mock('../AddDocumentDialog/AddDocumentDialog', () => params => <div data-testid="add-document-dialog"></div>);

let isMediaMatched = false;
jest.mock('@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener', () => {
    return jest.fn(() => isMediaMatched);
});

const renderWithContext = (props, context) => {
    return render(
        <DocumentsContext.Provider value={context}>
            <LoanApplicationDocuments {...props} />
        </DocumentsContext.Provider>
    );
};

describe('LoanApplicationDocuments', () => {
    beforeEach(() => {
        isMediaMatched = false;
    });

    it('should render the 3 documents sections', async () => {
        let component;
        const context = {
            ...initialContextDocuments,
            documents: mockDocuments,
            isLoading: false,
        };
        await act(async () => {
            component = await renderWithContext({}, context);
        });
        const { getAllByTestId } = component;

        expect(getAllByTestId('section')).toHaveLength(3);
    });

    it('should render dialog', async () => {
        let component;

        await act(async () => {
            component = await renderWithContext({}, initialContextDocuments);
        });
        const { getByTestId } = component;

        expect(getByTestId('dialog')).toBeInTheDocument();
    });

    it('should render add document dialog', async () => {
        let component;

        await act(async () => {
            component = await renderWithContext({}, initialContextDocuments);
        });
        const { getByTestId } = component;

        expect(getByTestId('add-document-dialog')).toBeInTheDocument();
    });

    it('should render empty sections when document status not exists', async () => {
        const customDocument = { ...mockDocuments[0], status: 1 };
        const context = {
            ...initialContextDocuments,
            documents: [customDocument],
            isLoading: false,
        };
        let component;

        await act(async () => {
            component = await renderWithContext({}, context);
        });
        const { queryAllByTestId } = component;

        expect(queryAllByTestId('document-card-row')).toHaveLength(0);
    });

    it('should render add document button on small screen', async () => {
        isMediaMatched = true;

        let component;

        await act(async () => {
            component = await renderWithContext({}, { ...initialContextDocuments, hasDocumentPrivilege: jest.fn().mockReturnValue(true) });
        });
        const { getByTestId } = component;

        expect(getByTestId('add-new-docment-stack-small-screen')).toBeInTheDocument();
        expect(getByTestId('add-button')).toBeInTheDocument();
        expect(getByTestId('add-button')).toBeEnabled();
    });

    it('should render disable add button on small screen when missing privileges', async () => {
        isMediaMatched = true;

        let component;

        await act(async () => {
            component = await renderWithContext({}, initialContextDocuments);
        });
        const { getByTestId } = component;

        expect(getByTestId('add-new-docment-stack-small-screen')).toBeInTheDocument();
        expect(getByTestId('add-button')).toBeInTheDocument();
        expect(getByTestId('add-button')).toBeDisabled();
    });
});
