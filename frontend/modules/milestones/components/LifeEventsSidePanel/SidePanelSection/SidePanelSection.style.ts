import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { FontSizes } from '@fluentui/react/lib/Styling';

export const expiredSectionStyles: ITextStyles = {
    root: { paddingInline: 16, paddingBlock: 24, borderRadius: 2, backgroundColor: NeutralColors.gray10 },
};
export const expiredTitleStyles: ITextStyles = {
    root: {
        paddingInlineStart: 8,
        fontSize: FontSizes.size16,
        fontWeight: 600,
        backgroundColor: NeutralColors.gray10,
        lineHeight: '20px',
    },
};
export const expiredSubTitleStyles: ITextStyles = {
    root: {
        paddingInlineStart: 8,
        fontSize: FontSizes.size12,
        fontWeight: 400,
        color: NeutralColors.gray130,
        lineHeight: '20px',
    },
};
export const expiredContentStyles: ITextStyles = {
    root: {
        borderRadius: 2,
        display: 'flex',
        alignSelf: 'stretch',
        paddingBlock: '16px',
        paddingInline: '16px 8px',
        background: NeutralColors.white,
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    },
};

export const titleStyles: ITextStyles = { root: { fontSize: FontSizes.size16, fontWeight: 600 } };
export const contentStyles: ITextStyles = {
    root: {
        borderRadius: 2,
        display: 'flex',
        alignSelf: 'stretch',
        padding: 0,
    },
};
