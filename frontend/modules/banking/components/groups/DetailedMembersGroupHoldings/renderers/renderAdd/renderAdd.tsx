/* istanbul ignore file */
import { Checkbox } from '@fluentui/react/lib/components/Checkbox/Checkbox';
import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import { groupsAddCheckBoxStyles } from './renderAdd.style';

const renderAdd =
    ({ financialHoldings, onFHSelected, translate }) =>
    (groupHolding: IGroupFinancialHolding) =>
        groupHolding ? (
            <Checkbox
                styles={groupsAddCheckBoxStyles}
                ariaLabel={translate('SELECT_ROW')}
                checked={financialHoldings.some(fh => fh.id === groupHolding.id)}
                onChange={(ev, isChecked) => /* istanbul ignore next*/ onFHSelected?.([groupHolding], isChecked)}
                data-testid="group-detailed-holdings-row-checkbox"
            />
        ) : (
            ''
        );

export default renderAdd;
