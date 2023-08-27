/* istanbul ignore file */
import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { responsiveCurrencyStyles } from './renderBalance.style';

const renderBalance =
    ({ columns, isStart }) =>
    (groupHolding: IGroupFinancialHolding) => {
        if (!groupHolding) {
            return '';
        }
        return (
            <span data-testid="group-detailed-holdings-row-cell-balance">
                {columns.has('currency') ? (
                    <Currency
                        horizontalAlign={isStart ? 'start' : 'end'}
                        value={groupHolding.balanceDisplay}
                        currencyId={groupHolding.currencyId}
                        numberStyles={isStart ? responsiveCurrencyStyles : {}}
                        currencyStyles={isStart ? responsiveCurrencyStyles : {}}
                    />
                ) : (
                    <NumericValue value={groupHolding.balanceDisplay} />
                )}
            </span>
        );
    };

export default renderBalance;
