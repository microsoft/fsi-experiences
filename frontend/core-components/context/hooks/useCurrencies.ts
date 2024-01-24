import { ICurrenciesDetails } from '../currency/ICurrenciesDetails';
import { useFSIContext } from './useFSIContext';

export const useCurrencies = (): ICurrenciesDetails => {
    const context = useFSIContext();

    return context.currenciesDetails;
};
