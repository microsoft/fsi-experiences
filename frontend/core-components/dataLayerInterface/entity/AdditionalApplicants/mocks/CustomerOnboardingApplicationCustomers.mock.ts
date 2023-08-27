import { ICustomerOnboardingApplicationCustomer } from '../ICustomerOnboardingApplicationCustomer';

export const mockCustomerOnboardingCustomers: ICustomerOnboardingApplicationCustomer[] = [
    {
        isPrimary: true,
        firstName: 'Carole',
        lastName: 'Baskin',
        role: 'Borrower',
        fullName: 'Carole Baskin',
        id: '97b75c5a-1dea-eb11-bacb-0022480429cc',
    },
    {
        isPrimary: false,
        firstName: 'Pablo Diego José Francisco',
        lastName: 'Exotic',
        role: 'Co-signer',
        fullName: 'Pablo Diego José Francisco Exotic',
        id: '6c11fdaf-b4eb-eb11-bacb-0022480429cc',
    },
    {
        isPrimary: false,
        firstName: 'Charlotte Isabella Abigail Josephine Eleanor Victoria',
        lastName: 'Copperfield',
        role: 'Co-signer',
        fullName: 'Charlotte Isabella Abigail Josephine Eleanor Victoria Copperfield',
        id: '7c22pfaf-d5ee-tr22-frtg-0033591539vv',
    },
];

export const newAddedCustomer: ICustomerOnboardingApplicationCustomer = {
    isPrimary: false,
    firstName: 'Bernadette',
    lastName: 'Dickens',
    role: '104800001',
    fullName: 'CJ',
    id: '7j11fdaf-b4eb-eb11-bacb-0022480429cc',
};

export const rolesMock: Array<{ key: string | number; text: string }> = [
    { key: '104800000', text: 'Borrower' },
    { key: '104800001', text: 'Co-signer' },
    { key: '104800002', text: 'Guarantor' },
];
