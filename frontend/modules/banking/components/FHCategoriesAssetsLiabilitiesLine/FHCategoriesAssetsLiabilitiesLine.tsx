import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { COLORS } from '@fsi/core-components/dist/constants';
import VerticalGraphLine from '@fsi/core-components/dist/components/atoms/VerticalGraphLine/VerticalGraphLine';
import {
    LegendboxStyle,
    assetsLiabilitiesBaseCurrencyStyle,
    boxContainerStyle,
    LinePieces,
    tagsStackTokens,
    tagStackTokens,
    textContainerStyle,
} from './FHCategoriesAssetsLiabilitiesLine.style';
import { IFHCategoriesAssetsLiabilitiesLineProps } from './FHCategoriesAssetsLiabilitiesLine.interface';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import BaseCurrency from '@fsi/core-components/dist/components/atoms/BaseCurrency/BaseCurrency';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { getCategoryColor } from '@fsi/core-components/dist/components/containers/DataPieChart/DataPieChart';
import { useColorContrastListener } from '@fsi/core-components/dist/hooks/useColorContrastListener/useColorContrastListener';

interface IVerticalGraphLineWrapper {
    value: number;
    background: string;
}

const VerticalGraphLineWrapper: FC<IVerticalGraphLineWrapper> = ({ value, background }) => {
    if (value === 0) {
        return <></>;
    }

    return (
        <Stack.Item grow={Math.abs(value)}>
            <VerticalGraphLine background={background} showText={false} height={12} />
        </Stack.Item>
    );
};

interface ILegendItem {
    value: number;
    name: string;
    color: string;
}

const LegendItem: FC<ILegendItem> = ({ value, name, color }) => (
    <Stack.Item>
        <Stack horizontal tokens={tagStackTokens}>
            <Stack.Item styles={boxContainerStyle}>
                <div style={LegendboxStyle(color)} />
            </Stack.Item>
            <Stack.Item data-testid={`${name}-legend`} styles={textContainerStyle}>
                {name} <NumericValue styles={textContainerStyle} value={value} />
            </Stack.Item>
        </Stack>
    </Stack.Item>
);

const rootStyles = { root: { width: '100% !important' } };

const legendStyles = { root: { paddingBottom: '5px', flexWrap: 'wrap' } };

const FHCategoriesAssetsLiabilitiesLine: FC<IFHCategoriesAssetsLiabilitiesLineProps> = props => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const highContrast = useColorContrastListener();
    const {
        palette: { themePrimary },
    } = useTheme();

    const { showCurrency, assets, liabilities } = props;
    const legendItems: Array<ILegendItem> = useMemo(
        () => [
            { value: assets, name: translate('ASSETS'), color: getCategoryColor(themePrimary, 0, highContrast) },
            { value: liabilities, name: translate('LIABILITIES'), color: getCategoryColor(COLORS.lightBlack, 1, highContrast) },
        ],
        [assets, highContrast, liabilities, themePrimary, translate]
    );

    return (
        <Stack styles={rootStyles} data-testid={`assets-liabillities-${assets}-${liabilities}`}>
            <Stack.Item>
                <Stack horizontal tokens={LinePieces} horizontalAlign="start">
                    <VerticalGraphLineWrapper value={assets} background={getCategoryColor(themePrimary, 0, highContrast)} />
                    <VerticalGraphLineWrapper value={liabilities} background={getCategoryColor(COLORS.lightBlack, 1, highContrast)} />
                </Stack>
            </Stack.Item>
            <Stack.Item>
                <Stack horizontal styles={legendStyles} tokens={tagsStackTokens} horizontalAlign="start">
                    {legendItems.map(legendItem => (
                        <LegendItem key={legendItem.name} {...legendItem} />
                    ))}
                    {showCurrency && <BaseCurrency styles={assetsLiabilitiesBaseCurrencyStyle} />}
                </Stack>
            </Stack.Item>
        </Stack>
    );
};

export default FHCategoriesAssetsLiabilitiesLine;
