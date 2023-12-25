export interface ICurrency {
    id: string;
    name: string;
    code: string;
    symbol: string;
    precision: number;
}

export interface ICurrenciesDetails {
    baseCurrencyCode: string;
    baseCurrencyId: string;
    currencies: { [id: string]: ICurrency };
}
