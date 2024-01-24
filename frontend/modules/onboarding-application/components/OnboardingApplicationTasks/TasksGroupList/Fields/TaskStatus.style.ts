import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { TaskStatus } from '../../../../constants/Fields.const';
import { COLUMN_MAX_WIDTH } from '../TasksGroupList.const';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

export const optionStyles = {
    root: {
        maxWidth: COLUMN_MAX_WIDTH,
    },
};

export const contactIconStyles = {
    root: {
        paddingInlineEnd: 0,
        color: COLORS.darkGray,
        background: 'transparent',
        height: 10,
        '.ms-Icon': {
            fontSize: FontSizes.size10,
        },
        pointerEvents: 'none',
        marginInlineStart: '-12px',
    },
};

const pendingStatusStyle = {
    borderColor: COLORS.separatorLineGrayColor,
    backgroundColor: COLORS.white,
    color: COLORS.lightGray38,
    maxWidth: COLUMN_MAX_WIDTH,
};

const doneStatusStyle = {
    borderColor: COLORS.midGreen,
    backgroundColor: COLORS.lightGreen,
    color: COLORS.darkGreen,
    maxWidth: COLUMN_MAX_WIDTH,
};

const canceledStatusStyle = {
    borderColor: COLORS.lightGray40,
    backgroundColor: COLORS.lighterGray,
    color: COLORS.lightGray38,
    maxWidth: COLUMN_MAX_WIDTH,
};

export const statusStylesMapper = {
    [TaskStatus.Pending]: pendingStatusStyle,
    [TaskStatus.Done]: doneStatusStyle,
    [TaskStatus.Canceled]: canceledStatusStyle,
};

export const dropdownStyles = ({ status, disabled, styles }) => {
    const statusStyles = statusStylesMapper[status] || statusStylesMapper[TaskStatus.Pending];

    return mergeStyleSets(
        {
            dropdown: {
                borderColor: 'transparent',
                height: 20,
                width: 'fit-content',
                '&.ms-Dropdown.is-disabled > .ms-Dropdown-title': { border: `1px solid ${statusStyles.borderColor}` },
            },
            title: {
                fontSize: FontSizes.size12,
                height: 20,
                paddingBlock: 1,
                paddingInline: disabled ? '8px' : '8px 26px',
                lineHeight: 16,
                '&.ms-Dropdown-title:hover': {
                    borderColor: statusStyles.borderColor,
                },
                '&.ms-Dropdown-title:focus': {
                    borderColor: statusStyles.borderColor,
                },
                ...statusStyles,
                borderRadius: 4,
            },
            dropdownItemSelected: {
                fontSize: FontSizes.size12,
            },
            dropdownItem: {
                fontSize: FontSizes.size12,
            },
            caretDownWrapper: {
                lineHeight: 18,
                display: disabled ? 'none' : 'inline-block',
                paddingBlockStart: 1,
            },
            callout: {
                minWidth: 'fit-content',
                '.ms-Callout-main': {
                    width: '100%',
                    maxWidth: COLUMN_MAX_WIDTH,
                },
            },
            caretDown: {
                color: statusStyles.color,
                fontSize: FontSizes.size10,
            },
            root: {
                display: 'flex',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: 8,
                minWidth: 0,
                label: {
                    minWidth: 0,
                    padding: 0,
                    fontWeight: FontWeights.regular,
                    fontSize: FontSizes.size12,
                    color: COLORS.lightGray130,
                    ':has(> :only-child:empty)': {
                        display: 'none',
                    },
                },
            },
        },
        styles
    );
};
