import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { COLORS } from '@fsi/core-components/dist/constants';
import { MEDIA_SCREEN_S_TABLE_BREAK_POINT, MEDIA_SCREEN_XS_TABLE_BREAK_POINT } from '../../constants/StyleSelectors.consts';
import { SCREEN_S_TABLE_WRAPPER_PADDING } from '../../styles/Common.style';

export const rootStyles: IStackStyles = {
    root: {
        height: '100%',
        padding: 15,
        background: COLORS.loanTrackerBackground,
        position: 'relative',
        inset: 0,
        '@media screen and (min-width: 1000px)': {
            position: 'absolute',
        },
        [MEDIA_SCREEN_S_TABLE_BREAK_POINT]: {
            padding: SCREEN_S_TABLE_WRAPPER_PADDING,
        },
        [MEDIA_SCREEN_XS_TABLE_BREAK_POINT]: {
            paddingInline: 0,
        },
    },
};

export const rightWrapperStyles: IStackStyles = { root: { background: COLORS.white, overflow: 'auto' } };
