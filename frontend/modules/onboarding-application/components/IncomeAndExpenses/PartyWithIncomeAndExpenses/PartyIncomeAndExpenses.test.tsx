import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PartyIncomeAndExpenses from './PartyIncomeAndExpenses';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { applicantsDataMock } from '../../../interfaces/mocks/IAssetsAndLiabilities.mock';
import { incomeAndExpensesMock } from '../../../interfaces/mocks/IIncomeAndExpenses.mocks';
import incomeAndExpensesStrings from '../../../assets/strings/IncomeAndExpenses/IncomeAndExpenses.1033.json';

describe('PartyIncomeAndExpenses', () => {
    const mockProps = {
        applicantName: applicantsDataMock.applicants[0].name,
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

    it('Check that primary applicant balance row is being displayed when there is only primary applicant', () => {
        const { getByTestId } = render(
            <PartyIncomeAndExpenses {...mockProps} numberOfApplicants={1} totalNetBalance={mockProps.applicantNetBalance} />
        );
        expect(getByTestId('primary-applicant-balance-row')).toBeInTheDocument();
    });
});
