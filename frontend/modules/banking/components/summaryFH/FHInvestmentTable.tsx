import React, { FC, useMemo } from 'react';
import { IFHSummaryTableProps } from './FHAccountsTable';
import SummaryViewEmptyState from './SummaryViewEmptyState';
import { FH_INVESTMENTS_TYPE, FH_INVESTMENTS_TYPE_ICON, FH_NAME_TO_CATEGORY_MAP, InvestmentsLineMap } from '../../constants/FHValueMaps';
import { fhSummaryTableStyle, margins } from './summaryFHConstants';
import { IIndicatorFields, IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { getHighestIndicator, ICategoryArrayValues } from '@fsi/core-components/dist/utilities/CalcUtils';
import { getColumnsInvestments } from './FHSummaryColumns';
import { DetailsList, SelectionMode } from '@fluentui/react/lib/components/DetailsList';
import { createFHCategoryValue, onShouldVirtualize } from './utilities';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';

export interface IInvestmentsLineProps {
    count: number;
    sum: number;
    indicator?: IIndicatorFields;
    icon?: string;
}

const calcInvestmentFields = (FHTable: IndictableFH[], typesOptionSet: OptionSetMap): Array<ICategoryArrayValues> => {
    const summaryFields: ICategoryArrayValues[] = [];
    let investmentValuesMap: InvestmentsLineMap = {};
    FH_INVESTMENTS_TYPE.forEach(value => {
        investmentValuesMap = { ...investmentValuesMap, [value]: { count: 0, sum: 0, indicator: undefined, icon: FH_INVESTMENTS_TYPE_ICON[value] } };
    });

    FHTable.forEach(value => {
        if (value.category === FH_NAME_TO_CATEGORY_MAP['Investments']) {
            const fhType = value.type;
            const fhTypeValue = investmentValuesMap[fhType] || { count: 0, sum: 0, indicator: undefined };
            const indicatorArr = value.indicator;
            const indicator = indicatorArr && indicatorArr[0];

            if (fhTypeValue && fhType) {
                investmentValuesMap[fhType] = {
                    sum: fhTypeValue.sum + value.balanceDefault,
                    count: fhTypeValue.count + 1,
                    icon: FH_INVESTMENTS_TYPE_ICON[fhType],
                    indicator: getHighestIndicator(indicator, fhTypeValue.indicator),
                };
            }
        }
    });

    let holdingsCount = 0;
    Object.entries(investmentValuesMap).forEach(([key, value]) => {
        summaryFields.push(
            createFHCategoryValue(value.count, value.sum, value.indicator, typesOptionSet[key]?.text || '', value.icon || 'CubeShape')
        );
        holdingsCount += value.count;
    });

    if (holdingsCount === 0) {
        return [];
    }

    return summaryFields;
};

export const FHInvestmentTable: FC<IFHSummaryTableProps> = props => {
    const { indictableFHItems, typesOptionSet, isCompact } = props;
    const columns = getColumnsInvestments(isCompact);
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const items = useMemo(() => calcInvestmentFields(indictableFHItems, typesOptionSet), [indictableFHItems, typesOptionSet]);

    if (items.length === 0) {
        return <SummaryViewEmptyState text={translate('NO_INVESTMENTS')} />;
    }

    return (
        <div style={margins} data-testid={`loans-table`}>
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

export default FHInvestmentTable;
