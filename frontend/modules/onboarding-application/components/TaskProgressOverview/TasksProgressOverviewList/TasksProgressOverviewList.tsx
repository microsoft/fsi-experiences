import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React, { FC, useMemo } from 'react';
import { ONBOARDING_APPLICATION_TASKS } from '../../../constants/namespaces.const';
import { ICON_NAMES, TASKS_PROGRESS_OVERVIEW_LIST_TEST_ID } from './TasksProgressOverviewList.const';
import { ITasksProgressOverviewListProps } from './TasksProgressOverviewList.interface';
import { getClassNames } from './TasksProgressOverviewList.style';
import { TasksProgressOverviewListItem } from '../TaskProgressOverviewListItem';
import { getIconStatus } from '../../../helpers/getIconStatus';

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
