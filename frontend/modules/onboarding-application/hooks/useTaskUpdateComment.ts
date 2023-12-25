import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';
import { NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService/NotificationService.const';
import { useMutation, useQueryClient } from 'react-query';
import { ONBOARDING_APPLICATION_TASKS } from '../constants/namespaces.const';

type IUpdateTaskCommentProps = {
    comment: string;
    taskId: string;
};

export function useTaskUpdateComment({ fetcher, queryName, postMessage }) {
    const queryClient = useQueryClient();
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const { show } = useNotificationService();
    const { mutate } = useMutation({
        mutationFn: async ({ comment, taskId }: IUpdateTaskCommentProps) => {
            await fetcher.updateTaskComment(comment, taskId);
        },
        onMutate: async (updatedTask: IUpdateTaskCommentProps) => {
            const previousTasks: any = queryClient.getQueryData([queryName]);
            const updatedTasks = previousTasks?.map(task => (task.id === updatedTask.taskId ? { ...task, comment: updatedTask.comment } : task));
            queryClient.setQueryData([queryName], updatedTasks);
            return { previousTasks, updatedTask };
        },
        onSuccess: taskId => {
            postMessage({ message: taskId });
        },
        onError: () => {
            show({
                message: translate('FAILED_SAVE_COMMENT'),
                type: NOTIFICATION_TYPES.ERROR,
            });
        },
    });

    return {
        updateTaskComment: mutate,
    };
}
