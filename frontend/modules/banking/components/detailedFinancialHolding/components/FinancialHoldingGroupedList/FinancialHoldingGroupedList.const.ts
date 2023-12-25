import { ColumnActionsMode, IColumn } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { balanceColumnHeaderStyles, fhColumnStyles } from './FinancialHoldingGroupedList.style';

export const indicatorColumn: IColumn = {
    key: 'indicator',
    minWidth: 20,
    name: '',
    fieldName: 'indicator',
    className: fhColumnStyles.indicatorCell,
    isIconOnly: true,
    columnActionsMode: ColumnActionsMode.disabled,
};

export const fhBalanceColumn: (translate: TranslationFunction) => IColumn = translate => ({
    key: 'bal',
    minWidth: 80,
    name: translate('BALANCE'),
    fieldName: 'balanceDisplay',
    className: fhColumnStyles.balanceCell,
    styles: balanceColumnHeaderStyles,
    columnActionsMode: ColumnActionsMode.disabled,
});

export const fhCurrencyColumn: (translate: TranslationFunction) => IColumn = translate => ({
    key: 'currency',
    minWidth: 60,
    name: translate('CURRENCY'),
    fieldName: 'currency',
    columnActionsMode: ColumnActionsMode.disabled,
});
