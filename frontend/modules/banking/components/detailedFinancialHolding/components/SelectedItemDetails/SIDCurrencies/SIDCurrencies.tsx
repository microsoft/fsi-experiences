import React, { FC, useMemo } from 'react';
import { Separator } from '@fluentui/react/lib/Separator';
import { useCurrencies } from '@fsi/core-components/dist/context/hooks/useCurrencies';
import BaseCurrency from '@fsi/core-components/dist/components/atoms/BaseCurrency/BaseCurrency';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import {
    amountAndCurrencyLabelStyles,
    currencyNameStyle,
    currencyStyle,
    defaultBalanceSeparator,
    outerStackTokens,
    currencyStackTokens,
} from './SIDCurrencies.style';
import { Stack } from '@fluentui/react';
import { AccountHeaderProps, CreditHeaderProps, InvestmentHeaderProps, LoanHeaderProps, SavingHeaderProps } from '../../../utilities';
import { FinancialHoldingFields } from '../../../../../interfaces/FHEntity';

export interface ISIDCurrenciesProps {
    data: AccountHeaderProps | LoanHeaderProps | CreditHeaderProps | SavingHeaderProps | InvestmentHeaderProps;
    entity?: FinancialHoldingFields;
}

const SIDCurrencies: FC<ISIDCurrenciesProps> = ({ entity, data }) => {
    const { baseCurrencyId } = useCurrencies();
    const isNotInDefaultCurrency = entity?.currencyId && baseCurrencyId !== entity?.currencyId;

    const exchange = useMemo(() => {
        if (!entity || !entity.currencyId) {
            return undefined;
        }

        return {
            fromCurrency: entity.currencyId,
            rate: entity.balanceExchangeRate,
        };
    }, [entity]);

    return (
        <Stack verticalAlign="center" grow={1}>
            <Stack wrap horizontal tokens={outerStackTokens} horizontalAlign="start">
                <Stack.Item>
                    <Stack verticalFill verticalAlign="space-between" horizontalAlign="start">
                        <Stack.Item styles={amountAndCurrencyLabelStyles}>
                            <span>{data.amountLabel}</span>
                        </Stack.Item>
                        <Stack.Item>
                            <Currency
                                tokens={currencyStackTokens}
                                numberStyles={currencyNameStyle}
                                currencyStyles={currencyStyle}
                                value={data.balance}
                                currencyId={entity?.currencyId}
                                fricationDigits={2}
                            ></Currency>
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                {isNotInDefaultCurrency && entity && (
                    <>
                        <Separator vertical alignContent="center" styles={defaultBalanceSeparator} />
                        <Stack.Item>
                            <Stack verticalFill verticalAlign="space-between" horizontalAlign="start">
                                <Stack.Item>
                                    <BaseCurrency styles={amountAndCurrencyLabelStyles} exchange={exchange} />
                                </Stack.Item>
                                <Stack.Item>
                                    <Currency
                                        tokens={currencyStackTokens}
                                        numberStyles={currencyNameStyle}
                                        currencyStyles={currencyStyle}
                                        value={data.balanceDefault}
                                        currencyId={baseCurrencyId}
                                        fricationDigits={2}
                                    ></Currency>
                                </Stack.Item>
                            </Stack>
                        </Stack.Item>
                    </>
                )}
            </Stack>
        </Stack>
    );
};

export default SIDCurrencies;
