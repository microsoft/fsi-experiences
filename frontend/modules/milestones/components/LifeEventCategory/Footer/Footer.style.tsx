import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const addIconStyles: IIconStyles = { root: { margin: 0, fontWeight: 600, fontSize: 8 } };

export const createLifeEventButtonStyles = (primaryColor: string): IButtonStyles => ({
    root: {
        margin: 0,
        textAlign: 'left',
        marginLeft: 'auto',
        marginTop: 'auto !important',
        fontWeight: 600,
        fontSize: FontSizes.size12,
        color: primaryColor,
        height: 'auto',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

export const footerWrapper: IStackStyles = {
    root: {
        borderTop: `1px solid ${NeutralColors.gray30}`,
        paddingTop: '6px',
        flex: 1,
    },
};

export const typeStringItemStyles: ITextStyles = {
    root: {
        flex: '0 1 auto',
        alignSelf: 'auto',
        fontSize: FontSizes.size12,
        lineHeight: '16px',
        color: NeutralColors.black,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    },
};

export const dateStringItemStyles: ITextStyles = mergeStyleSets(typeStringItemStyles, {
    root: {
        fontWeight: 400,
        color: NeutralColors.gray130,
        marginTop: 0,
        width: '100%',
    },
});

export const typeWrapperStyles: IStackStyles = { root: { position: 'relative', overflow: 'hidden' } };
