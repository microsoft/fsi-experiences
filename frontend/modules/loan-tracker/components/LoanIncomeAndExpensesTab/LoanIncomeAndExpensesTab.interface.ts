import { ILoanApplicationIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanApplicationIncomeAndExpensesFetcher';

export interface ILoanApplicationIncomeAndExpensesProps {
    fetcher: ILoanApplicationIncomeAndExpensesFetcher;
    loanApplicationId: string;
}
