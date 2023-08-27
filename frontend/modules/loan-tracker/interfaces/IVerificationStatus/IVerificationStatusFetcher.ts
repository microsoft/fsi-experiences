import { ActiveStatusCodesValues, StatesValues, VERIFICATION_STATUSES } from '../../constants/LoanStateMap.consts';

export type VerificationStatusesKeys = keyof typeof VERIFICATION_STATUSES;

export type VerificationStatusesValues = typeof VERIFICATION_STATUSES[VerificationStatusesKeys];

export interface IVerificationStatusFetcher {
    updateVerificationStatus: (loanId: string, verificationStatus: VerificationStatusesValues) => Promise<VerificationStatusesValues>;
    getLoanStatuses(loanId: string): Promise<{ stateCode: StatesValues; statusCode: ActiveStatusCodesValues }>;
    hasVerifyPrivilege(): boolean;
}
