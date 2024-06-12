import { useId } from '@fluentui/react-hooks';
import { DetailsHeader } from '@fluentui/react/lib/components/DetailsList/DetailsHeader';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { CheckboxVisibility, DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { Text } from '@fluentui/react/lib/Text';
import BaseCurrency from '@fsi/core-components/dist/components/atoms/BaseCurrency/BaseCurrency';
import EmptyState from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useMediaQueryListener } from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { MEDIA_QUERY_IS_SMALL_SCREEN_TABLE_BREAK_POINT } from '@fsi/core-components/dist/styles/Common.style';
import React, { FC, ReactElement, useCallback, useMemo } from 'react';
import { ASSETS_AND_LIABILITIES, FINANCIAL_CATEGORIES_FORM_FIELDS } from '../../constants/namespaces.const';
import { actionsField, descriptionField, typeField, valueField } from './FinancialGroupedTable.const';
import { IFinancialGroupedTableProps } from './FinancialGroupedTable.interface';
import {
    columnSmallTextStyles,
    currencyBaseStyles,
    currencyCodeStyles,
    currencyNumberStyles,
    detailsHeaderCurrencyCodeStyles,
    detailsHeaderStyles,
    detailsListStyles,
    getColumnTextStyles,
    getDetailsHeaderTextStyles,
    groupFooterCurrencyNumberStyles,
    groupFooterStyles,
    groupFooterTextStyles,
    groupHeaderTitleStyles,
    groupHeaderTitleWrapperStyles,
    loadingSpinnerWrapperStyles,
    visuallyHiddenTextStyle,
    wrapperStyles,
} from './FinancialGroupedTable.style';

export const FinancialGroupedTable: FC<IFinancialGroupedTableProps> = ({
    data = [],
    groups = [],
    isError,
    isLoading,
    actionsRenderer,
    ariaLabelForTable,
}) => {
    const isSmallScreen = useMediaQueryListener(MEDIA_QUERY_IS_SMALL_SCREEN_TABLE_BREAK_POINT);

    const translate = useTranslation(FINANCIAL_CATEGORIES_FORM_FIELDS);
    const AandLTranslate = useTranslation(ASSETS_AND_LIABILITIES);

    const srGroupHeaderTextID = useId('srGTGroupHeaderText');

    const columns = [
        { key: typeField, name: translate('TYPE'), fieldName: typeField, minWidth: 100, maxWidth: 200, isResizable: false },
        {
            key: actionsField,
            name: translate('ACTIONS'),
            fieldName: actionsField,
            minWidth: 75,
            maxWidth: 80,
            isResizable: false,
            isIconOnly: true,
            onRender: (item, index) => actionsRenderer(item, index, isSmallScreen),
        },
        {
            key: descriptionField,
            name: translate('DESCRIPTION'),
            fieldName: descriptionField,
            minWidth: 90,
            isResizable: false,
            isHiddenOnSmallScreen: true,
        },
        { key: valueField, name: translate('AMOUNT'), fieldName: valueField, minWidth: 120, isResizable: false },
    ];

    const tableColumns = useMemo(() => {
        return columns.filter(col => col.isHiddenOnSmallScreen !== isSmallScreen);
    }, [columns, isSmallScreen]);

    /* istanbul ignore next */
    const renderDetailsHeader = useCallback(
        detailsHeaderProps => {
            return (
                <DetailsHeader
                    {...detailsHeaderProps}
                    styles={detailsHeaderStyles}
                    ariaLabelForToggleAllGroupsButton={translate('SR_EXPAND_COLLAPSE_ALL_GROUPS')}
                    onRenderColumnHeaderTooltip={tooltipHostProps => {
                        const columnKey = tooltipHostProps?.column?.key;
                        const shouldBeVisuallyHidden = columnKey === actionsField;
                        const textStyles = shouldBeVisuallyHidden ? visuallyHiddenTextStyle : getDetailsHeaderTextStyles(columnKey === valueField);

                        return (
                            <>
                                <OverflowText text={tooltipHostProps?.column?.name!} styles={textStyles} overflowModeSelf />
                                {columnKey === valueField && <BaseCurrency hideCurrencyInfoIcon styles={detailsHeaderCurrencyCodeStyles} />}
                            </>
                        );
                    }}
                />
            );
        },
        [translate]
    );

    /* istanbul ignore next */
    const onRenderColumn = useCallback(
        (item, index, col): ReactElement => {
            if (col.fieldName === valueField) {
                return (
                    <Currency
                        styles={currencyBaseStyles}
                        currencyStyles={currencyCodeStyles}
                        numberStyles={currencyNumberStyles}
                        compact
                        value={item.value}
                    ></Currency>
                );
            }

            const columnTextStyles = getColumnTextStyles({ isBlack: col.fieldName === typeField });

            if (isSmallScreen && col.fieldName === typeField) {
                return (
                    <Stack>
                        <OverflowText styles={columnTextStyles} data-is-focusable={true} text={item[typeField]} overflowModeSelf />
                        <OverflowText styles={columnSmallTextStyles} data-is-focusable={true} text={item[descriptionField]} overflowModeSelf />
                    </Stack>
                );
            }

            return <OverflowText styles={columnTextStyles} data-is-focusable={true} text={item[col.fieldName]} overflowModeSelf />;
        },
        [isSmallScreen]
    );

    /* istanbul ignore next*/
    const tableGroupProps = {
        showEmptyGroups: true,
        headerProps: {
            onRenderTitle: item => {
                return (
                    <Stack grow={1} horizontal horizontalAlign="space-between" styles={groupHeaderTitleWrapperStyles}>
                        <OverflowText styles={groupHeaderTitleStyles} text={`${item?.group?.name} (${item?.group?.count})`} overflowModeSelf />
                        <ScreenReaderText id={`${srGroupHeaderTextID}${item?.group?.name?.replace(/\W+/g, '')}`}>
                            {`${item?.group?.count === 1 ? translate('ROW') : translate('ROWS')}`}
                        </ScreenReaderText>
                    </Stack>
                );
            },
            expandButtonProps: { 'aria-label': translate('SR_EXPAND_COLLAPSE_GROUP') },
        },
        onRenderFooter: item => {
            return (
                <Stack styles={groupFooterStyles} grow={1} horizontal horizontalAlign="space-between">
                    <Text styles={groupFooterTextStyles}>{translate('TOTAL')}</Text>
                    <Currency
                        styles={currencyBaseStyles}
                        currencyStyles={currencyCodeStyles}
                        numberStyles={groupFooterCurrencyNumberStyles}
                        compact
                        value={item.group?.total}
                    ></Currency>
                </Stack>
            );
        },
    };

    if (isError) {
        return <ErrorState iconSize={200} />;
    }

    if (isLoading) {
        return <Loading label={translate('CONNECTING_WITH_DATA')} styles={loadingSpinnerWrapperStyles} />;
    }
    /* istanbul ignore next */
    if (!data || !data.length) {
        const title = ariaLabelForTable?.includes(AandLTranslate('ASSETS_AND_LIABILITIES_SECTION_NAME'))
            ? translate('EMPTY_STATE_TABLE_ASSETS_AND_LIABILITIES')
            : translate('EMPTY_STATE_TABLE_INCOME_AND_EXPENSES');
        return <EmptyState icon={IMAGE_SRC.emptyState} iconSize={200} title={title} />;
    }

    return (
        <Stack styles={wrapperStyles} data-testid="financialGroupedTableWrapper">
            <DetailsList
                items={data}
                groups={groups}
                groupProps={tableGroupProps}
                columns={tableColumns}
                checkboxVisibility={CheckboxVisibility.hidden}
                onRenderItemColumn={onRenderColumn}
                onRenderDetailsHeader={renderDetailsHeader}
                selectionMode={SelectionMode.none}
                styles={detailsListStyles}
                ariaLabelForGrid={ariaLabelForTable}
            />
        </Stack>
    );
};

export default FinancialGroupedTable;
