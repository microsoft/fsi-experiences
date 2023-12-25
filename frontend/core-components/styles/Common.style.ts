import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { COLORS } from '../constants/Colors';

export const rootSummaryView: IStackStyles = {
    root: {
        overflow: 'auto',
        padding: '16px',
        height: '100%',
        boxSizing: 'border-box',
        background: COLORS.loanTrackerBackground,
    },
};

export const baseCardStyle = {
    borderRadius: '2px',
    boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    background: COLORS.white,
};

export const baseCardStyles: IStackStyles = {
    root: {
        ...baseCardStyle,
    },
};

export const leftSideBoxStyle: IStackStyles = {
    root: {
        minWidth: '280px',
        flex: '1 1 auto',
        flexBasis: '12.5%',
    },
};

export const baseCustomerOnboardingCardStyle = {
    borderRadius: '2px',
    background: COLORS.white,
};

export const stackFieldFormTokens = {
    childrenGap: 32,
};

export const dividerZIndexStyles = {
    root: {
        zIndex: 1,
    },
};

export const visuallyHidden = mergeStyles({
    position: 'fixed',
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)',
    width: '1px',
    height: '1px',
    whiteSpace: 'nowrap',
});

export const MEDIA_QUERY_HIGH_CONTRAST = '@media screen and (forced-colors: active), screen and (-ms-high-contrast: active)';

export const MEDIA_QUERY_IS_SMALL_SCREEN_TABLE_BREAK_POINT = 'screen and (max-width: 700px)';
