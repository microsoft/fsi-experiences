import React from 'react';
import { render } from '@testing-library/react';
import { MockCurrenciesDetails } from '../../../context/currency/ICurrenciesDetails.mock';
import { FSIContainer } from '../../../context/FSIContext';
import CurrencyCode from './CurrencyCode';
import { ICurrencyCodeProps } from './CurrencyCode.interface';

const renderCurrency = (props: ICurrencyCodeProps) => {
    return render(
        <FSIContainer currenciesDetails={MockCurrenciesDetails}>
            <CurrencyCode {...props} />
        </FSIContainer>
    );
};

describe('CurrencyCode', () => {
    it('Render currency iso code', () => {
        const { getByText } = renderCurrency({ currencyId: 'EUR' });
        expect(getByText('EUR')).toBeVisible();
    });

    it('Render base currency when no currency id', () => {
        const { getByText } = renderCurrency({});
        expect(getByText(MockCurrenciesDetails.baseCurrencyCode)).toBeVisible();
    });

    it('Render currency display name in case no mapping for id', () => {
        const { getByText } = renderCurrency({ currencyId: 'unknown-currency-id', currencyDisplayName: 'Asimonim' });
        expect(getByText('Asimonim')).toBeVisible();
    });

    it('Should NOT be Rendered when currencyId has no match and currencyDisplayName is not defined', () => {
        const { queryByTestId } = renderCurrency({ currencyId: 'unknown-currency-id' });
        const currencyCode = queryByTestId('currency-code');
        expect(currencyCode).toBeNull();
    });

    it('Render currency with different style', () => {
        const { getByText } = renderCurrency({ currencyId: 'EUR', styles: { root: { fontSize: 20 } } });
        expect(getByText('EUR')).toHaveStyle({ fontSize: 20 });
    });
});
