import React, { FC } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { TASK_VERIFICATION_SECTION_TESTID } from './TaskVerificationSection.const';
import { ITaskVerificationSection } from './TaskVerificationSection.interface';
import { getClassNames, taskStatusStyles } from './TaskVerificationSection.style';
import { ONBOARDING_APPLICATION_TASKS } from '../../constants/namespaces.const';
import TaskStatus from '../OnboardingApplicationTasks/TasksGroupList/Fields/TaskStatus';

export const TaskVerificationSection: FC<ITaskVerificationSection> = ({ task, styles: customStyles, processStage }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);

    const defaultStyles = getClassNames(customStyles);

    return task && (
        <section
            aria-label={translate('TASK_VERIFICATION_ARIA_LABEL_TEXT')}
            data-testid={TASK_VERIFICATION_SECTION_TESTID}
            className={defaultStyles.container as string}
        >
            <TaskStatus
                status={task.status}
                updateTaskStatus={task.updateStatus!}
                isDisabled={task.processStage ? task.processStage !== processStage : false}
                label={translate('VERIFICATION')}
                styles={{ ...taskStatusStyles, ...customStyles }}
            />
        </section>
    );
};

export default TaskVerificationSection;
