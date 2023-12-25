import { FontSizes } from '@fluentui/react/lib/Styling';
import { FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';

export const partyIAndE_MainStackStyles = {
    root: {
        padding: '16px 0',
    },
};

export const partyIAndE_RowStyles = {
    root: {
        justifyContent: 'space-between',
        paddingBlock: '11px',
        paddingInline: '47px clamp(15px, 3vw, 36px)',
        minHeight: '44px',
    },
};

export const partyIAndE_TextStyles = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
        paddingInlineEnd: '4px',
    },
};

export const partyIAndE_CurrencyBaseStyles = {
    inner: { flexWrap: 'nowrap' },
};

export const partyIAndE_CurrencyCodeStyles = {
    root: {
        fontSize: FontSizes.size12,
        color: NeutralColors.gray130,
    },
};

export const partyIAndE_CurrencyNumberStyles = {
    root: {
        fontSize: FontSizes.size20,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
};

export const partyIAndE_EmptyStateStyles = { container: { height: 'auto' } };
