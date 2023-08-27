import React from 'react';
import { render } from '@testing-library/react';
import IncomeAndExpensesSnapshot from './IncomeAndExpensesSnapshot';
import { mockLoanCustomers } from '../../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import loanSnapshotControlStrings from '@fsi/core-components/dist/assets/strings/LoanSnapshotControl/LoanSnapshotControl.1033.json';

describe('IncomeAndExpensesSnapshot', () => {
    const mockProps = {
        totalNetBalance: 500,
        applicantNetBalance: 250,
        applicants: mockLoanCustomers,
        selectedApplicant: mockLoanCustomers[0],
    };

    it('Should render IncomeAndExpensesSnapshot', () => {
        const { getByTestId } = render(<IncomeAndExpensesSnapshot {...mockProps} />);
        expect(getByTestId('income-and-expenses-snapshot')).toBeInTheDocument();
    });

    it('Should render IncomeAndExpensesSnapshot - Loading', () => {
        const { getByText } = render(<IncomeAndExpensesSnapshot {...mockProps} isLoading />);

        expect(getByText(commonStrings.LOADING)).toBeInTheDocument();
    });

    it('Should render PartyAssetsLiabilities - Error', () => {
        const { getByText } = render(<IncomeAndExpensesSnapshot {...mockProps} isError />);

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render PartyAssetsLiabilities - Empty State', () => {
        const props = {
            selectedApplicant: mockProps.selectedApplicant,
            totalNetBalance: 0,
            applicantNetBalance: 0,
            applicants: [],
        };
        const { getByText } = render(<IncomeAndExpensesSnapshot {...props} />);

        expect(getByText(loanSnapshotControlStrings.EMPTY_STATE_TABLE_INCOME_AND_EXPENSES)).toBeInTheDocument();
    });

    it('Should display primary applicant income', () => {
        const { getByText } = render(<IncomeAndExpensesSnapshot {...mockProps} applicants={[mockProps.applicants[0]]} />);
        expect(getByText(mockProps.applicantNetBalance)).toBeInTheDocument();
    });

    it('Should display total income', () => {
        const { getByText } = render(<IncomeAndExpensesSnapshot {...mockProps} />);
        expect(getByText(mockProps.totalNetBalance)).toBeInTheDocument();
    });
});
