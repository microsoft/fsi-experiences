import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IExpense, IIncome, IIncomeAndExpensesData } from '../../interfaces/ILoanFinancialCategory/ILoanIncomeAndExpenses';
import { calculateFinancialValues } from '../../helpers/calculateFinancialValues/calculateFinancialValues';
import { incomeAndExpensesQuery } from '../../constants/LoanQueries.consts';

export interface IUseIncomeAndExpensesProps {
    incomeAndExpensesFetcherFunc: () => Promise<IIncomeAndExpensesData>;
    applicantId?: string;
}

export interface IUseIncomeAndExpensesResponse {
    loanIncomeAndExpenses: {
        totalNetBalance: number;
        totalExpenses: number;
        applicantNetBalance: number;
        applicantTotalExpenses: number;
        currencyId: string;
    };
    isError: boolean;
    isLoading: boolean;
    income?: IIncome[];
    expenses?: IExpense[];
}

const useIncomeAndExpenses: (props: IUseIncomeAndExpensesProps) => IUseIncomeAndExpensesResponse = ({
    incomeAndExpensesFetcherFunc,
    applicantId,
}) => {
    const { isLoading, data: incomeAndExpenses, isError } = useQuery(incomeAndExpensesQuery, () => incomeAndExpensesFetcherFunc());

    const incomesData = useMemo(() => calculateFinancialValues(incomeAndExpenses?.income || [], applicantId), [incomeAndExpenses, applicantId]);
    const expensesData = useMemo(() => calculateFinancialValues(incomeAndExpenses?.expenses || [], applicantId), [incomeAndExpenses, applicantId]);

    const loanIncomeAndExpenses = {
        totalNetBalance: incomesData.total - expensesData.total, // overall income of primary applicant and all borrowers
        totalExpenses: expensesData.total,
        applicantNetBalance: incomesData.applicantTotal - expensesData.applicantTotal,
        applicantTotalExpenses: expensesData.applicantTotal,
        currencyId: incomeAndExpenses?.currencyId || '',
    };

    return {
        income: incomeAndExpenses?.income,
        expenses: incomeAndExpenses?.expenses,
        loanIncomeAndExpenses,
        isError,
        isLoading,
    };
};

export default useIncomeAndExpenses;
