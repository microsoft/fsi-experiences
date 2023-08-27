import { useEffect, useState } from 'react';
import currencyService from '../services/CurrencyService';
import contextService from '../services/ContextService';

export const useCurrencies = (enabled: boolean) => {
    const [currenciesDetails, setCurrenciesDetails] = useState<any>();

    const context = contextService.geContext();

    useEffect(() => {
        if (!context || contextService.isTestMode() || !enabled) {
            return;
        }

        currencyService.getCurrencies(context!).then(setCurrenciesDetails);
    }, [context, enabled]);

    return currenciesDetails;
};
