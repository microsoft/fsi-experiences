import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { CommunicationColors, FontSizes, FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';

export const personaStyles = {
    root: {
        width: 222,
        '.ms-Persona-imageArea': {
            width: 32,
            height: 32,
            '.ms-Persona-initials': {
                height: 32,
                width: 32,
                fontSize: FontSizes.size14,
                lineHeight: FontSizes.size20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
    },
};

export const rootStyles = (isSelected: boolean, themeMainColor: string): IStackStyles => ({
    root: {
        cursor: 'pointer',
        padding: '9px 14px',
        boxSizing: 'border-box',
        display: 'flex',
        background: isSelected ? CommunicationColors.tint40 : 'initial',
        borderBottom: `1px solid ${NeutralColors.gray40}`,
        selectors: {
            '&:hover': { background: NeutralColors.gray10 },
        },
        borderLeft: isSelected ? `4px solid ${themeMainColor}` : '4px solid transparent',
        '.ms-Persona-primaryText': {
            fontWeight: isSelected ? FontWeights.semibold : FontWeights.regular,
        },
    },
});

export const removeApplicantStackStyles = {
    root: {
        width: '100%',
        paddingInlineStart: 15,
    },
};
