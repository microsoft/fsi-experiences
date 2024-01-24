export const STATES = {
    Active: 0,
    Inactive: 1,
} as const;

export const ACTIVE_STATUS_CODES = {
    Draft: 104800000,
    InReview: 104800001,
    InProgress: 104800002,
    OnHold: 104800003,
    Approved: 104800004,
    Rejected: 104800005,
    Abandoned: 104800006,
} as const;

export const VERIFICATION_STATUSES = {
    Unverified: 104800000,
    Verified: 104800001,
} as const;

export type ActiveStatusCodesValues = typeof ACTIVE_STATUS_CODES[keyof typeof ACTIVE_STATUS_CODES];

export type StatesValues = typeof STATES[keyof typeof STATES];

export type VerificationStatusesKeys = keyof typeof VERIFICATION_STATUSES;

export type VerificationStatusesValues = typeof VERIFICATION_STATUSES[VerificationStatusesKeys];

export interface IVerificationStatusFetcher {
    updateVerificationStatus: (loanId: string, verificationStatus: VerificationStatusesValues) => Promise<VerificationStatusesValues>;
    getLoanStatuses(loanId: string): Promise<{ stateCode: StatesValues; statusCode: ActiveStatusCodesValues }>;
    hasVerifyPrivilege(): boolean;
}

export interface IApplicationCustomer {
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
