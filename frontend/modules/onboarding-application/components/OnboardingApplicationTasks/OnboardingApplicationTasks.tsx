import React, { FC, useEffect } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import TasksGroupSection from './TasksGroupSection/TasksGroupSection';
import { rootStyles, contentStyles } from './OnboardingApplicationTasks.style';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { TASKS_RESPONSIVE_CONTAINER } from '../../constants/OnboardingApplicationTasks.const';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { useOnboardingApplicationTasks } from '../../hooks/useOnboardingApplicationTasks';
import { IOnboardingApplicationTasksFetcher } from '../../interfaces/IOnboardingApplicationTasksFetcher';
import { ONBOARDING_APPLICATION_TASKS } from '../../constants/namespaces.const';
import { MessageBar } from '@fluentui/react/lib/components/MessageBar/MessageBar';
import { NotificationContainerWrapper } from '../NotificationContainerWrapper/NotificationContainerWrapper';

export interface IOnboardingApplicationTasksProps {
    fetcher: IOnboardingApplicationTasksFetcher;
    selectedTasksGroup?: string;
    onReadyTasks: () => void;
}

export const OnboardingApplicationTasks: FC<IOnboardingApplicationTasksProps> = ({ fetcher, selectedTasksGroup, onReadyTasks }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const { tasks, isError, isLoading, editTasksDisabled, showCanceledTasksMessage, hideCanceledTasksMessage, isFetched } =
        useOnboardingApplicationTasks({
            fetcher,
            shouldGetForms: false,
        });
    const isEmptyTasks = !tasks.length && !isError;
    useEffect(() => {
        if (isFetched) {
            onReadyTasks();
        }
    }, [isFetched, onReadyTasks]);

    return (
        <Stack horizontal horizontalAlign="start" styles={rootStyles} as="section">
            <Widget
                isLoading={isLoading}
                isError={isError}
                errorIconSize={200}
                styles={contentStyles}
                emptyProps={isEmptyTasks ? { title: translate('EMPTY_STATE_NO_TASKS'), icon: IMAGE_SRC.emptyState, iconSize: 200 } : undefined}
                name="customer-onboarding-tasks-widget"
            >
                {showCanceledTasksMessage && (
                    <MessageBar onDismiss={hideCanceledTasksMessage} data-testid="cancel-tasks-message" dismissButtonAriaLabel={translate('CLOSE')}>
                        {translate('CANCELED_TASKS_MESSAGE_INFO')}
                    </MessageBar>
                )}
                {tasks.map(({ group, tasks }) => (
                    <TasksGroupSection
                        key={group.name}
                        title={group.name}
                        tasks={tasks}
                        editTasksDisabled={editTasksDisabled}
                        selectedTasksGroup={selectedTasksGroup}
                    />
                ))}
            </Widget>
        </Stack>
    );
};

export const OnboardingApplicationTasksWrapper = props => (
    <ResponsiveContainer classPrefix={TASKS_RESPONSIVE_CONTAINER} style={{ position: 'relative' }}>
        <NotificationContainerWrapper>
            <OnboardingApplicationTasks {...props} />
        </NotificationContainerWrapper>
    </ResponsiveContainer>
);

export default OnboardingApplicationTasksWrapper;
