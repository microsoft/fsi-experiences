import { ILoanFinancialCategory } from './ILoanFinancialCategory';

export interface IIncome extends ILoanFinancialCategory {}

export interface IExpense extends ILoanFinancialCategory {}

export interface ILoanApplicationIncomeAndExpenses {
    income: IIncome[];
    expenses: IExpense[];
}

export interface IIncomeAndExpenseTypes {
    incomeTypes: Array<{ key: string | number; text: string }>;
    expenseTypes: Array<{ key: string | number; text: string }>;
}

export interface ILoanIncomeAndExpenses {
    totalIncomes: number;
    totalExpenses: number;
    primaryApplicantTotalIncomes: number;
    primaryApplicantTotalExpenses: number;
    primaryApplicantName: string;
    currencyId: string;
}

export interface IIncomeAndExpensesData extends ILoanApplicationIncomeAndExpenses {
    currencyId: string;
}
