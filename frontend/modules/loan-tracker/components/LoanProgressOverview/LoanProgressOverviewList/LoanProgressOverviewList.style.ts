import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { FontSizes, FontWeights, mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { detailsListStyles } from '@fsi/core-components/dist/styles/DetailsList.style';

export const rowTextStyle = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
        color: NeutralColors.gray160,
    },
};

export const completedIconStyles = mergeStyles({
    color: COLORS.successIcon,
    fontSize: '18px',
    width: '100%',
    textAlign: 'center',
});

export const openButtonStyles = (themePrimary: string): IButtonStyles => ({
    root: {
        height: 'auto',
        color: themePrimary,
        '&:hover': {
            fontWeight: FontWeights.semibold,
        },
    },
});

export const verifyTextStyles = {
    root: {
        width: '50%',
        selectors: {
            ':first-child': {
                width: 'max-content',
            },
        },
    },
};

export const overflowTextStyle = mergeStyleSets({
    root: {
        overflow: 'hidden',
    },
});

export const verifyTextStylesWithOverflowText = mergeStyleSets(verifyTextStyles, overflowTextStyle);

export const openButtonStackTokens = {
    childrenGap: 7,
};

export const detailsHeaderStyles = {
    root: {
        padding: 0,
        '& > .ms-DetailsHeader-cell': {
            display: 'inline-flex',
            overflow: 'hidden',
            textOverflow: 'initial',
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.size14,
        },
    },
};

export const visuallyHiddenTextStyle: any = {
    root: {
        width: '1px',
        height: '1px',
        clipPath: 'inset(100%)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
};

export const loanProgressDetailsListStyle = mergeStyleSets(detailsListStyles, { root: { overflow: 'hidden' } });
