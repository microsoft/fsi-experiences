import React from 'react';
import { render } from '@testing-library/react';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import incomeAndExpensesStrings from '../../../../assets/strings/IncomeAndExpenses/IncomeAndExpenses.1033.json';
import { mockFinancialCategoriesApplicants } from '../../../../interfaces/mocks/IApplicant.mock';
import { IncomeAndExpensesSnapshot } from './IncomeAndExpensesSnapshot';

describe('IncomeAndExpensesSnapshot', () => {
    const mockProps = {
        totalNetBalance: 500,
        applicantNetBalance: 250,
        applicantsCount: mockFinancialCategoriesApplicants?.length,
        selectedApplicant: mockFinancialCategoriesApplicants[0]!,
        isError: false,
        isLoading: false,
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
            applicantsCount: 0,
            isError: false,
            isLoading: false,
        };
        const { getByText } = render(<IncomeAndExpensesSnapshot {...props} />);

        expect(getByText(incomeAndExpensesStrings.EMPTY_STATE_TABLE_INCOME_AND_EXPENSES)).toBeInTheDocument();
    });

    it('Should display total income', () => {
        const { getByText } = render(<IncomeAndExpensesSnapshot {...mockProps} />);
        expect(getByText(mockProps.totalNetBalance)).toBeInTheDocument();
    });
});
