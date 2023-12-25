import { FontSizes, FontWeights, NeutralColors, CommunicationColors } from '@fluentui/react/lib/Theme';
import { COLORS, SystemColors } from '@fsi/core-components/dist/constants/Colors';
import { MEDIA_QUERY_HIGH_CONTRAST } from '@fsi/core-components/dist/styles/Common.style';
export const rootStyles = ({ item, value, index }) => ({
    root: {
        padding: 16,
        cursor: 'pointer',
        transition: 'background 0.2s ease-in-out',
        background: item.id === value ? CommunicationColors.tint40 : COLORS.white,

        borderTop: index === 0 ? 'none' : '1px solid',
        borderColor: NeutralColors.gray20,
        '&:hover': {
            background: NeutralColors.gray10,
        },
        '&[aria-selected="true"]': {
            backgroundColor: CommunicationColors.tint40,
            [MEDIA_QUERY_HIGH_CONTRAST]: {
                backgroundColor: SystemColors.activeText,
            },
        },
        '&:focus-visible, &[role]:focus': {
            outline: `2px solid var(--outline-color, ${COLORS.darkBlue3})`,
            outlineOffset: '-2px',
        },
    },
});

export const iconAndTextWrapperStyles = { root: { gap: 6 } };

export const iconStyles = { root: { fontSize: FontSizes.size12, color: NeutralColors.gray130 } };

export const mainTextStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size14, color: NeutralColors.gray160 } };

export const secondaryTextStyles = { root: { fontWeight: FontWeights.regular, fontSize: FontSizes.size12, color: NeutralColors.gray130 } };

export const cellRootStyles = { root: { gap: 16 } };
