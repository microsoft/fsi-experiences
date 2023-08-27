import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { ILegendItemStyles } from './LegendItem.interface';

export const getLegendItemClassNames = (color: string, styles?: ILegendItemStyles) => {
    return mergeStyleSets(
        {
            label: {
                fontWeight: FontWeights.regular,
                fontSize: FontSizes.size12,
            },
            marker: {
                backgroundColor: color,
                width: '12px',
                height: '12px',
                display: 'inline-block',
            },
        },
        styles
    );
};

export const legendCategoryWrapperStyle = {
    root: { display: 'inline', wordBreak: 'break-all', whiteSpace: 'break-spaces', marginLeft: '0! important', marginRight: 16 },
};
