import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Separator } from '@fluentui/react/lib/Separator';
import { FHOverviewTable, FHAccountsTable, FHLoansTable, FHCreditLinesTable, FHLongTermSavingTable } from './';
import { SectionHeader } from '@fsi/core-components/dist/components/atoms/SectionHeader/SectionHeader';
import { summarySeparatorStyle } from './summaryFHConstants';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import FHInvestmentTable from './FHInvestmentTable';
import BaseCurrency from '@fsi/core-components/dist/components/atoms/BaseCurrency/BaseCurrency';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { fhOwnerRoles, FH_CATEGORY_TO_ENTITY_NAME, FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';
import { FHMetadata } from '../../interfaces/FHEntity';
import { Stack } from '@fluentui/react/lib/Stack';
import { ResponsiveContainerContext } from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer.context';
import { Nav } from '@fluentui/react/lib/Nav';
import { fhSummaryHeaderSeparatorStyles, navStyles, pivotStyle, pivotStyles, verticalSeparatorStyles } from './FHSummaryScreen.style';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import SummaryViewEmptyState from './SummaryViewEmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';

export interface ITablesInfo {
    entities: IndictableFH[];
    isError: boolean;
    isLoading: boolean;
    metadata?: FHMetadata;
    categoriesMetadata?: { [entityName: string]: HttpStatusCode };
}

const getTablesOrder = () => [
    { category: FH_NAME_TO_CATEGORY_MAP.Account, Component: FHAccountsTable, isCompactFunc: responsiveColumns => responsiveColumns <= 4 },
    { category: FH_NAME_TO_CATEGORY_MAP.Investments, Component: FHInvestmentTable },
    { category: FH_NAME_TO_CATEGORY_MAP.Loans, Component: FHLoansTable },
    { category: FH_NAME_TO_CATEGORY_MAP.Credit, Component: FHCreditLinesTable },
    { category: FH_NAME_TO_CATEGORY_MAP.Saving, Component: FHLongTermSavingTable },
];

const categoriesStatusToNotShow = new Set([HttpStatusCode.NOT_FOUND, HttpStatusCode.NO_CONTENT, undefined, null]);
const fhSummarySectionHeaderStyles = { root: { paddingRight: 4 } };

const FHSummaryScreen: React.FunctionComponent<ITablesInfo> = ({ entities, metadata, isError, isLoading, categoriesMetadata }) => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const [selected, setSelected] = useState(translate('OVERVIEW'));
    const title = translate('FH_FINANCIAL_HOLDINGS');
    const ref = useRef<HTMLDivElement>(null);
    const { columns: responsiveColumns } = useContext(ResponsiveContainerContext);
    const isCompact = responsiveColumns <= 2;

    const onPivotLinkClick = useCallback(link => {
        setSelected(link.props.itemKey);
    }, []);

    const onNavLinkClick = useCallback((_, link) => {
        setSelected(link.key);
    }, []);

    // Should be removed when upgarding fluent ui
    useEffect(() => {
        ref.current?.querySelector('.ms-Pivot-overflowMenuButton')?.setAttribute('aria-label', translate('MORE_TABS'));
    }, [ref, isLoading, translate]);

    const tables = useMemo(() => {
        if (!metadata || !entities) {
            return {};
        }
        const ownedFH = entities.filter(fh => fh.role && fhOwnerRoles.includes(fh.role));

        const orderedTable = getTablesOrder().reduce(
            (prevValue, { category, Component, isCompactFunc }) => {
                const categoryRestrictionMetadata = categoriesMetadata?.[FH_CATEGORY_TO_ENTITY_NAME[category]];
                if (categoriesStatusToNotShow.has(categoryRestrictionMetadata)) {
                    return prevValue;
                }

                return {
                    ...prevValue,
                    [metadata.categories.optionSet[category].text]:
                        categoryRestrictionMetadata !== HttpStatusCode.OK ? (
                            <SummaryViewEmptyState {...{ text: translate('CUSTOMER_INFORMATION_RESTRICTED'), image: IMAGE_SRC.no_access100 }} />
                        ) : (
                            <Component
                                isCompact={isCompactFunc?.(responsiveColumns) || isCompact}
                                indictableFHItems={ownedFH}
                                typesOptionSet={metadata.types.optionSet}
                            />
                        ),
                };
            },
            {
                [translate('OVERVIEW')]: (
                    <FHOverviewTable
                        indictableFHItems={ownedFH}
                        typesOptionSet={metadata.types.optionSet}
                        categoryOptionSet={metadata.categories.optionSet}
                        isCompact={isCompact}
                        categoriesMetadata={categoriesMetadata}
                    />
                ),
            }
        );

        return orderedTable;
    }, [metadata, entities, translate, isCompact, responsiveColumns, categoriesMetadata]);

    const groupsNav = useMemo(() => [{ links: Object.keys(tables).map(tableName => ({ name: tableName, url: '', key: tableName })) }], [tables]);

    if (isError) {
        return (
            <div style={{ minHeight: '300px', height: '100%' }}>
                <SectionHeader titleString={title} />
                <ErrorState iconSize={100} />
            </div>
        );
    }

    return (
        <Stack verticalFill styles={{ root: { minHeight: '300px' } }}>
            <SectionHeader
                horizontalAlign="start"
                styles={fhSummarySectionHeaderStyles}
                dividerStyles={fhSummaryHeaderSeparatorStyles}
                titleString={title}
            >
                {!isLoading && <BaseCurrency />}
            </SectionHeader>
            {isLoading ? (
                <Stack verticalFill verticalAlign="center">
                    <Loading />
                </Stack>
            ) : (
                <Stack grow horizontal>
                    <Nav onLinkClick={onNavLinkClick} selectedKey={selected} groups={groupsNav} styles={navStyles} />
                    <Separator vertical styles={verticalSeparatorStyles} />
                    <Pivot
                        selectedKey={selected}
                        aria-label={translate('FINANCIAL_HOLDINGS_NAVIGATION')}
                        overflowBehavior="menu"
                        styles={pivotStyles}
                        style={pivotStyle}
                        onLinkClick={onPivotLinkClick}
                        ref={ref}
                    >
                        {Object.keys(tables).map(currKey => {
                            return (
                                <PivotItem key={currKey} itemKey={currKey} headerText={currKey} data-testid={`category-menu-${currKey}`}>
                                    <Separator styles={summarySeparatorStyle} />
                                    <Stack>{tables[currKey]}</Stack>
                                </PivotItem>
                            );
                        })}
                    </Pivot>
                </Stack>
            )}
        </Stack>
    );
};

export default FHSummaryScreen;
