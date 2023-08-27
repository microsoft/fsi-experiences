import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const SummarySectionStyles = mergeStyleSets({
    root: { marginBottom: '32px' },
    sectionIcon: { fontSize: FontSizes.size24, height: '26px', lineHeight: '26px', textAlign: 'center', color: NeutralColors.gray130 },
    headerTitle: { fontSize: FontSizes.size16, fontWeight: FontWeights.semibold, color: NeutralColors.gray130, marginBottom: '3px' },
    headerSection: { marginLeft: '12px' },
    headerSubtitle: { fontSize: FontSizes.size12, color: NeutralColors.gray160 },
});
