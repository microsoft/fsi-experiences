import { prefixClassName } from '../../../constants/prefixClassNames';

export const baseClassName = `${prefixClassName}combobox`;
export const underlinedBaseClass = `${baseClassName}--underlined`;

export const comboboxBaseStyles = {
    // .ms-ComboBox-container
    container: {
        textAlign: 'start',
        [`&.${underlinedBaseClass} .ms-ComboBox::after`]: {
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderRadius: 0,
        },
        [`&.${underlinedBaseClass} &:focus::after`]: {
            borderWidth: 0,
            borderBottomWidth: '2px',
        },
    },
    optionsContainerWrapper: {
        width: '300px',
    },
    // .ms-ComboBox
    root: {
        width: '300px',
        height: '32px',

        '&.is-disabled': {
            pointerEvents: 'none',
        },
        '&.is-disabled::after': {
            border: 0,
        },
        '&.is-disabled:focus::after': {
            border: 0,
        },
        '& [id*=error][aria-live]': {
            position: 'absolute',
        },
    },
    label: {
        lineHeight: '20px',
    },
};
