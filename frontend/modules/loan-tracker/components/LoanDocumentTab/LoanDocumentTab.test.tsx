import React from 'react';
import { act, render } from '@testing-library/react';
import LoanDocumentTab from './LoanDocumentTab';
import MockLoanApplicationDocumentsFetcher from '../../interfaces/ILoanDocument/mocks/ILoanApplicationDocumentsFetcher.mocks';

jest.mock(
    '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication',
    () => () =>
        jest.fn(() => ({
            postMessage: jest.fn(),
        }))
);

describe('LoanApplication', () => {
    it('should render loan application documents component', async () => {
        let component;

        await act(async () => {
            component = render(<LoanDocumentTab fetcher={new MockLoanApplicationDocumentsFetcher()} loanApplicationId="loanId" />);
        });

        const { container } = component;

        expect(container).toBeInTheDocument();
    });
});
