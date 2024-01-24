import React, { FC, useEffect, useMemo, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { Text } from '@fluentui/react/lib/Text';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import {
    headerRowStyles,
    iconButtonStyle,
    sectionTitleStye,
    sectionSubTitleStye,
    sectionStyles,
    completedTasksIconStyle,
    completedTasksStatusStyles,
    titleStyles,
} from './TasksGroupSection.style';
import TasksGroupList from '../TasksGroupList/TasksGroupList';
import { TaskStatus } from '../../../constants/Fields.const';
import TasksGroupCollapse from '../TasksGroupList/TasksGroupCollapse/TasksGroupCollapse';
import { ONBOARDING_APPLICATION_TASKS } from '../../../constants/namespaces.const';
import { ITask } from '../../../interfaces/ITask';

export interface ITasksGroupSectionProps {
    title: string;
    tasks: ITask[];
    editTasksDisabled?: boolean;
    selectedTasksGroup?: string;
}

export const TasksGroupSection: FC<ITasksGroupSectionProps> = ({ title, tasks, editTasksDisabled, selectedTasksGroup }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);

    const completedTasks = useMemo(() => tasks.filter(task => task.status === TaskStatus.Done), [tasks]);
    const isCanceledSection = tasks[0].status === TaskStatus.Canceled;
    const selectedTasksGroupOpen = !isCanceledSection && (!selectedTasksGroup || selectedTasksGroup === title);

    const [isOpen, setIsOpen] = useState(selectedTasksGroupOpen);

    useEffect(() => {
        if (selectedTasksGroup !== null) {
            setIsOpen(selectedTasksGroupOpen);
        }
    }, [selectedTasksGroup, selectedTasksGroupOpen, title]);

    return (
        <Stack styles={sectionStyles}>
            <TasksGroupCollapse
                iconButtonStyles={iconButtonStyle}
                styles={headerRowStyles}
                onToggleIsOpen={isOpen => {
                    setIsOpen(isOpen);
                }}
                isOpen={isOpen}
                content={
                    <Stack styles={titleStyles}>
                        <Text styles={sectionTitleStye} data-testid="section-header">
                            {title}
                        </Text>
                        {!isCanceledSection && (
                            <Stack styles={completedTasksStatusStyles}>
                                <Text styles={sectionSubTitleStye} data-testid="section-sub-header">
                                    {translate('NUMBER_OF_COMPLETED_TASKS', {
                                        numberOfCompletedTasks: completedTasks.length,
                                        totalTasks: tasks.length,
                                    })}
                                </Text>
                                {completedTasks.length === tasks.length && (
                                    <Icon styles={completedTasksIconStyle} iconName="Accept" aria-hidden="true" />
                                )}
                            </Stack>
                        )}
                    </Stack>
                }
            >
                <TasksGroupList tasks={tasks} editTasksDisabled={editTasksDisabled} />
            </TasksGroupCollapse>
        </Stack>
    );
};

export default TasksGroupSection;
