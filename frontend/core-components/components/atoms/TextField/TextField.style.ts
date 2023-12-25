import { prefixClassName } from '../../../constants/prefixClassNames';
export const baseClassName = `${prefixClassName}textfield`;

export const textFieldBaseStyles = {
    root: {
        width: 'auto',
        maxWidth: '100%',
        '&.ms-TextField--underlined .ms-TextField-wrapper': {
            flexDirection: 'column',
        },
    },
    subComponentStyles: {
        label: {
            root: {
                height: '30px' /* ~30px */,
                margin: 0,
                paddingLeft: 0,
                lineHeight: '20px' /* ~20px */,
                textAlign: 'start',
            },
        },
    },
    field: {
        width: '100%',
        height: '32px' /* ~32px */,
        padding: '5px 12px',
    },
    fieldGroup: {
        /*Otherwise border-bottom (in high-contrast mode) is hidden*/
        height: '34px',
    },
};

export const defaultErrorStyles = {
    // prevents error message (which is created on the fly) from pushing elements below it
    '& .ms-TextField-errorMessage': {
        position: 'absolute',
    },
};
