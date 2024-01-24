import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

// visually hidden, but visible for screen readers
export const hideElementStyles: ITextStyles = {
    root: {
        position: 'fixed',
        overflow: 'hidden',
        clip: 'rect(1px, 1px, 1px, 1px)',
        width: '1px',
        height: '1px',
        whiteSpace: 'nowrap',
    },
};

export const getCurrentTagStyle = (color, percent) => {
    return { root: { height: `8px`, background: color, flex: percent, transition: 'all 0.7s', minWidth: 10 } };

}

export const lineWrapperStyles = { root: { flex: 20 } };
