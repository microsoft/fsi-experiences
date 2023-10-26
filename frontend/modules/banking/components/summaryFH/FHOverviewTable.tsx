import React, { FC, useMemo } from 'react';
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { Stack } from '@fluentui/react/lib/Stack';
import { IFHSummaryTableProps } from './FHAccountsTable';
import { getHighestIndicator } from '@fsi/core-components/dist/utilities/CalcUtils';
import { FH_CATEGORY_ORDER, FH_CATEGORY_TO_ENTITY_NAME, FH_OVERVIEW_ICON_TEXT_MAP, SummaryLineMap } from '../../constants/FHValueMaps';
import { getColumns } from './FHSummaryColumns';
import { margins, fhSummaryTableStyle, fhSummaryAssetsLiabilities } from './summaryFHConstants';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';
import { IIndicatorFields } from '../../interfaces/FHEntity/IndictableFH';
import cloneDeep from 'lodash/cloneDeep';
import { useFHAssetsAndLiabilities } from '../../hooks/financialHoldings/useFHAssetsAndLiabilities';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider/Divider';
import { dividerZIndexStyles } from '@fsi/core-components/dist/styles/Common.style';
import isNil from 'lodash/isNil';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { onShouldVirtualize } from './utilities';
import FHCategoriesAssetsLiabilitiesLine from '../../components/FHCategoriesAssetsLiabilitiesLine/FHCategoriesAssetsLiabilitiesLine';

export interface ISummaryLineProps {
    category: number;
    icon?: string;
    name?: string;
    sum: number;
    indicator?: IIndicatorFields;
    count?: number;
    restricted?: boolean;
}

export interface IFHOverviewTableProps extends IFHSummaryTableProps {
    categoryOptionSet: OptionSetMap;
    categoriesMetadata?: { [entityName: string]: HttpStatusCode };
}

export const FHOverviewTable: FC<IFHOverviewTableProps> = props => {
    const { indictableFHItems, categoryOptionSet, isCompact, categoriesMetadata } = props;
    const columns = getColumns(isCompact);

    const summaryItems: ISummaryLineProps[] = useMemo(() => {
        const summaryFields = cloneDeep(FH_OVERVIEW_ICON_TEXT_MAP) as SummaryLineMap;

        Object.keys(categoryOptionSet)
            .filter(code => summaryFields[code])
            .forEach(categoryCode => {
                summaryFields[categoryCode].name = categoryOptionSet[categoryCode]?.text;

                summaryFields[categoryCode].restricted = !isNil(categoriesMetadata)
                    ? categoriesMetadata[FH_CATEGORY_TO_ENTITY_NAME[categoryCode]] !== HttpStatusCode.OK
                    : false;
            });

        indictableFHItems.forEach(value => {
            const { category, balanceDefault, indicator: cureIndicators } = value;
            const lastValues = summaryFields[category];
            const { sum = 0, count = 0, indicator } = lastValues || {};
            const firstIndicator = cureIndicators[0];

            summaryFields[category] = {
                category,
                icon: lastValues?.icon,
                name: categoryOptionSet[category]?.text || lastValues?.name,
                sum: sum + balanceDefault,
                indicator: getHighestIndicator(firstIndicator, indicator),
                count: count + 1,
                restricted: lastValues?.restricted || false,
            };
        });

        const summaryItems = Object.keys(summaryFields).reduce((prevValue, currValue) => {
            if (categoryOptionSet[currValue] && categoriesMetadata?.[FH_CATEGORY_TO_ENTITY_NAME[currValue]] !== HttpStatusCode.NO_CONTENT) {
                return [...prevValue, summaryFields[currValue]];
            }

            return prevValue;
        }, [] as ISummaryLineProps[]);

        summaryItems.sort((a, b) => {
            const aCategoryVal = a.category;
            const bCategoryVal = b.category;
            return FH_CATEGORY_ORDER[aCategoryVal] - FH_CATEGORY_ORDER[bCategoryVal];
        });
        return summaryItems;
    }, [indictableFHItems, categoryOptionSet, categoriesMetadata]);

    const { assets, liabilities } = useFHAssetsAndLiabilities(indictableFHItems);

    return (
        <Stack data-testid={`overview-table`}>
            <Stack.Item styles={fhSummaryAssetsLiabilities}>
                <FHCategoriesAssetsLiabilitiesLine assets={assets} liabilities={liabilities} />
            </Stack.Item>
            <Divider color={COLORS.lightGray} styles={dividerZIndexStyles} />
            <Stack.Item
                data-testid={`overview-table-inner`}
                styles={{
                    root: margins,
                }}
            >
                <DetailsList
                    key={props.isCompact ? 'compact' : 'default'}
                    styles={fhSummaryTableStyle}
                    items={summaryItems}
                    columns={columns}
                    onShouldVirtualize={onShouldVirtualize}
                    setKey="set"
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={false}
                />
            </Stack.Item>
        </Stack>
    );
};
