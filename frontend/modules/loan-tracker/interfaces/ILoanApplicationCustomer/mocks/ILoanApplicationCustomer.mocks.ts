import { VERIFICATION_STATUSES } from './../../../constants/LoanStateMap.consts';
import { ILoanApplicationCustomer } from '../ILoanApplicationCustomer';

export const mockLoanCustomers: ILoanApplicationCustomer[] = [
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

export const newAddedCustomer: ILoanApplicationCustomer = {
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
