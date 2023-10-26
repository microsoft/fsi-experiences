import { ILabelStyles } from '@fluentui/react/lib/components/Label/Label.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';

export const focusLabel: ILabelStyles = {
    root: {
        fontWeight: 400,
        fontSize: FontSizes.size12,
        padding: 0,
        display: 'inline',
    },
};

export const focusLabelBold = mergeStyleSets(focusLabel, { root: { fontWeight: 600 } });

export const focusLabelsWrapper: IStackStyles = { root: { display: 'block' } };
