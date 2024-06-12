import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IModalStyles } from '@fluentui/react/lib/components/Modal/Modal.types';
import { IOverlayProps } from '@fluentui/react/lib/components/Overlay/Overlay.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const rootDIStyles: IStackStyles = {
    root: {
        paddingInline: '16px',
        paddingBlockEnd: '16px',
        paddingBlockStart: '4px',
        background: COLORS.lightGray10,
        height: '100%',
    },
};

export const widgetDIStyles: IStackStyles = {
    root: {
        height: '100%',
        overflowY: 'auto',
    },
};

export const wrapperStyles: IStackStyles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBlock: '16px',
        paddingInlineStart: '0px',
        paddingInlineEnd: '16px',
        alignItems: 'center',
    },
};

export const modalStyles: Partial<IModalStyles> = {
    root: { height: '100%' },
};

export const modalOverlayProps: IOverlayProps = {
    styles: {
        root: {
            backgroundColor: COLORS.whiteOverlay,
        },
    },
};
export const modalContentStyles = mergeStyleSets({
    container: {
        minWidth: 'min(100% - 25px, 760px)',
        width: '70%',
        height: '80%',
        maxHeight: '100%', // overrides default FluentUI styles
        '.ms-Modal-scrollableContent': {
            height: '100%',
        },
        '@media(max-width: 1280px)': {
            width: '90%',
            height: '90%',
        },
        '@media(max-width: 1000px)': {
            height: '98%',
        },
        '@media(max-width: 500px)': {
            marginBlockEnd: '4px',
        },
    },
});

export const addButtonStyles = {
    root: {
        minWidth: 67,
        alignSelf: 'end',
    },
};

export const addIconProps: IIconProps = { iconName: 'Add' };

export const diToastNotificationWrapperStyles: IStackStyles = { root: { position: 'fixed', inset: 0, pointerEvents: 'none' } };
export const diToastNotificationStyles: IStackStyles = { root: { pointerEvents: 'all' } };

export const searchBoxStyles: IStackStyles = { root: { width: 300, backgroundColor: 'none' } };
