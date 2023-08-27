import { mockLoanCustomers } from '../../ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';

export const assetsAndLiabilitiesMock = {
    liabilities: [
        {
            customerId: mockLoanCustomers[0].id,
            name: 'Real estate',
            description: 'Asset name/description',
            value: 1500,
            type: 104800000,
            id: '1',
            currencyId: '1',
        },
        {
            customerId: mockLoanCustomers[1].id,
            name: 'Real estate',
            description: 'Asset name/description',
            value: 2500,
            type: 104800001,
            id: '2',
            currencyId: '1',
        },
    ],
    assets: [
        {
            customerId: mockLoanCustomers[0].id,
            name: 'Real estate',
            description: 'Asset name/description',
            value: 50733,
            type: 104800000,
            id: '1',
            currencyId: '1',
        },
        {
            customerId: mockLoanCustomers[0].id,
            name: 'Real estate',
            description: 'Asset name/description',
            value: 1500,
            type: 104800000,
            id: '2',
            currencyId: '1',
        },
        {
            customerId: mockLoanCustomers[1].id,
            name: 'Real estate',
            description: 'Asset name/description',
            value: 150301,
            type: 104800003,
            id: '3',
            currencyId: '1',
        },
    ],
    currencyId: '1',
};

export const mockAssetTypes = [
    {
        key: 104800000,
        text: 'Automobiles',
    },
    {
        key: 104800001,
        text: 'Boat or Vessel',
    },
    {
        key: 104800002,
        text: 'Bond',
    },
    {
        key: 104800003,
        text: 'Bridge loan not deposited',
    },
    {
        key: 104800004,
        text: 'Other',
    },
];

export const mockLiabilityTypes = [
    {
        key: 104800000,
        text: 'Alimony',
    },
    {
        key: 104800001,
        text: 'Child support',
    },
    {
        key: 104800002,
        text: 'Mortgage',
    },
    {
        key: 104800003,
        text: 'Loan',
    },
];
