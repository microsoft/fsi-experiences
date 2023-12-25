import { TaskStateType, TaskStatusType } from '../constants/Fields.const';
import { TaskAssociationType } from '../constants/OnboardingApplicationTasks.const';
import { IOnboardingApplicationCommonFetcher } from './IOnboardingApplicationCommonFetcher';
import { ITask, ITaskForm } from './ITask';
import { IVerificationTask } from './IVerificationTask.interface';

export interface IOnboardingApplicationTasksFetcher extends IOnboardingApplicationCommonFetcher {
    fetchTasks: ({ shouldGetForms, processStage }: { shouldGetForms: boolean; processStage?: string }) => Promise<ITask[]>;
    updateTaskStatus: (updatedStatus: TaskStatusType, updatedState: TaskStateType, taskId: string) => Promise<TaskStatusType>;
    openForm: (form: ITaskForm) => void;
    hasTasksPrivilege: () => boolean;
    updateTaskComment: (comment: string, taskId: string) => Promise<void>;
    fetchTaskByTaskDefinitionId({
        applicationId,
        taskDefinitionId,
        level,
    }: {
        applicationId: string;
        taskDefinitionId: string;
        level?: TaskAssociationType;
    }): Promise<IVerificationTask>;
}
