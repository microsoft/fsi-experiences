import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStackStyles, IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { ITooltipHostStyles } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { fadeInAnimation } from '@fsi/core-components/dist/styles/Animations.style';

export const recWrapperStackTokens: IStackTokens = { childrenGap: 6 };
export const recStackTokens: IStackTokens = { childrenGap: 8 };
export const recStackStyles: IStackStyles = {
    root: {
        animationName: fadeInAnimation,
        animationDuration: '0.3s',
    },
};

export const recTextStyles: ITextStyles = {
    root: {
        fontSize: '11px',
        color: COLORS.darkGray140,
        lineHeight: 14,
        whiteSpace: 'normal',
    },
};

export const recDescStyles: ITextStyles = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.darkGray160,
        lineHeight: 16,
        whiteSpace: 'normal',
    },
};

export const getRecTextStyle = (styles: ITextStyles): ITextStyles => mergeStyleSets(recTextStyles, styles);

export const getRecTooltipHostStyles = (styles: ITooltipHostStyles = { root: {} }): ITooltipHostStyles =>
    mergeStyleSets(
        {
            root: {
                alignSelf: 'start',
            },
        },
        styles
    );

export const tooltipHostBtnStyle: IButtonStyles = {
    root: {
        paddingBlockEnd: 2,
    },
};

export const getRecIconStyles = (color: string = COLORS.blue, styles: IIconStyles = {}): IIconStyles =>
    mergeStyleSets(
        {
            root: {
                alignSelf: 'start',
                color,
            },
        },
        styles
    );
