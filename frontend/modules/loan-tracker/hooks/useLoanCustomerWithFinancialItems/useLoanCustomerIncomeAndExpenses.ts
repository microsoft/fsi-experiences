import { useCallback, useMemo } from 'react';
import { IExpense, IIncome } from '../../interfaces/ILoanFinancialCategory/ILoanIncomeAndExpenses';
import { ILoanApplicationCustomer } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';
import { ILoanApplicationIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanApplicationIncomeAndExpensesFetcher';
import useIncomeAndExpenses, { IUseIncomeAndExpensesResponse } from '../useIncomeAndExpenses/useIncomeAndExpenses';
import useLoanCustomerLookup, { IUseLoanCustomerLookupOutput } from '../useLoanCustomer/useLoanCustomer';
import { customerWithIncomeAndExpensesQuery as queryName } from '../../constants/LoanQueries.consts';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { useQuery } from 'react-query';
import { ApplicantFinancialCategoryOption } from '../../constants/ApplicantFinancialItemCategories.consts';

interface IUseLoanCustomerIncomeAndExpenses {
    fetcher: ILoanApplicationIncomeAndExpensesFetcher;
    loanApplicationId: string;
}

interface IUseLoanCustomerIncomeAndExpensesOutput extends IUseLoanCustomerLookupOutput, IUseIncomeAndExpensesResponse {
    income?: IIncome[];
    expenses?: IExpense[];
    selectedApplicant?: ILoanApplicationCustomer;
    incomeTypes: IDropdownOption[];
    expenseTypes: IDropdownOption[];
    hasFinancialItemPrivilege: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
}

const useLoanCustomerIncomeAndExpenses = ({
    fetcher,
    loanApplicationId,
}: IUseLoanCustomerIncomeAndExpenses): IUseLoanCustomerIncomeAndExpensesOutput => {
    const {
        isLoanLocked,
        applicants,
        selectedApplicantId,
        onChangeApplicant,
        onVerifyToggle,
        isLoading: isLoadingParty,
        isError: isErrorParty,
        hasApplicantPrivilege,
    } = useLoanCustomerLookup({ queryName, fetcher, loanApplicationId });
    const {
        isLoading: isLoadingIncomeAndExpenses,
        income,
        expenses,
        loanIncomeAndExpenses,
        isError: incomeAndExpensesIsError,
    } = useIncomeAndExpenses({
        incomeAndExpensesFetcherFunc: async () => await fetcher.getIncomeAndExpenses(),
        applicantId: selectedApplicantId,
    });
    const {
        isLoading: incomeAndExpenseTypeIsLoading,
        data,
        isError: incomeAndExpenseTypeError,
    } = useQuery('loanIncomeAndExpenseTypes', () => fetcher.getIncomeAndExpenseTypes());

    const isError = incomeAndExpensesIsError || isErrorParty || incomeAndExpenseTypeError;
    const isLoading = isLoadingIncomeAndExpenses || isLoadingParty || incomeAndExpenseTypeIsLoading;

    const selectedApplicant = useMemo(() => applicants?.find(applicant => applicant.id === selectedApplicantId), [applicants, selectedApplicantId]);

    const applicantIncome = useMemo(() => income?.filter(asset => asset.customerId === selectedApplicant?.id), [income, selectedApplicant]);

    const applicantExpenses = useMemo(() => expenses?.filter(asset => asset.customerId === selectedApplicant?.id), [expenses, selectedApplicant]);

    const hasFinancialItemPrivilege = useCallback(
        (category: ApplicantFinancialCategoryOption, operation: number) => fetcher.hasFinancialItemPrivilege(category, operation) && !isLoanLocked,
        [isLoanLocked, fetcher]
    );

    return {
        loanIncomeAndExpenses,
        income: applicantIncome,
        expenses: applicantExpenses,
        onChangeApplicant,
        onVerifyToggle,
        selectedApplicantId,
        selectedApplicant,
        applicants,
        isLoading,
        isError,
        isLoanLocked,
        incomeTypes: data?.incomeTypes || [],
        expenseTypes: data?.expenseTypes || [],
        hasApplicantPrivilege,
        hasFinancialItemPrivilege,
    };
};

export default useLoanCustomerIncomeAndExpenses;
