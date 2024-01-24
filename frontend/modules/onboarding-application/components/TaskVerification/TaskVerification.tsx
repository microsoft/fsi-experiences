import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React, { FC, useMemo } from 'react';
import { ASSOCIATION_TYPE } from '../../constants/OnboardingApplicationTasks.const';
import { ONBOARDING_APPLICATION_TASKS } from '../../constants/namespaces.const';
import { useTaskVerificationData } from '../../hooks/useTaskVerificationData';
import { IVerificationTask } from '../../interfaces/IVerificationTask.interface';
import { NotificationContainerWrapper } from '../NotificationContainerWrapper/NotificationContainerWrapper';
import { TaskVerificationSection } from '../TaskVerificationSection';
import { TASK_VERIFICATION_TESTID, emptyDefaultProps, errorDefaultProps } from './TaskVerification.const';
import { ITaskVerificationProps } from './TaskVerification.interface';
import { widgetStyles } from './TaskVerification.style';

export const TaskVerification: FC<ITaskVerificationProps> = ({ taskDefinitionId, applicationId, fetcher }) => {
    const {
        data: task,
        isLoading,
        isError,
        isConfigurationError,
        processStage,
    } = useTaskVerificationData({ applicationId, taskDefinitionId, fetcher, level: ASSOCIATION_TYPE.Application });
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);

    const emptyProps = useMemo(
        () =>
            !task?.id && !isError && !isLoading
                ? { title: translate('EMPTY_STATE_NO_TASK_ITEM'), icon: IMAGE_SRC.emptyState48, ...emptyDefaultProps }
                : undefined,
        [task, isError, isLoading, translate]
    );

    const errorProps = useMemo(() => {
        const configurationErrorProps = isConfigurationError ? { title: translate('INVALID_CONFIGURATION') } : undefined;
        return { ...errorDefaultProps, ...configurationErrorProps };
    }, [isConfigurationError, translate]);

    return (
        <Widget
            isLoading={isLoading}
            isError={isError}
            emptyProps={emptyProps}
            errorProps={errorProps}
            styles={widgetStyles}
            name={TASK_VERIFICATION_TESTID}
        >
            <TaskVerificationSection task={task as IVerificationTask} processStage={processStage} />
        </Widget>
    );
};

export const TaskVerificationWrapper = props => (
    <NotificationContainerWrapper>
        <TaskVerification {...props} />
    </NotificationContainerWrapper>
);

export default TaskVerificationWrapper;
