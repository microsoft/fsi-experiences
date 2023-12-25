import React, { FC } from 'react';
import EmptyState from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { TaskProgressOverviewData } from './TaskProgressOverviewData/TaskProgressOverviewData';
import type { ITaskProgressOverviewProps } from './TaskProgressOverview.interface';
import { TaskProgressOverviewLoaderStyles, TaskProgressOverviewStyles } from './TaskProgressOverview.style';
import { ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL } from '../../constants/namespaces.const';
import useOnboardingApplicationTasks from '../../hooks/useOnboardingApplicationTasks';

const loaderProps = { styles: TaskProgressOverviewLoaderStyles };

export const TaskProgressOverview: FC<ITaskProgressOverviewProps> = ({ fetcher }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL);
    const { isError, isLoading, tasks: taskProgressData } = useOnboardingApplicationTasks({ fetcher });
    const activeTaskProgressData = taskProgressData.filter(({ group }) => group.name !== translate('CANCELED_GROUP_NAME'));

    const showEmptyState = !activeTaskProgressData || !activeTaskProgressData.length;
    const mainTitle = translate('TASK_PROGRESS_OVERVIEW_SECTION_TITLE');

    return (
        <InfoSection
            mainTitle={mainTitle}
            isError={isError}
            isLoading={isLoading}
            loaderProps={loaderProps}
            sectionStyles={TaskProgressOverviewStyles}
        >
            {showEmptyState ? (
                <EmptyState
                    icon={IMAGE_SRC.emptyState100}
                    iconSize={100}
                    title={translate('TASK_PROGRESS_OVERVIEW_SECTION_EMPTY_STATE_TITLE')}
                    subtitle={translate('TASK_PROGRESS_OVERVIEW_SECTION_EMPTY_STATE_SUBTITLE')}
                />
            ) : (
                <TaskProgressOverviewData taskProgressData={activeTaskProgressData} />
            )}
        </InfoSection>
    );
};

export default TaskProgressOverview;
