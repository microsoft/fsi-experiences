export interface ILoanFinancialCategory {
    customerId: string;
    description: string;
    name: string;
    value: number;
    type: number | string;
    typeFormattedValue?: string;
    currencyId?: string;
    id: string;
}
