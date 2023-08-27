import { ILoanFinancialCategory } from './ILoanFinancialCategory';
import { IIncomeAndExpensesData, IIncomeAndExpenseTypes } from './ILoanIncomeAndExpenses';
import { ILoanApplicants } from '../ILoanApplicant/ILoanApplicants';

export type IncomeOrExpenseType = 'income' | 'expense';

export interface ILoanIncomeAndExpensesFetcher {
    getIncomeAndExpenses(): Promise<IIncomeAndExpensesData>;
    getApplicantsData(): Promise<ILoanApplicants>;
    getIncomeAndExpenseTypes(): Promise<IIncomeAndExpenseTypes>;
    addItem(item: ILoanFinancialCategory, category: IncomeOrExpenseType): Promise<ILoanFinancialCategory>;
    updateItem(item: ILoanFinancialCategory, category: IncomeOrExpenseType): Promise<boolean>;
    deleteItem(id: string, category: IncomeOrExpenseType): Promise<boolean>;
}
