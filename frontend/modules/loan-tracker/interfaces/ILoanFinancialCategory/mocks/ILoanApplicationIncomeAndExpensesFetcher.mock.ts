import { ILoanApplicationCustomer } from '../../ILoanApplicationCustomer/ILoanApplicationCustomer';
import { mockLoanCustomers, rolesMock } from '../../ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { ILoanApplicationIncomeAndExpensesFetcher } from '../ILoanApplicationIncomeAndExpensesFetcher';
import { ILoanFinancialCategory } from '../ILoanFinancialCategory';
import { mockExpenseTypes, mockIncomeTypes } from './ILoanIncomeAndExpenses.mocks';
import { MockLoanIncomeAndExpensesFetcher } from './ILoanIncomeAndExpensesFetcher.mocks';

export class MockLoanApplicationIncomeAndExpensesFetcher
    extends MockLoanIncomeAndExpensesFetcher
    implements ILoanApplicationIncomeAndExpensesFetcher
{
    public async getLoanApplicationCustomers(applicationId: string): Promise<ILoanApplicationCustomer[]> {
        return mockLoanCustomers;
    }
    public async updateCustomerVerifiedInformation(customer: ILoanApplicationCustomer): Promise<ILoanApplicationCustomer> {
        return customer;
    }

    public async getRoles(): Promise<Array<{ key: string | number; text: string }>> {
        return rolesMock;
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
