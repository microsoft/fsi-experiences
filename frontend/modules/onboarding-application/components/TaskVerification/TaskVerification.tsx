import React, { FC, useMemo } from 'react';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { IErrorStateProps } from '@fsi/core-components/dist/components/containers/ErrorState';
import { emptyStateStyles, errorStateStyles, widgetStyles } from './TaskVerification.style';
import { useTaskVerificationData } from '../../hooks/useTaskVerificationData';
import { ONBOARDING_APPLICATION_TASKS } from '../../constants/namespaces.const';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { TASK_VERIFICATION_TESTID } from './TaskVerification.const';
import { ITaskVerificationProps } from './TaskVerification.interface';
import { ASSOCIATION_TYPE } from '../../constants/OnboardingApplicationTasks.const';
import { IVerificationTask } from '../../interfaces/IVerificationTask.interface';
import { TaskVerificationSection } from '../TaskVerificationSection';
import { NotificationContainerWrapper } from '../NotificationContainerWrapper/NotificationContainerWrapper';

const errorDefaultProps: IErrorStateProps = {
    iconSize: 48,
    styles: errorStateStyles,
};

const emptyDefaultProps = {
    iconSize: 48,
    styles: emptyStateStyles,
};

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
