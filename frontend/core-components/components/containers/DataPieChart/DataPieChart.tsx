import React, { FC, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { Separator } from '@fluentui/react/lib/Separator';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '../../../constants/ImageSrc';
import { formatNumber } from '../../../utilities/NumberUtils';
import { useLocale } from '../../../context/hooks/useLocale';
import { IDataPieChartProps, IPieChartData, IRoundedPieChartData } from './DataPieChart.interface';
import {
    dataPieChartCompactRefStyles,
    dataPieChartHeader as dataPieChartHeaderTextStyles,
    dataPieChartHeaderStyles,
    dataPieChartLegendCompactStyles,
    dataPieChartLegendStyles as pieChartLegendWrapperStyles,
    dataPieChartLegendTokens,
    dataPieChartSeparator,
    dataPieChartStyles,
} from './DataPieChart.style';
import { innerPieRadius, outerPieRadius, chartWidth, chartHeight, smallSliceThreshold } from './DataPieChart.const';
import BaseCurrency from '../../atoms/BaseCurrency/BaseCurrency';
import LegendItem from '../../atoms/LegendItem/LegendItem';
import { appendLabels, appendSmallSlicesLabels, getPercantageLable } from './DataPieChartLabels';
import { useColorContrastListener } from '../../../hooks/useColorContrastListener';
import { SystemColors } from '../../../constants/Colors';

const arc = d3.arc<PieArcDatum<IPieChartData>>().innerRadius(innerPieRadius).outerRadius(outerPieRadius);
const currencyStackTokens = { childrenGap: 4 };

export const highContrastColorList = [SystemColors.text, SystemColors.activeText, SystemColors.selectedText, SystemColors.disabledText];

export const getCategoryColor = (color: string, index: number, highContrast: boolean): string => {
    if (!highContrast) {
        return color;
    }
    return highContrastColorList[index % highContrastColorList.length];
};

const DataPieChart: FC<IDataPieChartProps> = ({
    header,
    data,
    isCompactView,
    emptyStateText,
    showCurrency,
    styles: { rootStyles, legendStyles, chartStyles } = { rootStyles: dataPieChartStyles },
}) => {
    const svgRef = useRef(null);

    const locale = useLocale();

    const highContrast = useColorContrastListener();

    const { normalizedData, total } = useMemo(() => {
        const total = data.reduce((f, { value }) => f + Math.abs(value), 0);
        const positiveData = data.map(d => {
            const percentage = (Math.abs(d.value) / total) * 100;
            return {
                ...d,
                value: Math.max(Math.round(percentage), 1),
                actualValue: percentage,
            };
        });
        return { normalizedData: positiveData.sort((d1, d2) => d2.value - d1.value), total };
    }, [data]);

    useEffect(() => {
        const showCompact = total > 999999;

        const smallSlices = normalizedData.filter(d => d.value <= smallSliceThreshold);
        const smallSlicesSet = new Set(smallSlices.length > 1 ? smallSlices.map(s => s.category) : []);

        const arcsPieData = d3.pie<IRoundedPieChartData>().value(d => d.value)(normalizedData);
        const svgCanvas = d3.select(svgRef.current);
        svgCanvas.selectAll('g.arc').remove();
        svgCanvas.selectAll('text').remove();

        svgCanvas
            .append('text')
            .text(`${formatNumber(total, locale, showCompact, { maximumFractionDigits: showCompact ? 2 : 0 })}`)
            .attr('transform', d => `translate(${chartWidth / 2},${chartHeight / 2 + 5})`)
            .style('text-anchor', 'middle')
            .style('font-family', 'Segoe UI')
            .style('font-weight', 550)
            .style('font-size', 17)
            .attr('fill', SystemColors.text);

        const g = svgCanvas.selectAll('g.arc').data(arcsPieData);

        const updates = g
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('transform', `translate(${chartWidth / 2},${chartHeight / 2})`);

        updates
            .append('path')
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('d', arc)
            .attr('role', 'img')
            .attr('aria-label', d => `${d.data.category} - ${getPercantageLable(d.data)},`)
            .attr('fill', (d, i) => getCategoryColor(d.data.color, i, highContrast));

        if (total !== 0 && smallSlicesSet.size > 0) {
            appendSmallSlicesLabels(updates.filter(u => smallSlicesSet.has(u.data.category)));
        }

        if (total !== 0) {
            appendLabels(updates.filter(u => !smallSlicesSet.has(u.data.category)));
        }
    }, [normalizedData, highContrast]);

    const getLegendStyles = () => {
        if (legendStyles) {
            return legendStyles;
        }
        if (isCompactView) {
            return dataPieChartLegendCompactStyles;
        }
        return pieChartLegendWrapperStyles;
    };

    const getChartStyles = () => {
        if (chartStyles) {
            return chartStyles;
        }
        if (isCompactView) {
            return dataPieChartCompactRefStyles;
        }

        return undefined;
    };

    const renderEmptyState = () => <EmptyState title={emptyStateText} icon={IMAGE_SRC.emptyState48} iconSize={48} />;
    const renderPieChartView = () => (
        <>
            <svg ref={svgRef} style={getChartStyles()} height={chartHeight + 2} width={chartWidth + 10} />
            <Stack horizontal horizontalAlign="start" tokens={dataPieChartLegendTokens} styles={getLegendStyles()}>
                {normalizedData.map((d, i) => (
                    <LegendItem key={d.category} color={getCategoryColor(d.color, i, highContrast)} label={d.category} />
                ))}
            </Stack>
        </>
    );

    return (
        <Stack styles={rootStyles} horizontalAlign="center">
            <Stack.Item role="heading" aria-level={3} align="start" styles={isCompactView ? undefined : dataPieChartHeaderStyles}>
                <Stack verticalAlign="center" horizontal tokens={currencyStackTokens}>
                    <Text styles={dataPieChartHeaderTextStyles}>{header}</Text>
                    {showCurrency && <BaseCurrency ariaLabelPrefix={header} styles={dataPieChartHeaderTextStyles} />}
                </Stack>
            </Stack.Item>
            {isCompactView || <Separator styles={dataPieChartSeparator} />}
            {normalizedData.length !== 0 ? renderPieChartView() : renderEmptyState()}
        </Stack>
    );
};
export default DataPieChart;
