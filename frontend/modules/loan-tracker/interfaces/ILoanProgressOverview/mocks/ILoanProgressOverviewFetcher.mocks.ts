import { ILoanProgressData } from '../ILoanProgressData';
import { loanProgressDataMock } from './ILoanProgressData.mocks';
import { ILoanProgressOverviewFetcher } from '../ILoanProgressOverviewFetcher';

export class MockLoanProgressOverviewFetcher implements ILoanProgressOverviewFetcher {
    public async getLoanProgressOverviewData(): Promise<ILoanProgressData[]> {
        return loanProgressDataMock;
    }
}
