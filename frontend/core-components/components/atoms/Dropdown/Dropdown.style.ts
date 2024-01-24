import { prefixClassName } from '../../../constants/prefixClassNames';
import { getClassNameStyleSets } from '../../../utilities/GetClassNameStyleSets';

export const baseClassName = `${prefixClassName}dropdown`;
export const underlinedBaseClass = `${baseClassName}--underlined`;

export const errorMessageStyles = {
    /* prevents error message (which is created on the fly) from pushing elements below it */
    '& [class*=errorMessage]': {
        position: 'absolute',
    },
};

export const dropdownBaseStyles = {
    root: {
        textAlign: 'start',
    },
    dropdown: {
        width: 'auto',
        maxWidth: '100%',
        height: '32px',
        '&.is-disabled': {
            pointerEvents: 'none',
        },
        '&.is-disabled:focus::after': {
            border: 0,
        },
        [`.${underlinedBaseClass} &:focus::after`]: {
            borderWidth: 0,
            borderBottomWidth: '0.125rem',
        },
    },
    title: {
        [`.${underlinedBaseClass} &`]: {
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderRadius: 0,
        },
        '.is-disabled &': {
            border: 0,
        },
    },
    label: {
        lineHeight: '20px',
    },
};

export function getClassNames(customClassNames?: string, isUnderlined?: boolean): { [key: string]: any } {
    const underlinedClass = isUnderlined ? underlinedBaseClass : undefined;

    return getClassNameStyleSets({
        baseClassName,
        styles: errorMessageStyles,
        customClassNames,
        underlinedClass,
    });
}
