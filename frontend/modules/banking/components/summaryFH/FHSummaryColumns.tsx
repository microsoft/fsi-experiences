import React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { summarySumColumnStyles, withIconClassNames, withoutIconClassNames } from './summaryFHConstants';
import IndicatorColumn from './IndicatorColumn';
import { IAccountsLineProps } from './FHAccountsTable';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { ColumnActionsMode, IColumn } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';

export interface IFHSummaryRowProps {
    icon: string;
    name: string;
    sum: number;
    indicator: any;
    count: number;
    restricted: boolean;
}

export const baseName: IColumn = {
    key: 'nameColumn',
    name: '',
    fieldName: 'name',
    minWidth: 80,
    maxWidth: 1000,
    isResizable: false,
    className: withoutIconClassNames.nameText,
    columnActionsMode: ColumnActionsMode.disabled,
};

export const nameWithSum = {
    ...baseName,
    onRender: (item: IFHSummaryRowProps) => (
        <Stack tokens={{ childrenGap: 14 }}>
            <span className={withIconClassNames.text} data-testid={`summary-cell-text-${item.count ? 'active' : 'inactive'}-${item.name}`}>
                {item.name}
            </span>
            <SumItem {...item} />
        </Stack>
    ),
};

export const renderMark = (checked: boolean, translate, testId: string, className = withoutIconClassNames.BlueIconImg, icon = 'CheckMark') => {
    const label = translate(checked ? 'EXISTS' : 'NO_DATA_AVAILABLE');
    return checked ? (
        <Icon aria-label={label} iconName={checked ? icon : 'empty'} className={className} data-testid={testId} />
    ) : (
        <div data-testid={testId}>-</div>
    );
};

export const onRenderAccountName = (item: IAccountsLineProps) => {
    return (
        <span title={item.name} style={{ overflow: 'hidden' }}>
            {item.name}
        </span>
    );
};

export const accountNameSmaller = ({ translate }: { translate: TranslationFunction }) => ({
    columnActionsMode: ColumnActionsMode.disabled,
    key: 'nameColumn',
    name: translate('ACCOUNT_NAME'),
    fieldName: 'name',
    minWidth: 70,
    maxWidth: 1000,
    isResizable: false,
    className: withoutIconClassNames.nameText,
    headerClassName: withoutIconClassNames.AccountHeaderStyle,
    onRender: onRenderAccountName,
});

export const name = {
    ...baseName,
    className: withIconClassNames.IconCell,
    isIconOnly: false,
    onRender: (item: IFHSummaryRowProps) => {
        return (
            <span className={withIconClassNames.text} data-testid={`blue-icon-${item.count ? 'active' : 'inactive'}-${item.name}`}>
                <Icon iconName={item.icon} className={withIconClassNames.IconImg} /> {item.name}
            </span>
        );
    },
};

export const nameSmall = {
    ...name,
    minWidth: 50,
};

export const SumItem = ({ count, sum, restricted }: { count: number; sum: number; restricted?: boolean }) => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    if (restricted) {
        return (
            <Indicator
                iconName={'lock'}
                tooltipProps={{ content: translate('CUSTOMER_INFORMATION_RESTRICTED') }}
                size={14}
                color={COLORS.darkGray160}
                iconAriaLabel={translate('CUSTOMER_INFORMATION_RESTRICTED')}
            />
        );
    }
    return count === 0 ? <span>-</span> : <NumericValue styles={summarySumColumnStyles} value={sum} />;
};

export const nameSmallWithSum = {
    ...nameSmall,
    onRender: (item: IFHSummaryRowProps) => {
        return (
            <Stack horizontal tokens={{ childrenGap: 8 }}>
                <span className={withIconClassNames.text} data-testid={`blue-icon-${item.count ? 'active' : 'inactive'}-${item.name}`}>
                    <Icon iconName={item.icon} className={withIconClassNames.IconImg} />
                </span>
                <Stack tokens={{ childrenGap: 8 }}>
                    <Stack className={withIconClassNames.text} wrap data-testid="summary-cell-name">
                        {item.name}
                    </Stack>
                    <SumItem {...item} />
                </Stack>
            </Stack>
        );
    },
};

export const sumWithIconClassName = {
    columnActionsMode: ColumnActionsMode.disabled,
    key: 'sumColumn',
    name: '',
    fieldName: 'sum',
    minWidth: 90,
    maxWidth: 90,
    isResizable: false,
    className: withIconClassNames.leftSumText,
    onRender: SumItem,
};

export const sumWithoutIconClassName = {
    ...sumWithIconClassName,
    className: withoutIconClassNames.leftSumText,
    headerClassName: withoutIconClassNames.hiddenHeader,
};

export const onRenderIndicator = ({ indicator }) => {
    return <IndicatorColumn indicator={indicator} size={14} />;
};

const indicatorWithIconClassName = {
    key: 'indicatorColumn',
    name: '',
    fieldName: 'indicators',
    minWidth: 15,
    maxWidth: 15,
    isResizable: false,
    className: withIconClassNames.IconCell,
    isIconOnly: true,
    columnActionsMode: ColumnActionsMode.disabled,
    onRender: onRenderIndicator,
};

export const indicatorWithoutIconClassName = {
    ...indicatorWithIconClassName,
    headerClassName: withoutIconClassNames.otherHeaderStyle,
    className: withoutIconClassNames.IconCell,
};

const fullViewColumnsWithIcon = [nameSmall, sumWithIconClassName, indicatorWithIconClassName];

const mobileColumnsWithIcon = [nameSmallWithSum, indicatorWithIconClassName];

const fullViewColumnsInvestments = [nameSmall, sumWithIconClassName];

export const getColumnsLinesOfCredit = (isCompact?: boolean): IColumn[] => (isCompact ? mobileColumnsWithIcon : fullViewColumnsWithIcon);

export const getColumnsInvestments = (isCompact?: boolean): IColumn[] => (isCompact ? mobileColumnsWithIcon : fullViewColumnsInvestments);

export const getColumns = (isCompact?: boolean): IColumn[] => (isCompact ? mobileColumnsWithIcon : fullViewColumnsWithIcon);
