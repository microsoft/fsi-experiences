import React, { FC, useEffect, useState, useMemo, useCallback } from 'react';
import { SelectionMode } from '@fluentui/utilities/lib/selection/Selection.types';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { DetailsList, IColumn, ColumnActionsMode } from '@fluentui/react/lib/DetailsList';
import { Stack } from '@fluentui/react/lib/Stack';
import { VISITOR_NAMES } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { GROUPS_HOLDINGS_VIEW_KEYS } from './DetailedMembersGroupHoldings.const';
import { detailedGroupHoldingStyles, selectAllCheckboxStyles, detailedMembersGroupHoldingsStyles } from './DetailedMembersGroupHoldings.style';
import {
    fhBalanceColumn,
    fhCurrencyColumn,
    indicatorColumn,
} from '../../../components/detailedFinancialHolding/components/FinancialHoldingGroupedList/FinancialHoldingGroupedList.const';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import {
    renderAdd,
    renderBalance,
    renderCategory,
    renderCurrency,
    renderFhName,
    renderIndicator,
    renderOwner,
    renderRole,
    renderRow,
    renderType,
    renderGroupHeader,
    renderItemColumn,
    renderDetailsHeader,
} from './renderers';
import { IDetailedMembersGroupHoldingsProps } from './DetailedMembersGroupHoldings.interface';

const belowSevenResponsiveColumnsModeHiddenColumns = new Set(['role']);
const belowSixResponsiveColumnsModeHiddenColumns = new Set(['typ', 'indicator', 'currency', 'role']);
const belowFourResponsiveColumnsModeHiddenColumns = new Set(['typ', 'indicator', 'currency', 'bal']);
const noneHiddenColumns = new Set([]);

export const DetailedMembersGroupHoldings: FC<IDetailedMembersGroupHoldingsProps> = ({
    financialHoldings,
    items,
    groups,
    viewKey,
    fhPickLists,
    onFHSelected,
    contactId,
    metadata,
    responsiveColumns = 12,
}) => {
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const translateFH = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const isBelowTenResponsiveColumns = responsiveColumns < 10;
    const isBelowSixResponsiveColumns = responsiveColumns < 6;
    const isBelowFourResponsiveColumns = responsiveColumns < 4;
    const isBelowSevenResponsiveColumns = responsiveColumns < 7;
    const belowFourColumnsTableColumns = isBelowFourResponsiveColumns ? belowFourResponsiveColumnsModeHiddenColumns : noneHiddenColumns;
    const belowSixColumnsTableColumns = isBelowSixResponsiveColumns ? belowSixResponsiveColumnsModeHiddenColumns : noneHiddenColumns;
    const belowSevenColumnsTableColumns = isBelowSevenResponsiveColumns ? belowSevenResponsiveColumnsModeHiddenColumns : noneHiddenColumns;
    const showCheckboxes = !!onFHSelected;
    const columns = useMemo(() => {
        const basicColumns: IColumn[] = [
            {
                key: 'fhn',
                minWidth: isBelowFourResponsiveColumns ? 75 : 150,
                name: viewKey === GROUPS_HOLDINGS_VIEW_KEYS.members ? translateFH('OWNER') : translateFH('HOLDING_NAME'),
                fieldName: 'name',
                columnActionsMode: ColumnActionsMode.disabled,
                isRowHeader: true,
            },
            { key: 'typ', minWidth: 125, name: translateFH('TYPE'), fieldName: 'type', columnActionsMode: ColumnActionsMode.disabled },
            fhBalanceColumn(translateFH),
            fhCurrencyColumn(translateFH),
        ];

        if (viewKey === GROUPS_HOLDINGS_VIEW_KEYS.members) {
            basicColumns.splice(1, 0, {
                key: 'cat',
                minWidth: isBelowFourResponsiveColumns ? 70 : 125,
                name: translateFH('CATEGORY'),
                fieldName: 'category',
                columnActionsMode: ColumnActionsMode.disabled,
            });
        } else {
            basicColumns.push({
                key: 'own',
                minWidth: isBelowFourResponsiveColumns ? 42 : isBelowSixResponsiveColumns ? 100 : 167,
                name: translateFH('OWNER'),
                fieldName: 'owner',
                columnActionsMode: ColumnActionsMode.disabled,
            });
            if (viewKey === GROUPS_HOLDINGS_VIEW_KEYS.roleCategory) {
                basicColumns.push({
                    key: 'role',
                    minWidth: 90,
                    name: translateFH('ROLE'),
                    fieldName: 'role',
                    columnActionsMode: ColumnActionsMode.disabled,
                });
            }
        }

        if (!showCheckboxes) {
            basicColumns.push(indicatorColumn);
        } else {
            basicColumns.splice(0, 0, {
                key: 'add',
                minWidth: 25,
                maxWidth: 25,
                name: '',
                fieldName: 'add',
                isIconOnly: true,
                columnActionsMode: ColumnActionsMode.disabled,
            });
        }

        return basicColumns.filter(
            c => !belowSevenColumnsTableColumns.has(c.key) && !belowSixColumnsTableColumns.has(c.key) && !belowFourColumnsTableColumns.has(c.key)
        );
    }, [
        belowFourColumnsTableColumns,
        belowSevenColumnsTableColumns,
        belowSixColumnsTableColumns,
        isBelowFourResponsiveColumns,
        isBelowSixResponsiveColumns,
        showCheckboxes,
        translateFH,
        viewKey,
    ]);

    // workaround for unnecessary horizontal scroll in DetailsList
    // https://github.com/microsoft/fluentui/issues/3608, https://github.com/microsoft/fluentui/issues/7772
    const [tableKey, setTableKey] = useState(Date.now());
    useEffect(() => {
        // force re-render
        setTableKey(Date.now());
    }, []);

    const renderColumn = useMemo(
        () => ({
            add: renderAdd({ financialHoldings, onFHSelected, translate }),
            fhn: renderFhName({
                fhPickLists,
                columns: belowSixColumnsTableColumns,
                isBalance: isBelowFourResponsiveColumns,
                isSubtitle: isBelowSixResponsiveColumns,
                showDescription: viewKey === GROUPS_HOLDINGS_VIEW_KEYS.roleCategory,
                contactId,
            }),
            cat: renderCategory({ fhPickLists }),
            role: renderRole({ fhPickLists }),
            typ: renderType({ fhPickLists }),
            bal: renderBalance({ isStart: isBelowFourResponsiveColumns, columns: belowSixColumnsTableColumns }),
            own: renderOwner({ hidePersonaDetails: isBelowSixResponsiveColumns }),
            currency: renderCurrency,
            [VISITOR_NAMES.indicator]: renderIndicator,
        }),
        [
            belowSixColumnsTableColumns,
            contactId,
            fhPickLists,
            financialHoldings,
            isBelowFourResponsiveColumns,
            isBelowSixResponsiveColumns,
            onFHSelected,
            translate,
            viewKey,
        ]
    );

    const groupProps = useMemo(
        () => ({ onRenderHeader: renderGroupHeader({ showCheckboxes, translate, onFHSelected, financialHoldings, items, viewKey }) }),
        [financialHoldings, items, onFHSelected, showCheckboxes, translate, viewKey]
    );

    const onRenderItemColumn = useCallback((item, index, column) => renderItemColumn({ renderColumn })(item, index, column), [renderColumn]);

    const onRenderDetailsHeader = useMemo(() => renderDetailsHeader({ showCheckboxes }), [showCheckboxes]);

    const onRenderRow = useCallback(renderRow({ contactId, isCompact: isBelowTenResponsiveColumns, metadata, translate }), [
        contactId,
        isBelowTenResponsiveColumns,
        metadata,
    ]);

    const isAllChecked = financialHoldings.length !== 0 && financialHoldings.length === items.length;

    const isAllIndeterminate = financialHoldings.length !== 0 && financialHoldings.length < items.length;

    const onAllChecked = (isChecked?: boolean) => /* istanbul ignore next */ onFHSelected?.(items, isChecked);

    return (
        <Stack styles={detailedGroupHoldingStyles} data-testid="group-detailed-holdings">
            {showCheckboxes && (
                <Checkbox
                    styles={selectAllCheckboxStyles}
                    checked={isAllChecked}
                    indeterminate={isAllIndeterminate}
                    onChange={(ev, isChecked) => onAllChecked(isChecked)}
                    ariaLabel={translate('SELECT_ALL')}
                    data-testid="group-detailed-holdings-check-all"
                />
            )}
            <DetailsList
                items={items}
                groups={groups}
                groupProps={groupProps}
                onRenderItemColumn={onRenderItemColumn}
                setKey="set"
                columns={columns}
                constrainMode={0}
                selectionMode={SelectionMode.none}
                onRenderDetailsHeader={onRenderDetailsHeader}
                styles={detailedMembersGroupHoldingsStyles}
                onRenderRow={onRenderRow}
                onShouldVirtualize={() => items.length > 100}
            />
        </Stack>
    );
};
