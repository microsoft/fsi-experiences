import React, { FC } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ONBOARDING_APPLICATION_TASKS } from '../../../../constants/namespaces.const';
import { IRelatedParty, ITask } from '../../../../interfaces/ITask';
import TaskStatus from './TaskStatus';
import { ITaskDefinitionBasicFields, useTaskDefinitionDetails } from '../../../../hooks/useTaskDefinitionDetails';

interface ITaskStatusFieldProps {
    item: ITask;
    isDisabled?: boolean;
}

export const TaskStatusField: FC<ITaskStatusFieldProps> = ({ item, isDisabled }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const getTaskDefinitionDetails = useTaskDefinitionDetails(ONBOARDING_APPLICATION_TASKS);
    const { taskName, parentheticalAssociatedName } = getTaskDefinitionDetails({
        taskDefinition: item.taskDefinition as any as ITaskDefinitionBasicFields,
        applicant: item.relatedParty as IRelatedParty,
    });

    return (
        <TaskStatus
            status={item.status}
            updateTaskStatus={item.updateStatus}
            isDisabled={isDisabled}
            ariaLabel={translate('TASK_STATUS_FIELD_ARIA_LABEL', { taskName, associatedName: parentheticalAssociatedName })}
        />
    );
};

export default TaskStatusField;
