import { FontSizes, FontWeights, mergeStyles } from '@fluentui/react/lib/Styling';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const wizardStyles = mergeStyles({ height: '100%' });
export const defaultMainViewContentStyles: IStackStyles = {
    root: {
        maxHeight: '100%',
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },
};

export const generalStyles = mergeStyles({ padding: '16px' });
export const headerTextStyles = mergeStyles({ fontSize: FontSizes.size20, fontWeight: FontWeights.semibold, margin: 0 });

export const stepsPaneStyles = mergeStyles({
    minWidth: '20%',
    overflow: 'auto',
    flexShrink: '0 !important',
});

export const stepContentStyles = mergeStyles({ height: 'auto', overflow: 'inherit' });

export const headerActionStyles = mergeStyles({ color: NeutralColors.gray130 });

export const defaultContentStyles: IStackStyles = { root: { overflow: 'auto' } };
