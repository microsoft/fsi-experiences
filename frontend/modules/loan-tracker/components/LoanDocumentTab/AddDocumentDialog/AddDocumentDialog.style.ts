import { IDropdownStyles } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';

export const topDropdownStyles = {
    root: {
        marginBottom: '0.5rem',
    },
};

export const addButtonStyles = {
    root: {
        minWidth: 67,
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
};

export const dropdownTopStyles = mergeStyleSets(dropdownStyles, topDropdownStyles);
