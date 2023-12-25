import { ISeparatorStyles } from '@fluentui/react/lib/components/Separator/Separator.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { CommunicationColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import {
    largeDetailedFHSelector,
    maxSixColumnsDetailedFHSelector,
    mediumDetailedFHSelector,
    smallDetailedFHSelector,
} from '../../DetailedFHMain.style';

export const fhListItemStyles = {
    root: {
        align: 'left',
        display: 'flex',
        justifyContent: 'left',
        height: '100%',
        overflowY: 'auto',
        width: '100%',
    },
};
export const leftStackItemStyles = (hidden: boolean): IStackStyles => ({
    root: {
        display: hidden ? 'none' : 'flex',
        width: '40%',
        [largeDetailedFHSelector]: {
            width: 640,
            minWidth: 640,
        },
        [mediumDetailedFHSelector]: {
            width: 600,
            minWidth: 600,
        },
        [smallDetailedFHSelector]: {
            width: 320,
            minWidth: 320,
        },
        [maxSixColumnsDetailedFHSelector]: {
            width: '100%',
            minWidth: '100%',
        },
    },
});

export const rightStackItemStyles = (hidden: boolean): IStackStyles => ({
    root: {
        align: 'left',
        display: hidden ? 'none' : 'flex',
        justifyContent: 'left',
        height: '100%!important',
        width: '100%',
        flexBasis: '60%',
        whiteSpace: 'initial',
    },
});

export const stackTokens = {
    childrenGap: -1,
};

export const assetsLiabilitiesStackItemStyles = { root: { padding: '14px 18px 16px 18px' } };

export const fhVerticalDividerStyles: Partial<ISeparatorStyles> = {
    root: {
        padding: '0px 0px',
        height: '100%',
        position: 'absolute',
        width: '1px',
        '&:after': {
            backgroundColor: COLORS.lightGray40,
        },
    },
};
export const backWrapperStyles: IStackStyles = {
    root: {
        background: COLORS.white,
        padding: '16px 24px',
        display: 'none',
        [maxSixColumnsDetailedFHSelector]: {
            display: 'flex',
        },
    },
};

export const backTextStyles: ITextStyles = {
    root: {
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size20,
        lineHeight: 28,
    },
};

export const backStyles = { root: { color: CommunicationColors.primary } };
