import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import {
    maxEightColumnsGroupsSelector,
    maxFourColumnsGroupsSelector,
    maxSixColumnsGroupsSelector,
    maxThreeColumnsGroupsSelector,
} from '../GroupsAndRelationshipsApp.const';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IMessageBarStyles } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';

const basicTextStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
        whiteSpace: 'normal',
    },
};

export const scrollableWrapper = (splitLayout): IStackStyles => ({
    root: {
        background: COLORS.white,
        overflowY: splitLayout ? 'initial' : 'auto',
    },
});
export const groupMainDetailsTextBold = mergeStyleSets(basicTextStyles, { root: { fontWeight: FontWeights.semibold } });
export const groupMainDetailsText = basicTextStyles;
export const groupMainDetailsStyles = {
    root: {
        background: COLORS.white,
        padding: '24px',
    },
};

export const groupHeaderWrapperStyles: IStackStyles = {
    root: {
        [maxThreeColumnsGroupsSelector]: {
            flexFlow: 'row wrap',
        },
        [maxEightColumnsGroupsSelector]: {
            justifyContent: 'space-between !important',
        },
        [maxFourColumnsGroupsSelector]: {
            alignItems: 'flex-start',
        },
    },
};

export const groupMainDetailsTitleStyles = {
    root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size32, whiteSpace: 'normal', textAlign: 'initial' },
};

export const groupPivotHeaderStyles = {
    root: {
        flexWrap: 'wrap',
    },
};

export const pivotStyles = {
    link: {
        [maxFourColumnsGroupsSelector]: { margin: 0 },
    },
};

export const groupMainDetailsTagStyles = {
    root: {
        [maxFourColumnsGroupsSelector]: {
            marginLeft: 'auto',
        },
    },
};
export const groupMainDetailsEditIconStyles = { root: { fontSize: '16px' } };
export const groupMainDetailsTableControlStyles = {
    root: {
        background: COLORS.white,
        paddingTop: '18px',
        paddingLeft: '16px',
        paddingRight: '16px',
    },
};
export const groupMainDetailsTableTitleStyles = { root: { fontSize: FontSizes.size16, fontWeight: FontWeights.semibold } };
export const groupMainDetailsFhSummaryStyles = { root: { background: COLORS.primaryTagBackground, width: '100%' } };
export const groupMainDetailsMessageStyles = {
    root: {
        '&:first-child': {
            paddingTop: '8px',
        },
        padding: '0px 8px',
        background: COLORS.white,
    },
};
export const membersWrapper = {
    root: {
        display: 'none',
        [maxSixColumnsGroupsSelector]: {
            background: COLORS.white,
            marginTop: '16px',
            padding: '24px',
            display: 'flex',
        },
    },
};

export const inlineStack = {
    root: {
        display: 'inline-block',
    },
};

export const rightHeaderWrapper = {
    root: {
        [maxThreeColumnsGroupsSelector]: {
            marginLeft: '0 !important',
        },
    },
};

export const groupMainDetailsHeaderStyles = {
    root: {
        [maxFourColumnsGroupsSelector]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            minHeight: 80,
        },
    },
};

export const iconStyle = { fontSize: FontSizes.size16 };

export const messageBarStyles: IMessageBarStyles = { root: { whiteSpace: 'normal' }, content: { alignItems: 'center' } };

export const childrenGap = { childrenGap: '4px' };
