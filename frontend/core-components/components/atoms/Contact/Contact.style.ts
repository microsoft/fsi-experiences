import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { IContactStyles } from './Contact.interface';

export const getContactClassNames = (styles?: IContactStyles, clickable?: boolean) => {
    const containerStyles = {
        display: 'flex',
        lineHeight: '20px',
        alignItems: 'center',
        borderColor: 'transparent',
        paddingInline: 0,
        maxHeight: 20,
        '&:hover': clickable && {
            textDecoration: 'none',
            cursor: 'pointer',
        },
    };
    return mergeStyleSets(
        {
            container: containerStyles,
            containerButton: {
                ...containerStyles,
                borderColor: 'transparent',
                paddingInline: 0,
                maxHeight: 20,
            },
            icon: {
                display: 'flex',
                alignItems: 'center',
                lineHeight: '10px',
                fontSize: FontSizes.size14,
                width: 12,
                height: 10,
                color: NeutralColors.gray130,
                marginInlineEnd: '6px',
            },
            textWrapper: clickable && {
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
            text: {
                fontSize: FontSizes.size14,
                fontWeight: FontWeights.semibold,
                color: NeutralColors.gray140,
                marginInlineEnd: '4px',
            },
            role: {
                fontSize: FontSizes.size14,
                color: NeutralColors.gray130,
            },
        },
        styles
    );
};
