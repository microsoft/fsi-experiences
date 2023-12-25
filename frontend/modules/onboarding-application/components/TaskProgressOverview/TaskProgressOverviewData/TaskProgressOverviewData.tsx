import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC, useMemo } from 'react';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import { Progressbar } from '@fsi/core-components/dist/components/atoms/Progressbar/Progressbar';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ITaskProgressOverviewDataProps } from '../../../interfaces/ITaskProgressOverviewData.interface';
import { useId } from '@fluentui/react-hooks';
import {
    TaskProgressOverviewDataAsideTextWrapperStyle,
    TaskProgressOverviewDataListStyles,
    TaskProgressOverviewDataProgressbarIndicatorStyles,
    TaskProgressOverviewDataProgressbarStyles,
} from './TaskProgressOverviewData.style';
import { TaskStatus } from '../../../constants/Fields.const';
import { ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL } from '../../../constants/namespaces.const';
import { TasksProgressOverviewList } from '../TasksProgressOverviewList';
import { Text } from '@fluentui/react/lib/Text';

export const TaskProgressOverviewData: FC<ITaskProgressOverviewDataProps> = ({ taskProgressData }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL);
    const srLabelTextID = useId('SR-TaskProgressOverviewDataProgressbarLabel');

    const tasksData = useMemo(() => {
        let totalTasks = 0;
        let totalCompletedTasks = 0;

        const taskGroups = taskProgressData.map(({ group, tasks }) => {
            const completedTasks = tasks.filter(task => task.status === TaskStatus.Done).length;
            totalCompletedTasks += completedTasks;
            totalTasks += tasks.length;

            return {
                name: group.name,
                completed: completedTasks,
                total: tasks.length,
            };
        });

        const totalCompleted = Math.round((totalCompletedTasks * 100) / totalTasks);

        return { totalCompleted, taskGroups };
    }, [taskProgressData]);

    const percentsCompletedText = translate('PERCENTS_COMPLETED', { percents: tasksData.totalCompleted.toString() });

    const description = useMemo(() => {
        return translate(
            tasksData.totalCompleted === 100
                ? 'TASK_PROGRESS_OVERVIEW_PROGRESS_BAR_DESCRIPTION_COMPLETED'
                : 'TASK_PROGRESS_OVERVIEW_PROGRESS_BAR_DESCRIPTION'
        );
    }, [tasksData, translate]);

    return (
        <Stack data-testid="task-progress-overview-data">
            <Progressbar
                percentComplete={tasksData.totalCompleted}
                label={<ScreenReaderText id={srLabelTextID}>{translate('COMPLETED_TASKS')}</ScreenReaderText>}
                description={<Text>{description}</Text>}
                asideText={
                    <div aria-hidden="true" style={TaskProgressOverviewDataAsideTextWrapperStyle}>
                        <OverflowText text={percentsCompletedText} overflowModeSelf />
                    </div>
                }
                indicatorProps={{ ariaValueText: percentsCompletedText, styles: TaskProgressOverviewDataProgressbarIndicatorStyles }}
                styles={TaskProgressOverviewDataProgressbarStyles}
            />
            <TasksProgressOverviewList taskGroups={tasksData.taskGroups} styles={TaskProgressOverviewDataListStyles} />
        </Stack>
    );
};

export default TaskProgressOverviewData;
