import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PartyIncomeAndExpenses from './PartyIncomeAndExpenses';
import { applicantsDataMock, incomeAndExpensesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanIncomeAndExpenses.mocks';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import loanCustomerLookupControlStrings from '@fsi/core-components/dist/assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';

describe('PartyIncomeAndExpenses', () => {
    const mockProps = {
        applicantName: applicantsDataMock.applicants[0].firstName,
        numberOfApplicants: applicantsDataMock.applicants.length,
        applicantNetBalance: 357123,
        totalNetBalance: 789545,
        isError: false,
        isLoading: false,
        currencyId: incomeAndExpensesMock.currencyId,
    };

    it('should render PartyIncomeAndExpenses', () => {
        const { container } = render(<PartyIncomeAndExpenses {...mockProps} />);
        expect(container).toBeInTheDocument();
    });

    it('Should render PartyIncomeAndExpenses - Loading', () => {
        const { getByText } = render(<PartyIncomeAndExpenses {...mockProps} isLoading />);

        expect(getByText(commonStrings.LOADING)).toBeInTheDocument();
    });

    it('Should render PartyIncomeAndExpenses - Error', () => {
        const { getByText } = render(<PartyIncomeAndExpenses {...mockProps} isError />);

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render PartyIncomeAndExpenses - Empty State', () => {
        const { getByText } = render(<PartyIncomeAndExpenses {...mockProps} applicantNetBalance={0} />);

        expect(getByText(loanCustomerLookupControlStrings.EMPTY_STATE_TABLE_INCOME_AND_EXPENSES)).toBeInTheDocument();
    });

    it('Check that primary applicant balance row is being displayed when there is only primary applicant', () => {
        const { getByTestId } = render(
            <PartyIncomeAndExpenses {...mockProps} numberOfApplicants={1} totalNetBalance={mockProps.applicantNetBalance} />
        );
        expect(getByTestId('primary-applicant-balance-row')).toBeInTheDocument();
    });

    it('Should enable adding new incomes and expenses', () => {
        const { getByRole, getByText } = render(<PartyIncomeAndExpenses {...mockProps} hasPrivilege={jest.fn().mockReturnValue(true)} />);

        fireEvent.click(getByText(loanCustomerLookupControlStrings.ADD_NEW_ITEM));

        expect(getByRole('menuitem', { name: 'Declared income' }).getAttribute('aria-disabled')).toEqual('false');
        expect(getByRole('menuitem', { name: 'Declared expense' }).getAttribute('aria-disabled')).toEqual('false');
    });

    it('Should disable adding new incomes and expenses when missing privileges', () => {
        const { getByRole, getByText } = render(<PartyIncomeAndExpenses {...mockProps} hasPrivilege={jest.fn().mockReturnValue(false)} />);

        fireEvent.click(getByText(loanCustomerLookupControlStrings.ADD_NEW_ITEM));

        expect(getByRole('menuitem', { name: 'Declared income' }).getAttribute('aria-disabled')).toEqual('true');
        expect(getByRole('menuitem', { name: 'Declared expense' }).getAttribute('aria-disabled')).toEqual('true');
    });
});
