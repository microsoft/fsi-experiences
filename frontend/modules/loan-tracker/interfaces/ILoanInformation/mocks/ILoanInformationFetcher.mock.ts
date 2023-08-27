import { ILoanInformation, LoanInformationMetadata } from '../ILoanInformation';
import { mockLoanInformation, mockLoanInformationMetadata } from './ILoanInformation.mocks';
import { ILoanInformationFetcher } from '../ILoanInformationFetcher';

export class MockLoanInformationFetcher implements ILoanInformationFetcher {
    public async getLoanInformation(): Promise<ILoanInformation> {
        return mockLoanInformation;
    }
    public async getLoanInformationMetadata(): Promise<LoanInformationMetadata> {
        return mockLoanInformationMetadata;
    }
}
