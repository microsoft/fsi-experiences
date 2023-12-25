import { IApplicationCustomer } from '../IApplicationCustomer';
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

export const mockCustomers: IApplicationCustomer[] = [
    {
        isPrimary: true,
        firstName: 'Carole',
        lastName: 'Baskin',
        role: 'Borrower',
        fullName: 'Carole Baskin',
        id: '97b75c5a-1dea-eb11-bacb-0022480429cc',
        verificationStatus: VERIFICATION_STATUSES.Verified,
    },
    {
        isPrimary: false,
        firstName: 'Pablo Diego José Francisco',
        lastName: 'Exotic',
        role: 'Co-signer',
        fullName: 'Pablo Diego José Francisco Exotic',
        id: '6c11fdaf-b4eb-eb11-bacb-0022480429cc',
        verificationStatus: VERIFICATION_STATUSES.Unverified,
    },
];

export const newAddedCustomer: IApplicationCustomer = {
    isPrimary: false,
    firstName: 'C',
    lastName: 'J',
    role: '104800001',
    fullName: 'CJ',
    id: '7j11fdaf-b4eb-eb11-bacb-0022480429cc',
    verificationStatus: VERIFICATION_STATUSES.Unverified,
};

export const rolesMock: Array<{ key: string | number; text: string }> = [
    { key: '104800000', text: 'Borrower' },
    { key: '104800001', text: 'Co-signer' },
    { key: '104800002', text: 'Guarantor' },
];
