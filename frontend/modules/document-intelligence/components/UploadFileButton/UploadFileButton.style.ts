import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const uploadButtonStyles: IButtonStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: 600,
        lineHeight: 20,
        height: 32,
        padding: 0,
        margin: 0,
        color: COLORS.darkGray160,
    },
    label: {
        margin: 0,
    },
};

export const getUploadButtonStyle = (themePrimary: string, missingFile: boolean, styles?: IButtonStyles): IButtonStyles => {
    if (missingFile) {
        return mergeStyleSets(uploadButtonStyles, {
            root: {
                background: COLORS.lightGray10,
                border: '1px solid #D1D1D1',
                borderRadius: 4,
                paddingBlock: '6px',
                paddingInline: '12px',
            },
            rootHovered: {
                background: COLORS.lighterGray,
                color: COLORS.darkGray160,
            },
        });
    }
    return mergeStyleSets(
        uploadButtonStyles,
        {
            root: {
                color: themePrimary,
                textAlign: 'start',
            },
            rootHovered: {
                textDecoration: 'underline',
            },
        },
        styles
    );
};
