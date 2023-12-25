import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';

export const dataPieChartStyles = {
    root: {
        background: COLORS.white,
        boxShadow: '0px 1.6px 3.6px rgba(0, 0, 0, 0.132), 0px 0.3px 0.9px rgba(0, 0, 0, 0.108)',
        borderRadius: '4px',
        width: '100%',
        miHeight: '269px',
        height: '100%',
    },
};

export const dataPieChartSeparator = { root: { width: '100%', padding: '0px 0px', height: '0px', marginBottom: 8 } };
export const dataPieChartHeader = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size14, lineHight: 20 } };
export const dataPieChartLegendTokens = { childrenGap: '16' };
export const dataPieChartLegendStyles = {
    root: { padding: '16px', flexWrap: 'wrap', alignItems: 'flex-start', display: 'flex' },
};
export const dataPieChartLegendCompactStyles = mergeStyleSets(dataPieChartLegendStyles, {
    root: { paddingInlineStart: 0, paddingBlockStart: 0, alignItems: 'flex-start', display: 'flex' },
});

export const dataPieChartHeaderStyles = { root: { padding: '16px' } };
export const dataPieChartCompactRefStyles = { marginTop: 16 };
