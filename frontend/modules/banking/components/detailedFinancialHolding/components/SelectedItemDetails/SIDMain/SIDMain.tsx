import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Separator } from '@fluentui/react/lib/Separator';
import { SIDHeader } from '../SIDHeader/SIDHeader';
import { SIDFooter } from '../SIDFooter/SIDFooter';
import { SIDMainDataRow } from '../SIDMainDataRow/SIDMainDataRow';
import {
    chartHorizontalSeparatorStyles,
    chartRoot,
    chartVerticalSeparatorStyles,
    infoRootStyles,
    itemAlignmentsStackTokens,
    pieChartStyles,
    SEPARATOR_GREY_STYLES,
    sidMainRoot,
    sidMainStackItemStyles,
} from './SIDMain.style';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import SIDInstrumentsSection from '../SIDInstrumentsSection/SIDInstrumentsSection';
import { HeaderProps, ISIDMainProps } from './SIDMain.interface';
import getStructure from '../../../utilities/SIDComponentStructure';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { getOptionSetText } from '../../../../../utilities/EntityMetadata';
import DataPieChart from '@fsi/core-components/dist/components/containers/DataPieChart/DataPieChart';
import SIDCurrencies from '../SIDCurrencies/SIDCurrencies';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { SID_MAIN_RESPONSIVE_CLASS } from './SIDMain.const';
import { ResponsiveContainerContext } from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer.context';

export const SIDMain: FC<ISIDMainProps> = ({ selected, relatedCustomers, relatedCustomersLoadingState, metadata, chart, isPreviewFeatures }) => {
    const translate = useTranslation(namespaces.DETAILED_FH_CONTROL);

    if (!selected || !selected.fhCategoryEntity) {
        return <EmptyState icon={IMAGE_SRC.emptyState} iconSize={200} title={translate('THERE_ARE_NOT_HOLDINGS_FOR_THIS_USER')} />;
    }

    const structure = getStructure({ entity: selected, translate, metadata, isPreviewFeatures });

    if (!structure) {
        return <ErrorState iconSize={200} />;
    }

    const { main, footer, instruments, header } = structure;
    const isChartEnabled = isPreviewFeatures && chart;
    return (
        <ResponsiveContainer classPrefix={SID_MAIN_RESPONSIVE_CLASS}>
            <Stack data-testid="sid-page-content" tokens={itemAlignmentsStackTokens} styles={sidMainStackItemStyles}>
                <SIDHeader
                    data={header as HeaderProps}
                    indicators={selected.indicator}
                    name={selected.name}
                    description={selected.description}
                    category={getOptionSetText(selected.category, metadata?.categories)}
                    type={getOptionSetText(selected.type, metadata?.types)}
                    contactsRole={metadata?.role}
                    contacts={relatedCustomers}
                    customersLoadingState={relatedCustomersLoadingState}
                />
                <Separator styles={SEPARATOR_GREY_STYLES} />

                <Stack styles={infoRootStyles} horizontal>
                    <Stack styles={sidMainRoot({ isChartEnabled })} verticalAlign="space-between">
                        <SIDCurrencies data={header as HeaderProps} entity={selected} />
                        <Separator styles={SEPARATOR_GREY_STYLES} />
                        <Stack grow={1} verticalAlign="center">
                            {main && (
                                <ResponsiveContainerContext.Consumer>
                                    {({ columns }) => <SIDMainDataRow entity={selected} list={main} compact={columns < 6} isMobile={columns < 4} />}
                                </ResponsiveContainerContext.Consumer>
                            )}
                        </Stack>
                    </Stack>
                    {isChartEnabled && (
                        <>
                            <Separator styles={chartHorizontalSeparatorStyles} />
                            <Separator styles={chartVerticalSeparatorStyles} vertical />
                            <Stack styles={chartRoot}>
                                <DataPieChart
                                    styles={pieChartStyles}
                                    header={chart.header}
                                    emptyStateText={chart.emptyStateText}
                                    isCompactView
                                    data={chart.data || []}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
                {footer?.length && <Separator styles={SEPARATOR_GREY_STYLES} />}
                <SIDFooter entity={selected} data={footer} />
                {/* istanbul ignore next */ footer?.length === 0 ? <></> : <Separator styles={SEPARATOR_GREY_STYLES} />}
                <SIDInstrumentsSection metadata={metadata} entity={selected} data={instruments} />
            </Stack>
        </ResponsiveContainer>
    );
};

export default SIDMain;
