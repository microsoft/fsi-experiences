import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { IncomeAndExpensesSnapshot } from './IncomeAndExpensesSnapshot/IncomeAndExpensesSnapshot';
import useIncomeAndExpenses from '../../hooks/useIncomeAndExpenses/useIncomeAndExpenses';
import type { ILoanIncomeAndExpensesProps } from './LoanIncomeAndExpenses.interface';

export const LoanIncomeAndExpenses: FC<ILoanIncomeAndExpensesProps> = ({ fetcher }) => {
    const {
        isLoading: isGetApplicantsLoading,
        data: applicantsData,
        isError: isGetApplicantsError,
    } = useQuery('getApplicantsQuery', () => fetcher.getApplicantsData());

    const {
        isLoading: isLoadingIncomeAndExpenses,
        loanIncomeAndExpenses,
        isError: incomeAndExpensesIsError,
    } = useIncomeAndExpenses({
        incomeAndExpensesFetcherFunc: async () => await fetcher.getIncomeAndExpenses(),
        applicantId: applicantsData?.primaryApplicantId,
    });

    const selectedApplicant = applicantsData?.applicants.find(applicant => applicant.id === applicantsData?.primaryApplicantId);

    return (
        <IncomeAndExpensesSnapshot
            currencyId={loanIncomeAndExpenses.currencyId}
            totalNetBalance={loanIncomeAndExpenses.totalNetBalance}
            applicantNetBalance={loanIncomeAndExpenses.applicantNetBalance}
            applicants={applicantsData?.applicants!}
            selectedApplicant={selectedApplicant!}
            isLoading={isGetApplicantsLoading || isLoadingIncomeAndExpenses}
            isError={isGetApplicantsError || incomeAndExpensesIsError}
        />
    );
};

export default LoanIncomeAndExpenses;
