import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IQueueListStyles } from './QueueList.interface';
import { QUEUE_LIST_CLASS_PREFIX } from './QueueList.const';

export const ScrollableListStyles: any = {
    root: {
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 'inherit',
        maxHeight: 'inherit',
        '@media screen and (max-width: 31.25rem)': {
            minHeight: '160px',
        },
    },
    contentContainer: {
        overflowX: 'hidden',
    },
};

export const QueueListGroupHeaderStyles = {
    root: {
        height: '32px',
        borderBottom: `1px solid ${NeutralColors.gray40}`,
    },
    title: {
        fontSize: FontSizes.size14,
    },
    expand: {
        height: '20px',
        width: '20px',
        marginLeft: '16px',
    },
    groupHeaderContainer: {
        height: '32px',
        backgroundColor: NeutralColors.gray20,
        borderBlockEnd: `1px solid ${COLORS.lightGray}`,
        fontWeight: FontWeights.regular,
    },
    dropIcon: {
        display: 'none',
    },
};

export const getClassNames = (customStyles?: IQueueListStyles): IQueueListStyles => {
    return mergeStyleSets(
        {
            queueListWrapper: {
                displayName: `${QUEUE_LIST_CLASS_PREFIX}__wrapper`,
                boxSizing: 'border-box',
                minHeight: 300,
                height: '100%',
                background: NeutralColors.white,
                '& *': {
                    boxSizing: 'border-box',
                },
                isolation: 'isolate', // creates new stacking context, prevents items, from outside, from interfering with sticky group headers
            },
            queueList: {
                displayName: QUEUE_LIST_CLASS_PREFIX,
                // A11y bug fix for <GroupedList> with empty group (https://dev.azure.com/dynamicscrm/Solutions/_workitems/edit/3122801/)
                '& > [role="treegrid"] .ms-List[aria-label]:not([role])': {
                    display: 'none',
                },
            },
            queueListGroupHeader: {
                displayName: `${QUEUE_LIST_CLASS_PREFIX}__group-header`,
                display: 'flex',
                minWidth: 0,
                width: '100%',
                paddingInlineEnd: '5px',
                fontWeight: FontWeights.semibold,
                fontSize: FontSizes.size14,
                color: NeutralColors.gray160,
            },
            queueListGroupHeaderPrimaryText: {
                displayName: `${QUEUE_LIST_CLASS_PREFIX}__group-header-primary-text`,
                minWidth: 0,
                paddingInlineStart: '11px',
            },
            queueListGroupHeaderSecondaryText: {
                displayName: `${QUEUE_LIST_CLASS_PREFIX}__group-header-secondary-text`,
                alignSelf: 'center',
                minWidth: 0,
                marginInlineStart: 'auto',
                fontSize: FontSizes.size12,
            },
        },
        customStyles
    );
};
