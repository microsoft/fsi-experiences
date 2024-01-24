import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants';
import { ICONS_CLASS_SUFFIX } from './TasksProgressOverviewList.const';
import { ITasksProgressOverviewListStyles } from './TasksProgressOverviewList.interface';

export const getClassNames = (styles?: ITasksProgressOverviewListStyles, themePrimary?: string) => {
    return mergeStyleSets(
        {
            list: {
                displayName: 'tasksProgressOverviewList',
                padding: 0,
                margin: 0,
                background: COLORS.white,
                border: `1px solid ${COLORS.lightGray}`,
                '& *': {
                    boxSizing: 'border-box',
                },
            },
            listItem: {
                displayName: 'tasksProgressOverviewListItem',
                paddingBlock: '10px 12px',
                paddingInline: '24px 22px',
                borderBlockEnd: 'inherit',
                '&:last-child': {
                    border: '0',
                },
                '.see-all-tasks-button': {
                    display: 'none',
                },
                ':hover': {
                    '.progress-bar-icon': {
                        display: 'none',
                    },
                    '.see-all-tasks-button': {
                        display: 'flex',
                        color: `${themePrimary}`,
                        background: 'none',
                        flexDirection: 'row',
                        fontSize: FontSizes.size12,
                    },
                },
            },
            contentContainer: {
                displayName: 'tasksProgressOverviewListContentContainer',
                display: 'grid',
                gridTemplateColumns: 'minmax(150px, 1fr) auto',
                gridTemplateRows: 'auto 1fr',
                alignItems: 'center',
                justifyItems: 'start',
            },
            listItemTitle: {
                displayName: 'tasksProgressOverviewListTitle',
                gridRow: '1',
                gridColumn: '1',
                maxWidth: '100%',
                margin: 0,
                marginBlockEnd: '2px',
                fontSize: FontSizes.size14,
                fontWeight: FontWeights.semibold,
                lineHeight: 20,
            },
            listItemText: {
                displayName: 'tasksProgressOverviewListText',
                gridRow: '2',
                gridColumn: '1',
                display: 'flex',
                maxWidth: '100%',
                fontSize: FontSizes.size12,
                lineHeight: 16,
                color: COLORS.lightGray130,
            },
            listItemIcon: {
                displayName: 'tasksProgressOverviewListIcon',
                gridRow: '1/-1',
                gridColumn: '2',
                fontSize: FontSizes.size16,
                color: COLORS.darkGray120,
                [`&[data-status=${ICONS_CLASS_SUFFIX.DONE}]`]: {
                    color: COLORS.successIcon,
                },
            },
        },
        styles
    );
};
