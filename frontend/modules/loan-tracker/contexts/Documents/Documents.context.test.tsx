import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { defaultDocument, DocumentsContext, DocumentsContextProvider } from './Documents.context';
import { addDocumentDataMock, fileToUploadMock, mockDocuments } from '../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import MockLoanApplicationDocumentsFetcher from '../../interfaces/ILoanDocument/mocks/ILoanApplicationDocumentsFetcher.mocks';

jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        postMessage: jest.fn(),
    }))
);

const MockComponent = () => {
    const {
        acceptDocument,
        rejectDocument,
        resetDocument,
        setErrorMessage,
        errorMessage,
        setSelectedDocument,
        getDocumentSrc,
        addDocument,
        selectedDocument,
        uploadDocument,
        removeDocument,
    } = useContext(DocumentsContext);

    return (
        <div>
            <button onClick={() => acceptDocument(mockDocuments[0])}>Accept</button>
            <button onClick={() => rejectDocument(mockDocuments[3])}>Reject</button>
            <button onClick={() => resetDocument(mockDocuments[1])}>Reset</button>
            <button onClick={() => setErrorMessage('errorMessage')}>Error Message</button>
            <div data-testid="error-msg">{errorMessage}</div>
            <button onClick={() => setSelectedDocument(mockDocuments[0])}>Selected Document</button>
            <div data-testid="selected-doc">{selectedDocument.id}</div>
            <button onClick={() => getDocumentSrc()}>Get Document Source</button>
            <button onClick={() => uploadDocument(mockDocuments[2], fileToUploadMock)}>Upload</button>
            <button onClick={() => addDocument(addDocumentDataMock)}>Add Document</button>
            <button onClick={() => removeDocument(mockDocuments[0].id)}>Remove Document</button>
        </div>
    );
};

const renderWithContext = fetcher => {
    return render(
        <DocumentsContextProvider fetcher={fetcher} loanApplicationId="loanId">
            <MockComponent />
        </DocumentsContextProvider>
    );
};

describe('DocumentaContextProvider', () => {
    it('should render the context provider component', async () => {
        let component;

        await act(async () => {
            component = render(
                <DocumentsContextProvider fetcher={new MockLoanApplicationDocumentsFetcher()} loanApplicationId="loanId">
                    <div>test</div>
                </DocumentsContextProvider>
            );
        });

        const { getByText } = component;
        expect(getByText('test')).toBeVisible();
    });

    it('should trigger acceptDocument', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'acceptDocument');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Accept'));
        });

        expect(mockFetcher.acceptDocument).toBeCalled();
    });

    it('should trigger rejectDocument', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'rejectDocument');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Reject'));
        });

        expect(mockFetcher.rejectDocument).toBeCalled();
    });

    it('should trigger resetDocument', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'resetDocument');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Reset'));
        });

        expect(mockFetcher.resetDocument).toBeCalled();
    });

    it('should trigger setError message', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(new MockLoanApplicationDocumentsFetcher());
        });

        const { queryByText, getByTestId } = component;

        expect(getByTestId('error-msg')).toBeVisible();

        act(() => {
            fireEvent.click(queryByText('Error Message'));
        });

        expect(queryByText('errorMessage')).toBeVisible();
    });

    it('should trigger setSelectedDocument', async () => {
        let component;

        await act(async () => {
            component = renderWithContext(new MockLoanApplicationDocumentsFetcher());
        });

        const { queryByText, getByTestId } = component;

        expect(getByTestId('selected-doc')).toBeVisible();

        act(() => {
            fireEvent.click(queryByText('Selected Document'));
        });

        expect(queryByText(mockDocuments[0].id)).toBeVisible();
    });

    it('should trigger getDocumentSource', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'getDocumentSrc');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Get Document Source'));
        });

        expect(mockFetcher.getDocumentSrc).toBeCalledWith(defaultDocument.id);
    });

    it('should trigger uploadDocument', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'uploadDocument');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Upload'));
        });

        expect(mockFetcher.uploadDocument).toHaveBeenCalledWith(mockDocuments[2], fileToUploadMock, undefined);
    });

    it('should trigger addDocument', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'addDocument');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Add Document'));
        });

        expect(mockFetcher.addDocument).toBeCalledWith(addDocumentDataMock);
    });

    it('should trigger removeDocument', async () => {
        let component;

        const mockFetcher = new MockLoanApplicationDocumentsFetcher();
        jest.spyOn(mockFetcher, 'removeDocument');

        await act(async () => {
            component = renderWithContext(mockFetcher);
        });

        const { getByText } = component;

        act(() => {
            fireEvent.click(getByText('Remove Document'));
        });

        expect(mockFetcher.removeDocument).toHaveBeenCalledWith(mockDocuments[0].id);
    });
});
