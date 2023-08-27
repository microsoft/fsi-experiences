import { ICustomerIndicatorField } from '../CustomerIndicator';

export const mockIndicatorsData: ICustomerIndicatorField[] = [
    {
        value: 2.53,
        label: 'Assets/Liabilities',
        staleness: new Date('2022-03-08'),
    },
    {
        label: 'Financial holding',
    },
    {
        value: 16950,
        label: 'Net worth',
        staleness: new Date('2020-08-11'),
        currencyId: 'USD',
    },
    {
        label: 'no value',
        staleness: new Date('2020-12-06'),
        currencyId: 'USD',
    },
    {
        value: '138%',
        label: '1 year AuM growth',
        staleness: new Date('2020-12-06'),
    },
];
