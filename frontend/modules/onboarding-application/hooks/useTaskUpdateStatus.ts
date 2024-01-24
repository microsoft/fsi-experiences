import { useMutation, useQueryClient } from 'react-query';
import { TaskStateType, TaskStatusType, TaskStatus } from '../constants/Fields.const';
import { ONBOARDING_APPLICATION_TASKS } from '../constants/namespaces.const';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';
import { NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IOnboardingApplicationTasksFetcher } from '../interfaces/IOnboardingApplicationTasksFetcher';

export type IUpdateTaskStatusProps = {
    updatedStatus: TaskStatusType;
    updatedState: TaskStateType;
    taskName: string;
    taskId: string;
};

export type UpdateTaskProps = {
    fetcher: IOnboardingApplicationTasksFetcher;
    queryName?: string;
    postMessage: (message: any) => void;
};

export const getToastMessage = (status: TaskStatusType) => (status === TaskStatus.Done ? 'TOAST_TASK_COMPLETED' : 'TOAST_TASK_UPDATED');
export const getToastIcon = (status: TaskStatusType) => (status === TaskStatus.Done ? NOTIFICATION_TYPES.SUCCESS : NOTIFICATION_TYPES.INFO);

export function useTaskUpdateStatus({ fetcher, queryName, postMessage }: UpdateTaskProps) {
    const queryClient = useQueryClient();
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const { show } = useNotificationService();
    const { mutate } = useMutation({
        mutationFn: async ({ updatedStatus, updatedState, taskId }: IUpdateTaskStatusProps) => {
            await fetcher.updateTaskStatus(updatedStatus, updatedState, taskId);
        },
        onSuccess(_, { taskId, taskName, updatedStatus }) {
            postMessage({ message: taskId });
            show({
                message: translate(getToastMessage(updatedStatus), { taskName }),
                type: getToastIcon(updatedStatus),
            });
        },
        onError(_, { taskName }) {
            show({
                message: translate('TOAST_TASK_UPDATE_ERROR', { taskName }),
                type: NOTIFICATION_TYPES.ERROR,
            });
        },
        onMutate: (updatedTask: IUpdateTaskStatusProps) => {
            if (!queryName) return;

            const previousData = queryClient.getQueryData(queryName);

            if (Array.isArray(previousData)) {
                queryClient.setQueryData(
                    queryName,
                    previousData.map(task =>
                        task.id === updatedTask.taskId
                            ? {
                                  ...task,
                                  status: updatedTask.updatedStatus,
                                  state: updatedTask.updatedState,
                              }
                            : task
                    )
                );
            } else if (previousData) {
                queryClient.setQueryData(queryName, {
                    ...((previousData as Object) || {}),
                    status: updatedTask.updatedStatus,
                    state: updatedTask.updatedState,
                });
            }

            return { previousData, updatedTask };
        },
    });

    return {
        updateTaskStatus: mutate,
    };
}
