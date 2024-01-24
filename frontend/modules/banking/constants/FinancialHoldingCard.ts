import { IFinancialHoldingCard } from '../components/FinancialHoldingCard/FinancialHoldingCard.interface';

export const mockFinancialHoldingCards: IFinancialHoldingCard[] = [
    {
        id: '1',
        currencyId: 'USD',
        lastUpdated: new Date('2022-03-08'),
        performance: 8.09,
        name: 'Discretionary account #237940',
        type: 'Discretionary',
        value: 987_225,
        timeFrame: 'YTD',
    },

    {
        id: '2',
        currencyId: 'USD',
        lastUpdated: new Date('2022-03-08'),
        performance: -5.09,
        name: 'Alternative assets',
        type: 'Other',
        value: 5_556,
        timeFrame: '1 Year',
    },

    {
        id: '3',
        currencyId: 'USD',
        lastUpdated: new Date('2022-03-08'),
        performance: 3.09,
        name: 'Custodial account',
        type: 'Custodial',
        value: 435_987,
        timeFrame: '5 Year',
    },
];
