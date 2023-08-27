import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC, useMemo } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { ICONS_CLASS_SUFFIX, ICON_NAMES, TASKS_PROGRESS_OVERVIEW_LIST_TEST_ID } from './TasksProgressOverviewList.const';
import { ITasksProgressOverviewListItemProps, ITasksProgressOverviewListProps } from './TasksProgressOverviewList.interface';
import { getClassNames, textOverflowStyles, wrapperSeeAllTasks } from './TasksProgressOverviewList.style';
import { ONBOARDING_APPLICATION_TASKS, ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL } from '../../../constants/namespaces.const';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks/lib/useId';

const getIconStatus = ({ completed, total }: { completed: number; total: number }) => {
    if (completed === total) return ICONS_CLASS_SUFFIX.DONE;

    if (completed === 0) return ICONS_CLASS_SUFFIX.NEW;

    return ICONS_CLASS_SUFFIX.NOT_COMPLETE;
};

const TasksProgressOverviewListItem: FC<ITasksProgressOverviewListItemProps> = ({ title, text, srText, iconName, iconStatus, styles }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL);

    const { postMessage: postRedirectTabMessage } = useBrowserCommunication('open-tab-channel');
    const srLabelTextID = useId('SR-TaskProgressOverviewList');

    const onClick = () => {
        postRedirectTabMessage({
            tabName: 'tab_tasks',
            fieldName: 'msfsi_selectedtasksgroupplaceholder',
            fieldValue: title,
        });
    };

    return (
        <Stack as="li" role="listitem" className={styles.listItem as string}>
            <Stack className={styles.contentContainer as string}>
                <Stack as="h3" className={styles.listItemTitle as string}>
                    <OverflowText text={title} overflowModeSelf />
                </Stack>
                {srText}
                <span className={styles.listItemText as string} aria-hidden="true">
                    <OverflowText text={text} overflowModeSelf />
                </span>
                <FontIcon
                    iconName={iconName}
                    className={`progress-bar-icon ${styles.listItemIcon as string}`}
                    data-status={iconStatus}
                    aria-hidden="true"
                />
                <DefaultButton className={`see-all-tasks-button ${styles.listItemIcon as string}`} styles={wrapperSeeAllTasks} onClick={onClick}>
                    <OverflowText text={translate('SEE_ALL_TASKS')} styles={textOverflowStyles} overflowModeSelf />
                    <ScreenReaderText id={srLabelTextID}>{`${title}`}</ScreenReaderText>
                    <FontIcon iconName={ICONS_CLASS_SUFFIX.NEXT} data-status={iconStatus} aria-hidden="true" />
                </DefaultButton>
            </Stack>
        </Stack>
    );
};

export const TasksProgressOverviewList: FC<ITasksProgressOverviewListProps> = ({ taskGroups, styles: externalStyles }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);

    const {
        palette: { themePrimary },
    } = useTheme();
    const styles = getClassNames(externalStyles, themePrimary);

    const tasksItems = useMemo(() => {
        return taskGroups?.map((task, i) => {
            const iconStatus = getIconStatus({ completed: task.completed, total: task.total });
            return (
                <TasksProgressOverviewListItem
                    title={task.name}
                    srText={
                        <ScreenReaderText id={`SR${i}-${task.name}`}>
                            {translate('NUMBER_OF_COMPLETED_TASKS_ARIA_TEXT', {
                                numberOfCompletedTasks: task.completed,
                                totalTasks: task.total,
                            })}
                        </ScreenReaderText>
                    }
                    text={translate('NUMBER_OF_COMPLETED_TASKS', { numberOfCompletedTasks: task.completed, totalTasks: task.total })}
                    iconName={ICON_NAMES[iconStatus]}
                    iconStatus={iconStatus}
                    styles={styles}
                    key={task.name}
                />
            );
        });
    }, [taskGroups, styles]);

    if (!tasksItems || !tasksItems.length) {
        return null;
    }

    return (
        <Stack
            as="ul"
            role="list"
            aria-label={translate('TASKS_PROGRESS_OVERVIEW_LIST_ARIA_LABEL')}
            className={styles.list}
            data-testid={TASKS_PROGRESS_OVERVIEW_LIST_TEST_ID}
            styles={{ root: { height: '100%' } }}
        >
            {tasksItems}
        </Stack>
    );
};

export default TasksProgressOverviewList;
