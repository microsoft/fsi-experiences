import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { IRoundedPieChartData } from './DataPieChart.interface';
import { chartWidth, outerPieHeight, outerPieRadius, smallSliceThreshold } from './DataPieChart.const';
import { SystemColors } from '../../../constants/Colors';

const labelsArc = d3
    .arc<PieArcDatum<IRoundedPieChartData>>()
    .innerRadius(outerPieRadius * 1.25)
    .outerRadius(outerPieRadius * 1.25);

export const appendLabels = (appendTo: d3.Selection<SVGGElement, d3.PieArcDatum<IRoundedPieChartData>, null, unknown>): void => {
    appendTo
        .append('text')
        .text(d => (d.endAngle - d.startAngle === 0 ? '' : getPercantageLable(d.data)))
        .attr('aria-hidden', true)
        .attr('transform', d => `translate(${labelsArc.centroid(d as PieArcDatum<IRoundedPieChartData>).map(i => i + 5)})`)
        .style('text-anchor', d => {
            const rads = (d.endAngle - d.startAngle) / 2 + d.startAngle;
            if (rads > (3 * Math.PI) / 4 && rads < (5 * Math.PI) / 4) {
                return 'middle';
            } else if ((rads >= (5 * Math.PI) / 4 && rads <= (7 * Math.PI) / 4) || (d.data.value > smallSliceThreshold && d.data.value <= 10)) {
                return 'end';
            } else {
                return 'middle';
            }
        })
        .attr('fill', SystemColors.text)
        .attr('data-testid', 'normal-slice-label')
        .style('font-family', 'Segoe UI')
        .style('font-weight', 'bold')
        .style('font-size', 12);
};

export const appendSmallSlicesLabels = (appendTo: d3.Selection<SVGGElement, d3.PieArcDatum<IRoundedPieChartData>, null, unknown>): void => {
    appendTo
        .append('line')
        .style('stroke', '#C6C6C6')
        .style('stroke-width', 1)
        .attr('x1', 0)
        .attr('y1', -outerPieHeight / 2 + 1)
        .attr('x2', -chartWidth / 2)
        .attr('y2', -outerPieHeight / 2 + 1);

    const size = 12;
    appendTo
        .append('rect')
        .attr('x', -chartWidth / 2)
        .attr('y', (_d, i) => -outerPieHeight / 2 + 5 + i * (size + 5))
        .attr('width', size)
        .attr('height', size)
        .style('fill', d => d.data.color);

    appendTo
        .append('text')
        .attr('x', -chartWidth / 2 + size * 1.2)
        .attr('y', (_d, i) => -outerPieHeight / 2 + 5 + i * (size + 5) + size / 2)
        .text(d => getPercantageLable(d.data))
        .attr('aria-hidden', true)
        .attr('text-anchor', 'left')
        .attr('data-testid', 'very-small-slice-label')
        .style('font-family', 'Segoe UI')
        .style('font-weight', 'bold')
        .style('font-size', 12)
        .style('line-hight', 12)
        .style('alignment-baseline', 'middle')
        .attr('fill', SystemColors.text);
};

export const getPercantageLable = (data: IRoundedPieChartData): string => (data.actualValue < 1 ? '<1%' : `${data.value}%`);
