import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const SID_COMPACT_CLASS = 'sid-main-cell-compact';
export const SID_MOBILE_CLASS = 'sid-main-cell-mobile';

export const sidMainDataCellStyles = compact => ({
    root: {
        fontWeight: FontWeights.semibold,
        display: 'flex',
        '.sid-main-cell-inner': {
            paddingBlock: 0,
            paddingInline: '24px',
            borderInlineEnd: `1px solid ${COLORS.gray}`,
            flex: 1,
        },

        '&:last-child .sid-main-cell-inner': {
            borderInlineEnd: 'none',
            paddingInlineEnd: 0,
        },

        '&.sid-main-cell-compact': {
            width: '50%',
            paddingBlock: '24px',
            paddingInline: 0,
            '&:nth-child(-n+2)': {
                paddingBlockStart: compact ? '8px' : 0,
            },
            '&:nth-last-child(-n+2)': {
                paddingBlockEnd: compact ? '8px' : 0,
            },
        },
        '&:nth-child(odd).sid-main-cell-compact .sid-main-cell-inner': {
            paddingInlineStart: 0,
        },
        '&:nth-child(even).sid-main-cell-compact .sid-main-cell-inner': {
            borderInlineEnd: 'none',
        },

        '&.sid-main-cell-compact:nth-last-child(n+3)': {
            borderBlockEnd: `1px solid ${COLORS.gray}`,
        },
        '&:first-child .sid-main-cell-inner': {
            paddingInlineStart: 0,
        },
        [`&.${SID_MOBILE_CLASS}`]: {
            width: '100%',
        },
        [`&.${SID_MOBILE_CLASS} .sid-main-cell-inner`]: {
            paddingBlock: '12px',
            paddingInline: 0,
            border: 'none',
            borderBlockEnd: `1px solid ${COLORS.gray}`,
        },
        [`&.${SID_MOBILE_CLASS}:first-child .sid-main-cell-inner`]: {
            paddingBlockStart: 0,
        },
        [`&.${SID_MOBILE_CLASS}:last-child .sid-main-cell-inner`]: {
            border: 'none',
            paddingBlockEnd: 0,
        },
    },
});

export const sidMainDataRowFontStyle = {
    root: {
        fontSize: FontSizes.size20,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
};

export const sidMainDataRowCurrencyStyle = {
    root: {
        fontSize: FontSizes.size14,
        color: NeutralColors.gray160,
        fontWeight: FontWeights.semibold,
    },
};
