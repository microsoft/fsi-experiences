import { IOnboardingApplicationTasksFetcher } from '../interfaces/IOnboardingApplicationTasksFetcher';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { TaskStatus } from '../constants/Fields.const';
import { CONFIGURATION_ERROR } from '../constants/TaskVerification.const';
import { useBPF } from './useBPF';
import { useCancelTasksDisplay } from './useCancelTasksDisplay';
import { TaskAssociationType } from '../constants/OnboardingApplicationTasks.const';
import { IVerificationTask } from '../interfaces/IVerificationTask.interface';
import { useTaskUpdateStatus } from './useTaskUpdateStatus';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ONBOARDING_APPLICATION_TASKS } from '../constants/namespaces.const';
import { formatWithAssociateName } from '../helpers/formatWithAssociateName';

type UseTaskVerificationDataProps = {
    applicationId: string;
    taskDefinitionId: string;
    fetcher: IOnboardingApplicationTasksFetcher;
    level?: TaskAssociationType;
};

export const useTaskVerificationData = ({ applicationId, taskDefinitionId, fetcher, level }: UseTaskVerificationDataProps) => {
    const shouldGetCanceledTasks = useCancelTasksDisplay({ fetcher });
    const queryID = `${applicationId}-TaskVerification`;
    const {
        data: task,
        isLoading,
        refetch,
        isError,
        error,
    } = useQuery(queryID, () => fetcher.fetchTaskByTaskDefinitionId({ applicationId, taskDefinitionId, level }), {
        enabled: !!taskDefinitionId,
    });
    const { bpfStage } = useBPF({ fetcher });
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const { messages, postMessage } = useBrowserCommunication('tasks-refetch');

    useEffect(() => {
        if (messages.length) {
            refetch();
        }
    }, [messages, refetch]);

    const { updateTaskStatus } = useTaskUpdateStatus({ fetcher, postMessage });

    const taskWithMethods = useMemo(() => {
        if (!taskDefinitionId || isLoading || (!shouldGetCanceledTasks && task?.status === TaskStatus.Canceled)) {
            return {};
        }

        if (task) {
            return {
                ...(task as IVerificationTask),
                updateStatus: (status, state) =>
                    updateTaskStatus({
                        updatedStatus: status,
                        updatedState: state,
                        taskId: task?.id || '',
                        taskName: `${translate('VERIFICATION')} - ${formatWithAssociateName(task.name, task.regarding)}`,
                    }),
            };
        }

        return task;
    }, [taskDefinitionId, isLoading, task, updateTaskStatus, shouldGetCanceledTasks, translate]) as IVerificationTask;

    if ((error as Error)?.message === CONFIGURATION_ERROR) {
        return { isLoading: false, isError, isConfigurationError: true };
    }

    if (!taskDefinitionId) {
        return { isLoading: false, isError };
    }

    return { data: taskWithMethods, isLoading: isLoading, isError, processStage: bpfStage };
};
