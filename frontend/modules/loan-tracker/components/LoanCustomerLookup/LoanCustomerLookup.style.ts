import { FontWeights } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const addPartyButtonStyles = {
    labelHovered: { color: COLORS.actionButtonDefaultColor },
    rootHovered: { background: NeutralColors.gray10 },
    root: {
        padding: 18,
        fontSize: 14,
        fontWeight: FontWeights.semibold,
        // the same style as in `PartyList.style.ts` -> `wrapperStyles` to have a border
        '@media screen and (min-width: 1000px)': {
            borderInline: `1px solid ${NeutralColors.gray40}`,
        },
    },
};
