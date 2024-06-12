import React, { FC, useMemo } from 'react';
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { IFHSummaryTableProps } from './FHAccountsTable';
import { getHighestIndicator, ICategoryArrayValues } from '@fsi/core-components/dist/utilities/CalcUtils';
import { FH_NAME_TO_CATEGORY_MAP, FH_NAME_TO_TYPE_MAP, FH_SAVINGS_ICON_TEXT_MAP, SavingsLineMap } from '../../constants/FHValueMaps';
import { getColumns } from './FHSummaryColumns';
import SummaryViewEmptyState from './SummaryViewEmptyState';
import { fhSummaryTableStyle, margins } from './summaryFHConstants';
import { IIndicatorFields, IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { createFHCategoryValue, onShouldVirtualize } from './utilities';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';

export interface ISavingsLineProps {
    icon?: string;
    count: number;
    sum: number;
    indicator?: IIndicatorFields;
}

const calcLongTermSavingsFields = ({
    FHTable,
    typesOptionSet,
}: {
    FHTable: IndictableFH[];
    typesOptionSet: OptionSetMap;
}): Array<ICategoryArrayValues> => {
    const summaryFields: ICategoryArrayValues[] = [];
    const savingsValuesMap = JSON.parse(JSON.stringify(FH_SAVINGS_ICON_TEXT_MAP)) as SavingsLineMap;

    const customSavingTypes: number[] = [];
    const fhSaving = FHTable.filter(value => value.category === FH_NAME_TO_CATEGORY_MAP.Saving);
    fhSaving.forEach(value => {
        const fhType = value.type;
        if (!savingsValuesMap[fhType]) {
            customSavingTypes.push(fhType);
            savingsValuesMap[fhType] = { icon: 'Savings', count: 0, sum: 0, indicator: undefined };
        }
        const FHTypeValue = savingsValuesMap[fhType];
        const indicatorArr = value.indicator;
        const indicator = indicatorArr && indicatorArr[0];

        if (FHTypeValue && fhType) {
            savingsValuesMap[fhType] = {
                sum: FHTypeValue.sum + value.balanceDefault,
                count: FHTypeValue.count + 1,
                indicator: getHighestIndicator(indicator, FHTypeValue.indicator),
                icon: FHTypeValue.icon,
            };
        }
    });

    [FH_NAME_TO_TYPE_MAP.Deposit, FH_NAME_TO_TYPE_MAP.ProvidentFund, ...customSavingTypes].forEach(savingType => {
        const saving = savingsValuesMap[savingType];
        summaryFields.push(createFHCategoryValue(saving.count, saving.sum, saving.indicator, typesOptionSet[savingType]?.text || '', 'Savings'));
    });

    if (fhSaving.length === 0) {
        return [];
    }

    return summaryFields;
};
export const FHLongTermSavingTable: FC<IFHSummaryTableProps> = props => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const columns = getColumns(props.isCompact);
    const items = useMemo(
        () => calcLongTermSavingsFields({ FHTable: props.indictableFHItems, typesOptionSet: props.typesOptionSet }),
        [props.indictableFHItems, props.typesOptionSet]
    );

    if (items.length === 0) {
        return <SummaryViewEmptyState text={translate('NO_OWNED_LONG_TERM_SAVINGS')} />;
    }

    return (
        <div style={margins} data-testid={`long-term-savings-table`}>
            <DetailsList
                key={props.isCompact ? 'compact' : 'default'}
                styles={fhSummaryTableStyle}
                items={items}
                columns={columns}
                onShouldVirtualize={onShouldVirtualize}
                setKey="set"
                selectionMode={SelectionMode.none}
                isHeaderVisible={false}
            />
        </div>
    );
};
