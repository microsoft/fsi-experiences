import React, { FC, useEffect, useRef, useState } from 'react';
import { IGroup } from '@fluentui/react/lib/GroupedList';
import { IGroupFinancialHolding } from '../../../interfaces/Groups';
import { DetailedMembersGroupHoldings } from './DetailedMembersGroupHoldings';
import { FH_CATEGORY_ORDER } from '../../../constants/FHValueMaps';
import { GROUPS_HOLDINGS_VIEW_KEYS } from './DetailedMembersGroupHoldings.const';
import useResponsiveContainer from '@fsi/core-components/dist/context/hooks/useResponsiveContainer';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { FHMetadata, ICustomerFH } from '../../../interfaces/FHEntity';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import orderBy from 'lodash/orderBy';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IDetailedMembersGroupHoldingsWrapperProps } from './DetailedMembersGroupHoldings.interface';

export const DetailedMembersGroupHoldingsWrapper: FC<IDetailedMembersGroupHoldingsWrapperProps> = ({
    selectedFinancialHoldings,
    allFinancialHoldings,
    selectedKey,
    fhPickLists,
    onFHChanged,
    contactId,
    metadata,
    emptyStateMessage,
}) => {
    const [items, setItems] = useState<IGroupFinancialHolding[]>([]);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const viewMap = useRef({});

    const containerProps = useResponsiveContainer('detailed-group-holding');

    useEffect(() => {
        updateItemsAndGroups();
    }, []);

    useEffect(() => {
        if (viewMap.current[selectedKey]) setItems(viewMap.current[selectedKey].items);
        if (viewMap.current[selectedKey]) setGroups(viewMap.current[selectedKey].groups);
    }, [selectedKey]);

    useEffect(() => {
        updateItemsAndGroups();
    }, [allFinancialHoldings]);

    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const updateItemsAndGroups = () => {
        viewMap.current[GROUPS_HOLDINGS_VIEW_KEYS.members] = createMembersGroups(allFinancialHoldings);
        viewMap.current[GROUPS_HOLDINGS_VIEW_KEYS.category] = createHoldingsGroups(allFinancialHoldings);
        viewMap.current[GROUPS_HOLDINGS_VIEW_KEYS.roleCategory] = createHoldingsGroups(allFinancialHoldings);

        if (viewMap.current[selectedKey]) {
            setItems(viewMap.current[selectedKey].items);
            setGroups(viewMap.current[selectedKey].groups);
        }
    };

    const createHoldingsGroups = (financialHoldings: IGroupFinancialHolding[]) => {
        const items = [...financialHoldings].sort(sortByCategory);
        const groups = createCategoriesGroupsItems(items);
        return { items, groups };
    };

    const createMembersGroups = (financialHoldings: IGroupFinancialHolding[]) => {
        const items = [...financialHoldings].sort(sortByMembers);
        const groups = createMembersGroupsItems(items);
        return { items, groups };
    };

    const createCategoriesGroupsItems = (items: IGroupFinancialHolding[]) => {
        const groupMap: { [key: number]: any } = {};
        items.forEach((item: IGroupFinancialHolding, idx: number) => {
            groupMap[item.category] = groupMap[item.category] || {
                key: item.category,
                startIndex: idx,
                count: 0,
                name: fhPickLists.fhCategoryTypes.get(item.category),
            };
            groupMap[item.category].count++;
        });

        return orderBy(Object.keys(groupMap), [a => FH_CATEGORY_ORDER[a]]).map(key => groupMap[key]);
    };

    const createMembersGroupsItems = (items: IGroupFinancialHolding[]) => {
        const groupMap: any = {};
        items.forEach((item: IGroupFinancialHolding, idx: number) => {
            const key = getGroupIdFromOwners(item.owners);
            groupMap[key] = groupMap[key] || { key: key, startIndex: idx, count: 0, name: item.owners.map(o => o.contact.fullName).join(' & ') };
            groupMap[key].count++;
        });
        return Object.values(groupMap);
    };

    const sortByMembers = (first: IGroupFinancialHolding, second: IGroupFinancialHolding) => {
        const firstKey = getGroupIdFromOwners(first.owners);
        const secondKey = getGroupIdFromOwners(second.owners);
        if (firstKey < secondKey) return -1;
        if (firstKey > secondKey) return 1;
        return 0;
    };

    const sortByCategory = (first: IGroupFinancialHolding, second: IGroupFinancialHolding) => {
        const aCategoryVal = first.category;
        const bCategoryVal = second.category;
        return (FH_CATEGORY_ORDER[aCategoryVal] || 0) - (FH_CATEGORY_ORDER[bCategoryVal] || 0);
    };

    const getGroupIdFromOwners = (owners: ICustomerFH[]) => owners.map(o => o.contact.contactId).join('&');

    return allFinancialHoldings.length === 0 ? (
        <EmptyState icon={IMAGE_SRC.emptyState} iconSize={200} title={emptyStateMessage || translate('THERE_ARE_NO_HOLDINGS_FOR_THIS_CUSTOMER')} />
    ) : (
        <div ref={containerProps.ref} className={containerProps.className}>
            <DetailedMembersGroupHoldings
                responsiveColumns={containerProps.columns}
                financialHoldings={selectedFinancialHoldings || allFinancialHoldings}
                items={items}
                groups={groups}
                viewKey={selectedKey}
                fhPickLists={fhPickLists}
                onFHSelected={onFHChanged}
                contactId={contactId}
                metadata={metadata}
            />
        </div>
    );
};
