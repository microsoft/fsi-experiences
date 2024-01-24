import React, { FC, useContext } from 'react';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Separator } from '@fluentui/react/lib/Separator';
import { IGroupFinancialHolding } from '../../../interfaces/Groups';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import {
    fullViewStackStyle,
    annualIncomeCardStyles,
    fullViewFirstItemStyles,
    fullViewSeparatorStyle,
    annualIncomeTextStyles,
    assetsCardStyles,
    liabilitiesCardStyles,
    fullViewRootStyle,
    annualIncomeCurrencyTextStyles,
    annualIncomeWrapper,
    compactViewRootStyle,
    compactSeparatorStyle,
} from './FinancialDataSummary.style';
import DataPieChart from '@fsi/core-components/dist/components/containers/DataPieChart/DataPieChart';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ResponsiveContainerContext } from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer.context';
import useCalculatedFinancialProducts from '../../../hooks/financialHoldings/useCalculatedFinancialProducts';

export interface IFinancialDataSummaryProps {
    financialProducts?: IGroupFinancialHolding[];
    annualIncome: number;
    categories: Map<number, string>;
    isCompactView?: boolean;
}

const FinancialDataSummary: FC<IFinancialDataSummaryProps> = ({ financialProducts, annualIncome, categories, isCompactView }) => {
    const data = useCalculatedFinancialProducts({ categories, financialProducts });
    const translate = useTranslation('mainHousehold');
    const responsive = useContext(ResponsiveContainerContext);
    const renderAnnualIncome = () => (
        <Stack.Item grow={1} shrink={1} styles={annualIncomeCardStyles}>
            <Stack
                tokens={{ childrenGap: '16px' }}
                styles={isCompactView ? { root: { height: '100%' } } : fullViewStackStyle}
                horizontalAlign="center"
            >
                <Stack.Item role="heading" aria-level={3} align="start" styles={isCompactView ? {} : fullViewFirstItemStyles}>
                    <Text styles={{ root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size14 } }}>{translate('ANNUAL_INCOME')}</Text>
                </Stack.Item>
                {isCompactView ? null : <Separator styles={fullViewSeparatorStyle} data-testid="group-financial-data-view-separator" />}
                {annualIncome !== 0 ? (
                    <Stack
                        grow
                        styles={{ root: { margin: '0 !important' } }}
                        verticalAlign="center"
                        horizontalAlign="center"
                        className="annual-income-text"
                    >
                        <Currency
                            compact
                            value={annualIncome}
                            numberStyles={annualIncomeTextStyles}
                            currencyStyles={annualIncomeCurrencyTextStyles}
                            styles={annualIncomeWrapper}
                        />
                    </Stack>
                ) : (
                    <EmptyState title={translate('NOT_AVAILABLE')} icon={IMAGE_SRC.emptyState48} iconSize={48} />
                )}
            </Stack>
        </Stack.Item>
    );

    const renderAssets = () => (
        <Stack.Item role="heading" aria-level={3} align="start" grow={2} shrink={2} styles={assetsCardStyles}>
            <DataPieChart
                showCurrency={true}
                header={translate('TOTAL_ASSETS')}
                emptyStateText={translate('THERE_ARE_NO_ASSETS')}
                data={data.assets}
                isCompactView={isCompactView}
            />
        </Stack.Item>
    );

    const renderLiabilities = () => (
        <Stack.Item role="heading" aria-level={3} align="start" grow={2} shrink={2} styles={liabilitiesCardStyles}>
            <DataPieChart
                showCurrency={true}
                header={translate('TOTAL_LIABILITIES')}
                emptyStateText={translate('THERE_ARE_NO_LIABILITIES')}
                data={data.liabilities}
                isCompactView={isCompactView}
            />
        </Stack.Item>
    );

    const renderCompactView = () => {
        const collapseCompact = responsive.columns < 5;
        return (
            <Stack
                wrap={collapseCompact}
                horizontal
                tokens={{ childrenGap: '16px' }}
                styles={compactViewRootStyle}
                data-testid="group-financial-summary"
                className={'fh-summary-compact'}
            >
                {renderAnnualIncome()}
                <Separator vertical={!collapseCompact} styles={compactSeparatorStyle} />
                {renderAssets()}
                <Separator vertical={!collapseCompact} styles={compactSeparatorStyle} />
                {renderLiabilities()}
            </Stack>
        );
    };

    const renderFullView = () => (
        <Stack
            horizontal
            tokens={{ childrenGap: '16px' }}
            className={'fh-summary-full'}
            styles={fullViewRootStyle}
            data-testid="group-financial-view"
        >
            {renderAnnualIncome()}
            {renderAssets()}
            {renderLiabilities()}
        </Stack>
    );

    return isCompactView ? renderCompactView() : renderFullView();
};
export default FinancialDataSummary;
