import { FontSizes, FontWeights, mergeStyles } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const LabelWithAdditionalInfoStyles = mergeStyles({ display: 'flex' });

export const AdditionalTextStyles = mergeStyles({
    fontSize: FontSizes.size12,
    color: NeutralColors.gray130,
    fontWeight: 'semibold' as any,
    padding: '0px 5px',
});
