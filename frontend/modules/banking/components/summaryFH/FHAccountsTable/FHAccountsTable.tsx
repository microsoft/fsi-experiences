import React, { FC, useMemo } from 'react';
import { ColumnActionsMode, DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { FH_INSTRUMENT_NAME_TO_TYPE, FH_NAME_TO_CATEGORY_MAP } from '../../../constants/FHValueMaps';
import SummaryViewEmptyState from '../SummaryViewEmptyState';
import { margins, withoutIconClassNames } from '../summaryFHConstants';
import { renderMark, accountNameSmaller, sumWithoutIconClassName, indicatorWithoutIconClassName } from '../FHSummaryColumns';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IIndicatorFields, IndictableFH } from '../../../interfaces/FHEntity/IndictableFH';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { detailsListStyles } from './FHAccountsTable.style';
import onRenderCompactRow from './onRenderCompatRow';

export interface IAccountsLineProps {
    name?: string;
    directDebit?: boolean;
    standingOrder?: boolean;
    card?: boolean;
    overDraft?: boolean;
    sum: number;
    indicator?: IIndicatorFields;
}

export interface IFHSummaryTableProps {
    indictableFHItems: IndictableFH[];
    typesOptionSet: OptionSetMap;
    isCompact?: boolean;
}

const calcAccountFields = (indictableFHItems: IndictableFH[], typesOptionSet: OptionSetMap): Array<IAccountsLineProps> => {
    const summaryFields: IAccountsLineProps[] = [];

    indictableFHItems.forEach(value => {
        if (value.category === FH_NAME_TO_CATEGORY_MAP['Account']) {
            const FHI = value.financialInstruments;
            const FHType = typesOptionSet[value.type].text;
            const FHName = value.name;
            const FHValue = value.balanceDefault;
            const FHIMap = new Map();

            FHI.forEach((FHIValue: any) => {
                FHIMap.set(FHIValue.financialHoldingInstrumentType, true);
            });

            const indicatorArr = value.indicator;
            const indicator = indicatorArr && indicatorArr[0];

            summaryFields.push({
                name: `${FHName} (${FHType})`,
                directDebit: FHIMap.get(FH_INSTRUMENT_NAME_TO_TYPE['directDebit']) || false,
                standingOrder: FHIMap.get(FH_INSTRUMENT_NAME_TO_TYPE['standingOrder']) || false,
                card: FHIMap.get(FH_INSTRUMENT_NAME_TO_TYPE['card']) || false,
                overDraft: FHIMap.get(FH_INSTRUMENT_NAME_TO_TYPE['overdraft']) || false,
                sum: FHValue,
                indicator: indicator,
            });
        }
    });

    return summaryFields;
};

const headerFunction = (headerProps: any, defaultRender: any) => {
    /* istanbul ignore next */
    if (defaultRender && headerProps) {
        return defaultRender({
            ...headerProps,
            styles: {
                root: {
                    paddingTop: 0,
                    selectors: {
                        '.ms-DetailsHeader-cell': {
                            whiteSpace: 'normal',
                            textOverflow: 'clip',
                            lineHeight: 'normal',
                            alignItems: 'center',
                        },
                        '.ms-DetailsHeader-cell:first-child .ms-DetailsHeader-cellName': {
                            fontSize: FontSizes.size14,
                            fontWeight: FontWeights.semibold,
                            color: COLORS.black,
                        },
                        '.ms-DetailsHeader-cell:first-child .ms-DetailsHeader-cellTitle': {
                            justifyContent: 'flex-start',
                        },
                        '.ms-DetailsHeader-cellTitle': {
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                        },
                        '.ms-DetailsHeader-cellName': {
                            fontSize: FontSizes.size12,
                            fontWeight: FontWeights.regular,
                            alignItems: 'center',
                            textAlign: 'center',
                            color: COLORS.darkGray,
                        },
                    },
                },
            },
        });
    } else {
        /* istanbul ignore next */
        return null;
    }
};

export const FHAccountsTable: FC<IFHSummaryTableProps> = props => {
    const { indictableFHItems, typesOptionSet, isCompact } = props;
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const items = useMemo(() => calcAccountFields(indictableFHItems, typesOptionSet), [indictableFHItems, typesOptionSet]);
    const columns: IColumn[] = useMemo(
        () => [
            accountNameSmaller({ translate }),
            {
                key: 'column2',
                name: translate('DEBIT_CARD'),
                fieldName: 'debitCard',
                minWidth: 50,
                maxWidth: 50,
                isResizable: false,
                className: withoutIconClassNames.IconCell,
                columnActionsMode: ColumnActionsMode.disabled,
                onRender: (item: IAccountsLineProps) => renderMark(!!item.card, translate, `debit-card-checkbox-${item.name}`),
            },
            {
                key: 'column3',
                name: translate('STANDING_ORDER'),
                fieldName: 'standingOrder',
                minWidth: 60,
                maxWidth: 60,
                isResizable: false,
                className: withoutIconClassNames.IconCell,
                columnActionsMode: ColumnActionsMode.disabled,
                onRender: (item: IAccountsLineProps) => renderMark(!!item.standingOrder, translate, `standing-order-checkbox-${item.name}`),
            },
            {
                key: 'column4',
                name: translate('DIRECT_DEBIT'),
                fieldName: 'card',
                minWidth: 60,
                maxWidth: 60,
                isResizable: false,
                className: withoutIconClassNames.IconCell,
                columnActionsMode: ColumnActionsMode.disabled,
                onRender: (item: IAccountsLineProps) => renderMark(!!item.directDebit, translate, `direct-debit-checkbox-${item.name}`),
            },
            {
                key: 'column5',
                name: translate('OVERDRAFT'),
                fieldName: 'overDraft',
                minWidth: 80,
                maxWidth: 80,
                isResizable: false,
                className: withoutIconClassNames.IconCell,
                columnActionsMode: ColumnActionsMode.disabled,
                onRender: (item: IAccountsLineProps) =>
                    renderMark(!!item.overDraft, translate, `overdraft-checkbox-${item.name}`, withoutIconClassNames.RedIconImg, 'Important'),
            },
            { ...sumWithoutIconClassName, name: translate('BALANCE') },
            { ...indicatorWithoutIconClassName, name: translate('FINANCIAL_ALERTS') },
        ],
        [translate]
    );

    const compactColumns: IColumn[] = useMemo(
        () => [
            {
                ...accountNameSmaller({ translate }),
                onRender: item => onRenderCompactRow(item, translate),
            },
        ],
        [translate]
    );

    if (items.length === 0) {
        return <SummaryViewEmptyState {...{ text: translate('NO_OWNED_ACCOUNTS') }} />;
    }

    return (
        <div style={margins} data-testid={`accounts-table`}>
            <DetailsList
                key={props.isCompact ? 'compact' : 'default'}
                styles={detailsListStyles}
                items={items}
                columns={isCompact ? compactColumns : columns}
                setKey="set"
                selectionMode={SelectionMode.none}
                onRenderDetailsHeader={headerFunction}
            />
        </div>
    );
};
