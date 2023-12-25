import { IComboBoxStyles } from '@fluentui/react/lib/components/ComboBox/ComboBox.types';
import { IDropdownStyles } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { FontWeights } from '@fluentui/react/lib/Styling';

export const topDropdownStyles = {
    root: {
        paddingBlockEnd: 24,
    },
};

export const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
        b: {
            fontWeight: FontWeights.semibold,
        },
    },
    dropdownItemSelected: {
        b: {
            fontWeight: FontWeights.semibold,
        },
    },
    dropdownItem: {
        b: {
            fontWeight: FontWeights.semibold,
        },
    },
    label: {
        paddingBlockEnd: 12,
        paddingBlockStart: 0,
    },
};

export const comboBoxStyles: Partial<IComboBoxStyles> = {
    container: {
        paddingBlockEnd: 24,
    },
    root: {
        b: {
            fontWeight: FontWeights.semibold,
        },
    },
    optionsContainerWrapper: {
        b: {
            fontWeight: FontWeights.semibold,
        },
    },
    input: {
        b: {
            fontWeight: FontWeights.semibold,
        },
    },
    label: {
        paddingBlockEnd: 12,
        paddingBlockStart: 0,
    },
};

export const descriptionStyle = {
    root: {
        paddingBlockEnd: 12,
        paddingBlockStart: 0,
    },
};

export const dialogStyle = { root: { padding: 24 } };
