import { IApplicant } from '../../../../interfaces/IApplicant';

export interface IIncomeAndExpensesSnapshotProps {
    totalNetBalance: number;
    applicantNetBalance: number;
    applicantsCount: number;
    selectedApplicant: IApplicant;
    isLoading: boolean;
    isError: boolean;
    currencyId?: string;
}
