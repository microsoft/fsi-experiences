import React from 'react';
import { render, waitFor } from '@testing-library/react';
import BaseCurrency from './BaseCurrency';
import { ICurrenciesDetails } from '../../../context/currency/ICurrenciesDetails';
import { IBaseCurrencyProps } from './BaseCurrency.interface';
import { FSIContainer } from '../../../context/FSIContext';
import userEvent from '@testing-library/user-event';
import commonStrings from '../../../assets/strings/common/common.1033.json';

const currenciesDetails: ICurrenciesDetails = {
    baseCurrencyCode: 'ILS',
    baseCurrencyId: 'ILS_ID',
    currencies: {
        EUR_ID: {
            code: 'EUR',
            id: 'EUR_ID',
            name: 'euro',
            symbol: '-',
            precision: 1,
        },
    },
};

const renderBaseCurrency = (props: IBaseCurrencyProps) => {
    return render(
        <FSIContainer currenciesDetails={currenciesDetails}>
            <BaseCurrency {...props} />
        </FSIContainer>
    );
};

describe('BaseCurrency', () => {
    it('Render base currency iso code', () => {
        const { getByText } = renderBaseCurrency({});
        expect(getByText(currenciesDetails.baseCurrencyCode, { exact: false })).toBeVisible();
    });

    it('Render base currency text without exchange', async () => {
        const { getByText, getByTestId, getByRole } = renderBaseCurrency({});
        expect(getByText('ILS')).toBeVisible();
        const icon = getByTestId('indicator-icon-info');

        expect(icon).toBeVisible();
        userEvent.hover(icon);
        await waitFor(() => expect(getByRole('tooltip')).toBeInTheDocument());

        expect(getByRole('tooltip')).toContainHTML(commonStrings.CURRENCY_DEFAULT_TOOLTIP);
    });

    it('Render base currency text with exchange object', async () => {
        const { getByText, getByTestId, getByRole } = renderBaseCurrency({
            exchange: {
                fromCurrency: 'EUR_ID',
                rate: 3.523,
            },
        });
        expect(getByText(commonStrings.AMOUNT_IN.replace('{{code}}', 'ILS'))).toBeVisible();
        const icon = getByTestId('indicator-icon-info');

        expect(icon).toBeVisible();
        userEvent.hover(icon);
        await waitFor(() => expect(getByRole('tooltip')).toBeInTheDocument());

        expect(getByRole('tooltip')).toContainHTML('1 EUR = 3.52 ILS');
    });

    it('Render base currency text with unmapped exchange object', async () => {
        const { getByText, getByTestId, getByRole } = renderBaseCurrency({
            exchange: {
                fromCurrency: 'UNMAPPED_CURRENCY_ID',
                rate: 3.523,
            },
        });
        expect(getByText(commonStrings.AMOUNT_IN.replace('{{code}}', 'ILS'))).toBeVisible();
        const icon = getByTestId('indicator-icon-info');

        expect(icon).toBeVisible();
        userEvent.hover(icon);
        await waitFor(() => expect(getByRole('tooltip')).toBeInTheDocument());

        expect(getByRole('tooltip')).toContainHTML(commonStrings.CURRENCY_DEFAULT_TOOLTIP);
    });

    it('Render base currency text with exchange but without rate', async () => {
        const { getByText, getByTestId, getByRole } = renderBaseCurrency({
            exchange: {
                fromCurrency: 'UNMAPPED_CURRENCY_ID',
            },
        });
        expect(getByText(commonStrings.AMOUNT_IN.replace('{{code}}', 'ILS'))).toBeVisible();
        const icon = getByTestId('indicator-icon-info');

        expect(icon).toBeVisible();
        userEvent.hover(icon);
        await waitFor(() => expect(getByRole('tooltip')).toBeInTheDocument());

        expect(getByRole('tooltip')).toContainHTML(commonStrings.CURRENCY_DEFAULT_TOOLTIP);
    });

    it('Render base currency with different color', async () => {
        const { getByText } = renderBaseCurrency({ color: 'red' });
        expect(getByText('ILS')).toHaveStyle({ color: 'red' });
    });

    it('Render with aria-label for icon focus screen reader', async () => {
        const { getByLabelText } = renderBaseCurrency({});
        expect(getByLabelText(commonStrings.ARIA_LABEL_EXCHANGE_RATE)).toBeVisible();
    });

    it('Render with context aria-label for icon focus screen reader', async () => {
        const { getByLabelText } = renderBaseCurrency({ ariaLabelPrefix: 'Assets' });
        expect(getByLabelText(`Assets - ${commonStrings.ARIA_LABEL_EXCHANGE_RATE}`)).toBeVisible();
    });

    it('Should NOT Render indicator icon, when hideCurrencyInfoIcon is set', async () => {
        const { queryByTestId } = renderBaseCurrency({
            exchange: {
                fromCurrency: 'UNMAPPED_CURRENCY_ID',
            },
            hideCurrencyInfoIcon: true,
        });

        const icon = queryByTestId('indicator-icon-info');

        expect(icon).toBeNull();
    });
});
