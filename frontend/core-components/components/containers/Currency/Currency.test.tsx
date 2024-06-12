import React from 'react';
import { render } from '@testing-library/react';
import { FSIContainer } from '../../../context/FSIContext';
import { MockCurrenciesDetails } from '../../../context/currency/ICurrenciesDetails.mock';
import { ICurrencyProps } from './Currency.interface';
import Currency from './Currency';

const renderCurrency = (props: ICurrencyProps) => {
    return render(
        <FSIContainer locale={'en-US'} currenciesDetails={MockCurrenciesDetails}>
            <Currency {...props} />
        </FSIContainer>
    );
};

describe('Currency', () => {
    it('should render currency with base', () => {
        const { getByText } = renderCurrency({ value: 10000 });

        expect(getByText('10,000')).toBeVisible();
        expect(getByText('USD')).toBeVisible();
    });

    it('should render currency with different currency', () => {
        const { getByText } = renderCurrency({ value: 10000, currencyId: 'EUR' });

        expect(getByText('10,000')).toBeVisible();
        expect(getByText('EUR')).toBeVisible();
    });

    it('should render in compact mode', () => {
        const { getByText } = renderCurrency({ value: 1245454545, compact: true, fricationDigits: 2 });

        expect(getByText('1.25B')).toBeVisible();
        expect(getByText('USD')).toBeVisible();
    });

    it('should not render in compact mode for value < 1M', () => {
        const { getByText } = renderCurrency({ value: 455454, compact: true });

        expect(getByText('455,454')).toBeVisible();
        expect(getByText('USD')).toBeVisible();
    });

    it('should not render with different style', () => {
        const { getByText } = renderCurrency({ value: 100, numberStyles: { root: { color: 'red' } }, currencyStyles: { root: { color: 'blue' } } });

        expect(getByText('100')).toHaveStyle({ color: 'red' });
        expect(getByText('USD')).toHaveStyle({ color: 'blue' });
    });

    it('should render currency with different alignment', () => {
        const { getByTestId } = renderCurrency({ value: 100, horizontalAlign: 'center' });

        expect(getByTestId('currency-wrapper')).toHaveStyle({ justifyContent: 'center' });
    });
});
