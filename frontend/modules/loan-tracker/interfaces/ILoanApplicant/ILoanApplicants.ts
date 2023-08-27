import { ILoanApplicant } from './ILoanApplicant';

export interface ILoanApplicants {
    applicants: ILoanApplicant[];
    primaryApplicantId: string;
}
