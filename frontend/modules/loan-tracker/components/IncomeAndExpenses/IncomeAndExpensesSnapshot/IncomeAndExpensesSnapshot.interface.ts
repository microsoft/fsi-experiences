import { ILoanApplicant } from '../../../interfaces/ILoanApplicant/ILoanApplicant';

export interface IIncomeAndExpensesSnapshotProps {
    totalNetBalance: number;
    applicantNetBalance: number;
    applicants: ILoanApplicant[];
    selectedApplicant: ILoanApplicant;
    isLoading?: boolean;
    isError?: boolean;
    currencyId?: string;
}
