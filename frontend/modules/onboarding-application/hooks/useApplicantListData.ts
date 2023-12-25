import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { IApplicantWithTask } from '../interfaces/IApplicantWithTask';
import { useTaskUpdateStatus } from './useTaskUpdateStatus';
import { IApplicantListFetcher } from '../interfaces/IApplicantListFetcher';
import { useCancelTasksDisplay } from './useCancelTasksDisplay';
import { TaskStatus } from '../constants/Fields.const';
import { ITaskWithBasicFields } from '../interfaces/ITask';
import { useTaskDefinitionDetails } from './useTaskDefinitionDetails';
import { ONBOARDING_APPLICATION_TASKS } from '../constants/namespaces.const';

export interface IUseApplicantListDataResponse {
    applicants: IApplicantWithTask[];
    isLoading: boolean;
    isError: boolean;
    errorMessage?: string;
}

type UseApplicantListProps = {
    fetcher: IApplicantListFetcher;
    applicationId: string;
    taskDefinitionId?: string;
};

export const useApplicantListData = ({ fetcher, applicationId, taskDefinitionId }: UseApplicantListProps): IUseApplicantListDataResponse => {
    const queryName = `${applicationId}-ApplicantList-${taskDefinitionId || ''}`;
    const getTaskDefinitionDetails = useTaskDefinitionDetails(ONBOARDING_APPLICATION_TASKS);

    const { data, isLoading, refetch, isError, error } = useQuery(queryName, () => fetcher.fetchApplicants(applicationId, taskDefinitionId), {
        enabled: !!applicationId,
    });
    const shouldGetCanceledTasks = useCancelTasksDisplay({ fetcher });

    const { messages, postMessage } = useBrowserCommunication('tasks-refetch');

    useEffect(() => {
        if (!messages.length) return;

        refetch();
    }, [messages, refetch]);

    const { updateTaskStatus } = useTaskUpdateStatus({ fetcher, queryName, postMessage });

    const applicants = useMemo(() => {
        if (!data) {
            return [];
        }

        if (!taskDefinitionId) {
            return data;
        }

        return data
            .filter((applicant: IApplicantWithTask) => shouldGetCanceledTasks || applicant.task?.status !== TaskStatus.Canceled)
            .map((applicant: IApplicantWithTask) => {
                if (!applicant.task) return applicant;

                const { formattedName } = getTaskDefinitionDetails({
                    taskDefinition: applicant.task,
                    applicant,
                });

                return {
                    ...applicant,
                    task: {
                        ...applicant.task,
                        updateStatus: (status, state) =>
                            updateTaskStatus({
                                updatedStatus: status,
                                updatedState: state,
                                taskId: (applicant.task as ITaskWithBasicFields).id,
                                taskName: formattedName,
                            }),
                    },
                };
            }) as IApplicantWithTask[];
    }, [taskDefinitionId, data, updateTaskStatus, shouldGetCanceledTasks, getTaskDefinitionDetails]);

    return { applicants, isLoading, isError, errorMessage: (error as Error)?.message };
};
