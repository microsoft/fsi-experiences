/* istanbul ignore file */
import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import CurrencyCode from '@fsi/core-components/dist/components/atoms/CurrencyCode/CurrencyCode';

const renderCurrency = (groupHolding: IGroupFinancialHolding) => {
    return <CurrencyCode currencyId={groupHolding.currencyId} />;
};

export default renderCurrency;
