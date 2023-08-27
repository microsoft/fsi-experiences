import { ILoanApplicationCustomer } from '../ILoanApplicationCustomer';
import { newAddedCustomer } from './ILoanApplicationCustomer.mocks';
import { ILoanCustomerLookupFetcher } from '../ILoanApplicationCustomerLookupFetcher';
import { MockLoanApplicantFetcher } from '../../ILoanApplicant/mocks/ILoanApplicantFetcher.mocks';

export class MockLoanApplicationCustomerFetcher extends MockLoanApplicantFetcher implements ILoanCustomerLookupFetcher {
    public async addApplicant(applicationId: string, applicantData: ILoanApplicationCustomer): Promise<ILoanApplicationCustomer> {
        return newAddedCustomer;
    }
    public removeApplicant(applicantId: string): Promise<void> {
        return Promise.resolve();
    }
}

export class MockLoanApplicationCustomerFetcherNotPrivileged extends MockLoanApplicationCustomerFetcher {
    public hasApplicantPrivilege(operation: number): boolean {
        return false;
    }
}
