import { ILoanProgressData } from './ILoanProgressData';

export interface ILoanProgressOverviewFetcher {
    getLoanProgressOverviewData(): Promise<ILoanProgressData[]>;
}
