import { VerificationStatusesValues } from '../IVerificationStatus/IVerificationStatusFetcher';

export interface ILoanApplicationCustomer {
    id: string;
    role: string;
    fullName: string;
    firstName: string;
    lastName: string;
    isPrimary: boolean;
    verificationStatus: VerificationStatusesValues;
    phone?: string;
    email?: string;
}
