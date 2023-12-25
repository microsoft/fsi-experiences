import React, { FC, ReactElement, useCallback, useContext, useEffect, useMemo } from 'react';
import { CheckboxVisibility, DetailsList, IColumn } from '@fluentui/react/lib/DetailsList';
import { SelectionMode, Selection } from '@fluentui/react/lib/Selection';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { VISITOR_NAMES } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { Text } from '@fluentui/react/lib/Text';
import IndicatorColumn from '../../../summaryFH/IndicatorColumn';
import { FHTableGroupHeader } from '../../../FHTableGroupHeader/FHTableGroupHeader';
import isNil from 'lodash/isNil';
import { IndictableFH } from '../../../../interfaces/FHEntity/IndictableFH';
import { IGroup } from '@fluentui/react/lib/GroupedList';
import { fhNameCellStyle, fhTypeCellStyle, fhValueCellStyle, tableExpandAllStyles } from './FinancialHoldingGroupedList.style';
import { ResponsiveContainerContext } from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer.context';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { fhBalanceColumn, fhCurrencyColumn, indicatorColumn } from './FinancialHoldingGroupedList.const';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import CurrencyCode from '@fsi/core-components/dist/components/atoms/CurrencyCode/CurrencyCode';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { FHMetadata } from '../../../../interfaces/FHEntity/FHMetadata';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';

export interface FinancialHoldingGroupedListProps {
    items: IndictableFH[];
    groups: IGroup[];
    metadata?: FHMetadata;
    onSelect: (selected: any) => any;
    selected: IndictableFH | undefined;
    isCompactView?: boolean;
}
export const FinancialHoldingGroupedList: FC<FinancialHoldingGroupedListProps> = ({ items, groups, onSelect, metadata, selected, isCompactView }) => {
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    useEffect(() => {
        if (selected) {
            selection.setAllSelected(false);
            const index = items.findIndex(item => item.id === selected.id);
            selection.setIndexSelected(index, true, false);
        }
    }, [selected, items]);

    const { columns: responsiveColumns } = useContext(ResponsiveContainerContext);

    const isCompact = useMemo(() => (responsiveColumns <= 8 && responsiveColumns > 6) || responsiveColumns <= 4, [responsiveColumns]);

    const columns: IColumn[] = useMemo(() => {
        const activeColumns = [
            { key: 'fhn', minWidth: 140, name: translate('HOLDING_NAME'), fieldName: 'name' },
            { key: 'fht', minWidth: 110, name: translate('TYPE'), fieldName: 'type' },
            fhBalanceColumn(translate),
            fhCurrencyColumn(translate),
            indicatorColumn,
        ];

        if (isCompact) {
            activeColumns.splice(activeColumns.length - 2, 2);
            activeColumns.splice(1, 1);
        }

        return activeColumns;
    }, [isCompact, translate]);

    const groupProps = useMemo(() => {
        return {
            onRenderHeader: (props?) => (props ? <FHTableGroupHeader {...props} /> : null),
        };
    }, []);

    const selection = useMemo(() => {
        return new Selection({
            onSelectionChanged() {
                if (selection.getSelection()[0]) {
                    const selected = selection.getSelection()[0];
                    onSelect(selected);
                }
            },
        });
    }, [onSelect]);

    const typeName = useCallback(typeCode => metadata?.types.optionSet[typeCode]?.text, [metadata]);

    const renderIndicator = useCallback(content => {
        if (!content) {
            return '';
        }

        const indicator = content && content[0];
        return <IndicatorColumn indicator={indicator} size={16} />;
    }, []);

    const renderBalance = useCallback(
        (value, item) => {
            if (isNil(value)) {
                return '';
            }

            if (isCompact) {
                return <Currency styles={fhValueCellStyle} horizontalAlign={'end'} value={value} currencyId={item.currencyId} />;
            }

            return <NumericValue value={value} styles={fhValueCellStyle} />;
        },
        [isCompact]
    );

    const renderFHType = useCallback(
        fhType =>
            fhType ? (
                <Text data-testid="detailed-fh-list-type" styles={fhTypeCellStyle}>
                    {typeName(fhType)}
                </Text>
            ) : (
                ''
            ),
        []
    );

    const renderOwner = useCallback(owner => (owner ? <Persona text={owner} size={PersonaSize.size8}></Persona> : ''), []);

    const renderFHName = useCallback(
        (name: string, item: IndictableFH) => {
            if (!name) {
                return '';
            }

            return (
                <Stack>
                    <OverflowText styles={fhNameCellStyle} text={name} overflowModeSelf />
                    {isCompact && <Text styles={fhTypeCellStyle}>{typeName(item.type)}</Text>}
                </Stack>
            );
        },
        [isCompact, typeName]
    );

    const renderCurrency = useCallback((name: string, item: IndictableFH) => {
        return <CurrencyCode currencyId={item.currencyId} />;
    }, []);

    const renderColumn = useMemo(
        () => ({
            bal: renderBalance,
            fht: renderFHType,
            own: renderOwner,
            fhn: renderFHName,
            currency: renderCurrency,
            [VISITOR_NAMES.indicator]: renderIndicator,
        }),
        [renderBalance, renderFHType, renderOwner, renderFHName, renderCurrency, renderIndicator]
    );

    const renderItemColumn = useCallback(
        (item: IndictableFH, index, column) => {
            const value = column.fieldName;
            const fieldContent = item[value];

            let retVal: string | ReactElement = <span>{fieldContent}</span>;
            const renderer = renderColumn[column.key];

            if (renderer) {
                retVal = renderer(fieldContent, item);
            }

            return retVal;
        },
        [renderColumn]
    );

    /* istanbul ignore next */
    const onRenderCompactRow = useCallback(
        (props, defaultRender) => (
            <Stack
                data-testid="row-wrapper"
                onKeyDown={({ code }) => {
                    if (code === 'Space') {
                        onSelect(props?.item);
                    }
                }}
                onClick={() => {
                    onSelect(props?.item);
                }}
            >
                {defaultRender?.(props)}
            </Stack>
        ),
        [onSelect]
    );

    return (
        <div className="tableWrapper" data-testid="detailed-fh-table">
            <DetailsList
                items={items}
                groups={groups}
                columns={columns}
                onRenderItemColumn={(item: IndictableFH, index: number | undefined, column) => renderItemColumn(item, index, column)}
                selection={selection}
                selectionMode={SelectionMode.single}
                checkboxVisibility={CheckboxVisibility.hidden}
                groupProps={groupProps}
                styles={tableExpandAllStyles}
                key={isCompactView ? 'compact' : 'full'}
                {...(isCompactView ? { disableSelectionZone: true, onRenderRow: onRenderCompactRow } : {})}
            />
        </div>
    );
};

export default FinancialHoldingGroupedList;
