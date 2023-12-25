import { mockCustomers } from './IApplicationCustomer.mocks';

const primaryApplicantID = '97b75c5a-1dea-eb11-bacb-0022480429cc';
const borrowerID = '6c11fdaf-b4eb-eb11-bacb-0022480429cc';

export const incomeAndExpensesMock = {
    incomes: [
        {
            customerId: primaryApplicantID,
            name: 'Child support',
            description: 'Child support/description',
            value: 1500,
            id: '1',
            currencyId: '1',
            type: 'Real estate owned',
        },
        {
            customerId: primaryApplicantID,
            name: 'Income from sources not already included',
            description: 'Income from sources not already included/description',
            type: 'Real estate owned',
            value: 2500,
            id: '2',
            currencyId: '1',
        },
        {
            customerId: primaryApplicantID,
            name: 'Income from savings',
            description: 'Income from savings/description',
            value: 2500,
            type: 'Real estate owned',
            id: '3',
            currencyId: '1',
        },
        {
            customerId: primaryApplicantID,
            name: 'Value of Business equity',
            description: 'Value of Business equity/description',
            value: 75000,
            type: 'Real estate owned',
            id: '4',
            currencyId: '1',
        },
        {
            customerId: borrowerID,
            name: 'Investments',
            type: 'Real estate owned',
            description:
                'Investments like property, shares and art can all earn money for you either through an increase in their value (this is called capital growth) or in the case of shares, by paying you an amount of money per share you hold (this is called a dividend).',
            value: 75000,
            id: '5',
            currencyId: '1',
        },
        {
            customerId: borrowerID,
            name: 'Government Payments',
            type: 'Real estate owned',
            description: 'Depending on your situation you may be eligible for assistance payments from the government.',
            value: 2500,
            id: '6',
            currencyId: '1',
        },
    ],
    expenses: [
        {
            customerId: primaryApplicantID,
            type: 'Real estate owned',
            name: 'Food/Groceries/Household products',
            description: 'Food/Groceries/Household products - description',
            value: 5033,
            id: '1',
            currencyId: '1',
        },
        {
            customerId: primaryApplicantID,
            type: 'Real estate owned',
            name: 'Automobile Insurance',
            description: 'Automobile Insurance/description',
            value: 1500,
            id: '2',
            currencyId: '1',
        },
        {
            customerId: primaryApplicantID,
            type: 'Real estate owned',
            name: 'Rent',
            description: 'Rent/description',
            value: 50301,
            id: '3',
            currencyId: '1',
        },
        {
            type: 'Real estate owned',
            customerId: borrowerID,
            name: 'Rent and insurance',
            description: 'Rent and insurance - description',
            value: 7000,
            id: '4',
            currencyId: '1',
        },
        {
            customerId: borrowerID,
            type: 'Real estate owned',
            name: 'Automobile Insurance',
            description: 'Automobile Insurance/description',
            value: 2500,
            id: '5',
            currencyId: '1',
        },
        {
            customerId: borrowerID,
            name: 'Health insurance',
            type: 'Real estate owned',
            description: 'Health insurance/description',
            value: 350000,
            id: '6',
            currencyId: '1',
        },
    ],
    currencyId: '1',
};
export const applicantsDataMock = { applicants: mockCustomers, primaryApplicantId: mockCustomers[0].id };
export const mockIncomeTypes = [
    {
        key: 104800000,
        text: 'Monthly salary',
    },
    {
        key: 104800001,
        text: 'Spouse salary',
    },
    {
        key: 104800002,
        text: 'Savings',
    },
    {
        key: 104800003,
        text: 'Investments',
    },
];

export const mockExpenseTypes = [
    {
        key: 104800000,
        text: 'Rent',
    },
    {
        key: 104800001,
        text: 'Mortgage',
    },
    {
        key: 104800002,
        text: 'Food',
    },
    {
        key: 104800003,
        text: 'Medical',
    },
];
