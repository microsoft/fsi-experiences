import { IChoiceGroupStyles } from '@fluentui/react/lib/components/ChoiceGroup/ChoiceGroup.types';

export const choiceGroupStyles: IChoiceGroupStyles = {
    root: {
        display: 'flex',
        flex: 1,
        'div[role=radiogroup]': {
            display: 'flex',
            flex: 1,
        },
    },

    flexContainer: {
        display: 'flex',
        flex: 1,
        '.ms-ChoiceField': {
            marginBlockStart: 0,
            ':first-child': {
                marginInlineEnd: 12,
            },
        },
        '.ms-ChoiceFieldLabel': {
            whiteSpace: 'nowrap',
        },
    },
};
