export interface IFinancialHoldingCard {
    id: string;
    name: string;
    type?: string;
    value: number;
    currencyId?: string;
    performance?: number;
    lastUpdated?: Date;
    timeFrame?: string;
}
