import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import SIDMain from '../SelectedItemDetails/SIDMain/SIDMain';
import FinancialHoldingGroupedList from '../FinancialHoldingGroupedList/FinancialHoldingGroupedList';
import { FH_CATEGORY_ORDER } from '../../../../constants/FHValueMaps';
import { IndictableFH } from '../../../../interfaces/FHEntity/IndictableFH';
import orderBy from 'lodash/orderBy';
import {
    assetsLiabilitiesStackItemStyles,
    backStyles,
    fhListItemStyles,
    fhVerticalDividerStyles,
    leftStackItemStyles,
    backWrapperStyles,
    backTextStyles,
    rightStackItemStyles,
} from './DetailedFHTable.styles';
import FHCategoriesAssetsLiabilitiesLine from '../../../FHCategoriesAssetsLiabilitiesLine/FHCategoriesAssetsLiabilitiesLine';
import { FHMetadata } from '../../../../interfaces/FHEntity/FHMetadata';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Text } from '@fluentui/react/lib/Text';
import { calcFHAssetsAndLiabilities } from '../../../../hooks/financialHoldings/useFHAssetsAndLiabilities';
import Divider from '@fsi/core-components/dist/components/atoms/Divider/Divider';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { dividerZIndexStyles } from '@fsi/core-components/dist/styles/Common.style';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { DetailedFHCustomersState } from '../DetailedFHBody';

export interface GroupedFH {
    key: string;
    startIndex: number;
    count: number;
    name: string;
}

export interface GroupedFHMap {
    [key: string]: GroupedFH;
}
export interface DetailedFHTableProps {
    items: IndictableFH[];
    contactId: string;
    selected: IndictableFH | undefined;
    metadata?: FHMetadata;
    setSelected: (selected: IndictableFH | undefined) => void;
    fhCustomersState: DetailedFHCustomersState;
    isCompactView: boolean;
}

export const sortFinancialHolding = (items: IndictableFH[]) =>
    items.sort((a, b) => {
        const aCategoryVal = a.category;
        const bCategoryVal = b.category;
        return FH_CATEGORY_ORDER[aCategoryVal] - FH_CATEGORY_ORDER[bCategoryVal];
    });

export const groupFinancialHolding = (items: IndictableFH[], metadata?: FHMetadata) =>
    items.reduce((map, item, index) => {
        const category = item.category.toString();
        if (!map[category]) {
            map[category] = {
                key: category,
                startIndex: index,
                count: 0,
                name: metadata?.categories.optionSet[item.category].text,
            };
        }
        map[item.category].count++;
        return map;
    }, {});

export const sortGroupedFinancialHolding = (groupMap: GroupedFHMap): GroupedFH[] => orderBy(Object.values(groupMap), ['startIndex'], ['asc']);

export const DetailedFHTable: FC<DetailedFHTableProps> = ({ selected, setSelected, fhCustomersState, isCompactView, ...props }) => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const { groups, items } = useMemo(() => {
        const rtVal: { groups: GroupedFH[]; items: IndictableFH[] } = {
            groups: [],
            items: [],
        };

        const { items, metadata } = props;

        rtVal.items = sortFinancialHolding(items);

        const groupMap: GroupedFHMap = groupFinancialHolding(rtVal.items, metadata);

        rtVal.groups = sortGroupedFinancialHolding(groupMap);

        return rtVal;
    }, [props.items, props.metadata]);

    const { relatedCustomers = [], relatedCustomersLoadingState } = fhCustomersState;

    const { assets, liabilities } = useMemo(() => calcFHAssetsAndLiabilities(props.items), [props.items]);

    if (items.length === 0) {
        return <EmptyState icon={IMAGE_SRC.emptyState} iconSize={200} title={translate('THERE_ARE_NO_HOLDINGS_FOR_THIS_CUSTOMER')} />;
    }

    return (
        <Stack horizontal verticalAlign="start" styles={{ root: { height: '100%', position: 'relative' } }}>
            <Stack grow={1} styles={leftStackItemStyles(isCompactView && !!selected)}>
                <Stack>
                    <Stack styles={assetsLiabilitiesStackItemStyles}>
                        <FHCategoriesAssetsLiabilitiesLine showCurrency assets={assets} liabilities={liabilities} />
                    </Stack>
                    <Divider color={COLORS.lightGray} styles={dividerZIndexStyles} />
                    <Stack grow={1} styles={fhListItemStyles}>
                        <FinancialHoldingGroupedList
                            items={items}
                            groups={groups}
                            metadata={props.metadata}
                            onSelect={setSelected}
                            selected={selected}
                            isCompactView={isCompactView}
                        />
                    </Stack>
                </Stack>
            </Stack>
            <Stack.Item grow={0} hidden={isCompactView}>
                <Divider vertical styles={fhVerticalDividerStyles} />
            </Stack.Item>
            <Stack grow={1} styles={rightStackItemStyles(isCompactView && !selected)}>
                <Stack hidden={!isCompactView} styles={backWrapperStyles} data-testid="back-button-wrapper">
                    <Stack tokens={{ childrenGap: 8 }} verticalAlign="center" horizontal>
                        <IconButton
                            onClick={() => {
                                setSelected(undefined);
                            }}
                            aria-label={translate('BACK_TO_FH')}
                            styles={backStyles}
                            iconProps={{ iconName: 'Back' }}
                            data-testid="back-button"
                        />
                        <Text styles={backTextStyles}>{translate('FH_FINANCIAL_HOLDINGS')}</Text>
                    </Stack>
                </Stack>
                <SIDMain
                    metadata={props.metadata}
                    selected={selected}
                    relatedCustomers={relatedCustomers}
                    relatedCustomersLoadingState={relatedCustomersLoadingState}
                />
            </Stack>
        </Stack>
    );
};

export default DetailedFHTable;
