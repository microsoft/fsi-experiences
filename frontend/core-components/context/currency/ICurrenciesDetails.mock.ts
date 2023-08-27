import { ICurrenciesDetails } from './ICurrenciesDetails';

export const DEFAULT_CURR_CODE = 'USD';
export const SECONDARY_CURR_CODE = 'EUR';

export const MockCurrenciesDetails: ICurrenciesDetails = {
    baseCurrencyCode: DEFAULT_CURR_CODE,
    baseCurrencyId: DEFAULT_CURR_CODE,
    currencies: {
        [DEFAULT_CURR_CODE]: {
            code: DEFAULT_CURR_CODE,
            id: DEFAULT_CURR_CODE,
            name: 'US Dollars',
            precision: 2,
            symbol: '$',
        },
        [SECONDARY_CURR_CODE]: {
            code: SECONDARY_CURR_CODE,
            id: SECONDARY_CURR_CODE,
            name: 'Euro',
            precision: 2,
            symbol: '€',
        },
    },
};
