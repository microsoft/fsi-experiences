import { IRelatedParty } from './../interfaces/ITask';
import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import { CanceledGroupOrder, FETCH_TASKS_QUERY } from '../constants/OnboardingApplicationTasks.const';
import { TaskStateType, TaskStatus, TaskStatusType } from '../constants/Fields.const';
import { ITask, ITasksGroupObject, ITasksByGroupsObject } from '../interfaces/ITask';
import { IOnboardingApplicationTasksFetcher } from '../interfaces/IOnboardingApplicationTasksFetcher';
import { useTaskUpdateStatus } from './useTaskUpdateStatus';
import { useTaskUpdateComment } from './useTaskUpdateComment';
import { useNavigationAction } from './useNavigationAction';
import { useCanceledTaskGroup } from './useCanceledTaskGroup';
import { useBPF } from './useBPF';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ONBOARDING_APPLICATION_TASKS } from '../constants/namespaces.const';
import { ITaskDefinitionBasicFields, useTaskDefinitionDetails } from './useTaskDefinitionDetails';
export interface IUseOnboardingApplicationTasks {
    tasks: ITasksGroupObject[];
    isError: boolean;
    isLoading: boolean;
    editTasksDisabled: boolean;
    showCanceledTasksMessage: boolean;
    hideCanceledTasksMessage: () => void;
    isFetched: boolean;
    bpfStage: string | undefined;
    stageName: string | undefined;
}
const REFETCH_INTERVAL = 1000 * 30;

export const useOnboardingApplicationTasks = ({
    fetcher,
    shouldGetForms = false,
}: {
    fetcher: IOnboardingApplicationTasksFetcher;
    shouldGetForms?: boolean;
}): IUseOnboardingApplicationTasks => {
    const { bpfStage, isBPFNameFetched, isStageIdFetched, bpfName, stageName } = useBPF({ fetcher });
    const isBPFAvailable = isStageIdFetched || (isBPFNameFetched && !bpfName);
    const getTaskDefinitionDetails = useTaskDefinitionDetails(ONBOARDING_APPLICATION_TASKS);

    const {
        isLoading,
        data: tasks = [],
        isError,
        refetch,
        remove,
        isFetched,
    } = useQuery(FETCH_TASKS_QUERY, () => fetcher.fetchTasks({ shouldGetForms, processStage: bpfStage }), {
        enabled: isBPFAvailable,
        refetchInterval: REFETCH_INTERVAL,
    });
    const { setShowCanceledTasksMessage, showCanceledTasksMessage } = useCanceledTaskGroup(tasks, bpfStage);
    const { messages, postMessage: postRefetchMessage } = useBrowserCommunication('tasks-refetch');
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const getNavigationAction = useNavigationAction({ fetcher });
    const CanceledGroup = useMemo(() => ({ name: translate('CANCELED_GROUP_NAME'), order: CanceledGroupOrder }), [translate]);

    useEffect(() => () => remove(), [remove]);

    useEffect(() => {
        remove();
        refetch();
    }, [bpfStage, refetch, remove]);

    useEffect(() => {
        refetch();
    }, [messages, refetch]);

    const { updateTaskStatus } = useTaskUpdateStatus({ fetcher, queryName: FETCH_TASKS_QUERY, postMessage: postRefetchMessage });

    const { updateTaskComment } = useTaskUpdateComment({
        fetcher,
        queryName: FETCH_TASKS_QUERY,
        postMessage: postRefetchMessage,
    });

    const tasksByGroup: ITasksByGroupsObject = useMemo(() => {
        if (isError) return {};

        return tasks.reduce((acc, curr: ITask) => {
            const _group = curr.status === TaskStatus.Canceled ? CanceledGroup : curr.taskDefinition.group;
            const groupName = _group!.name;
            const { taskName, formattedName } = getTaskDefinitionDetails({
                taskDefinition: curr.taskDefinition as any as ITaskDefinitionBasicFields,
                applicant: curr.relatedParty as IRelatedParty,
            });

            return {
                ...acc,
                [groupName]: {
                    tasks: [
                        ...(acc[groupName]?.tasks || []),
                        {
                            ...curr,
                            updateStatus: (status: TaskStatusType, state: TaskStateType) =>
                                updateTaskStatus({
                                    updatedStatus: status,
                                    updatedState: state,
                                    taskId: curr.id,
                                    taskName: formattedName,
                                }),
                            updateComment: (comment: string) => updateTaskComment({ comment: comment, taskId: curr.id }),
                            ...(curr.taskDefinition.taskNavigation
                                ? {
                                      taskDefinition: {
                                          ...curr.taskDefinition,
                                          taskNavigation: { ...curr.taskDefinition.taskNavigation, action: getNavigationAction(curr) },
                                          name: taskName,
                                      },
                                  }
                                : {}),
                        },
                    ],
                    group: _group,
                },
            };
        }, {});
    }, [isError, tasks, CanceledGroup, getNavigationAction, updateTaskStatus, updateTaskComment, getTaskDefinitionDetails]);

    return {
        isLoading: isLoading || !isFetched || !isBPFAvailable,
        tasks: useMemo(() => Object.values(tasksByGroup).sort((a, b) => a.group.order - b.group.order), [tasksByGroup]),
        isError,
        editTasksDisabled: !fetcher.hasTasksPrivilege(),
        showCanceledTasksMessage,
        hideCanceledTasksMessage: useCallback(() => setShowCanceledTasksMessage(false), [setShowCanceledTasksMessage]),
        isFetched,
        bpfStage,
        stageName,
    };
};

export default useOnboardingApplicationTasks;
