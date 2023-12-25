import { IFinancialCategory } from './IFinancialCategory';
export interface IIncome extends IFinancialCategory {}
export interface IExpense extends IFinancialCategory {}
export interface IApplicantIncomeAndExpense {
    incomes: IIncome[];
    expenses: IExpense[];
    currencyId?: string;
}

export interface IIncomeAndExpenseTypes {
    incomeTypes: Array<{ key: string | number; text: string }>;
    expenseTypes: Array<{ key: string | number; text: string }>;
}

export interface IIncomeAndExpenses {
    totalIncomes: number;
    totalExpenses: number;
    applicantTotalIncomes: number;
    applicantTotalExpenses: number;
    applicantName: string;
    currencyId: string;
}
