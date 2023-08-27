import { ILoanFinancialCategory } from '../ILoanFinancialCategory';
import { IIncomeAndExpensesData } from '../ILoanIncomeAndExpenses';
import { ILoanApplicants } from '../../ILoanApplicant/ILoanApplicants';
import { applicantsDataMock, incomeAndExpensesMock, mockIncomeTypes, mockExpenseTypes } from './ILoanIncomeAndExpenses.mocks';
import { ILoanIncomeAndExpensesFetcher } from '../ILoanIncomeAndExpensesFetcher';
import { MockLoanApplicantFetcher } from '../../ILoanApplicant/mocks/ILoanApplicantFetcher.mocks';

export class MockLoanIncomeAndExpensesFetcher extends MockLoanApplicantFetcher implements ILoanIncomeAndExpensesFetcher {
    public async getIncomeAndExpenses(): Promise<IIncomeAndExpensesData> {
        return incomeAndExpensesMock;
    }

    public async getApplicantsData(): Promise<ILoanApplicants> {
        return applicantsDataMock;
    }

    public async getIncomeAndExpenseTypes() {
        return { incomeTypes: mockIncomeTypes, expenseTypes: mockExpenseTypes };
    }

    public async addItem(item: ILoanFinancialCategory) {
        return item;
    }

    public async updateItem(item: ILoanFinancialCategory) {
        return true;
    }

    public async deleteItem(id: string) {
        return true;
    }
}
