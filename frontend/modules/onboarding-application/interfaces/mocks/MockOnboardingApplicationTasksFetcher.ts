import { TaskStateType, TaskStatusType } from '../../constants/Fields.const';
import { IOnboardingApplicationTasksFetcher } from '../IOnboardingApplicationTasksFetcher';
import { ITask, ITaskForm } from '../ITask';
import { IVerificationTask } from '../IVerificationTask.interface';
import { mockBPFName, mockBPFStage, mockStageName, mockTasks, mockTasksWithBPFStage } from './OnboardingApplicationTask.mock';
import { verificationTaskMock } from './TaskVerification.mock';

export class MockOnboardingApplicationTasksFetcher implements IOnboardingApplicationTasksFetcher {
    fetchTasks({ shouldGetForms, processStage }: { shouldGetForms: boolean; processStage?: string }): Promise<ITask[]> {
        return Promise.resolve(mockTasksWithBPFStage);
    }
    updateTaskStatus(updatedStatus: TaskStatusType, updatedState: TaskStateType, taskId: string): Promise<TaskStatusType> {
        return Promise.resolve(updatedStatus);
    }
    openForm(form: ITaskForm): void {}
    hasTasksPrivilege(): boolean {
        return true;
    }
    updateTaskComment(comment: string, taskId: string): Promise<void> {
        return Promise.resolve();
    }
    async fetchTaskByTaskDefinitionId({ applicationId, taskDefinitionId }): Promise<IVerificationTask> {
        return Promise.resolve(verificationTaskMock);
    }
    async fetchTasksByTaskDefinitionId() {
        return [];
    }
    fetchBPFName(): Promise<string | undefined> {
        return Promise.resolve(mockBPFName);
    }
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined> {
        return Promise.resolve(mockBPFStage);
    }
    fetchActiveStageName(bpfstage: string): Promise<string | undefined> {
        return Promise.resolve(mockStageName);
    }
}

export class MockOnboardingApplicationTasksFetcherWithoutBPFName implements IOnboardingApplicationTasksFetcher {
    fetchTasks({ shouldGetForms, processStage }: { shouldGetForms: boolean; processStage?: string }): Promise<ITask[]> {
        return Promise.resolve(mockTasks);
    }
    updateTaskStatus(updatedStatus: TaskStatusType, updatedState: TaskStateType, taskId: string): Promise<TaskStatusType> {
        return Promise.resolve(updatedStatus);
    }
    openForm(form: ITaskForm): void {}
    hasTasksPrivilege(): boolean {
        return true;
    }
    updateTaskComment(comment: string, taskId: string): Promise<void> {
        return Promise.resolve();
    }
    async fetchTaskByTaskDefinitionId({ applicationId, taskDefinitionId }): Promise<IVerificationTask> {
        return Promise.resolve(verificationTaskMock);
    }
    async fetchTasksByTaskDefinitionId() {
        return [];
    }
    fetchBPFName(): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }
    fetchActiveStageName(bpfstage: string): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }
}

export class MockFailureOnboardingApplicationTasksFetcher implements IOnboardingApplicationTasksFetcher {
    fetchTasks({ shouldGetForms, processStage }: { shouldGetForms: boolean; processStage?: string }): Promise<ITask[]> {
        throw new Error();
    }
    updateTaskStatus(updatedStatus: TaskStatusType, updatedState: TaskStateType, taskId: string): Promise<TaskStatusType> {
        return Promise.resolve(updatedStatus);
    }
    openForm(form: ITaskForm): void {}
    hasTasksPrivilege(): boolean {
        return true;
    }
    updateTaskComment(comment: string, taskId: string): Promise<void> {
        throw new Error();
    }

    async fetchTaskByTaskDefinitionId({ applicationId, taskDefinitionId }): Promise<IVerificationTask> {
        throw new Error();
    }
    async fetchTasksByTaskDefinitionId() {
        return Promise.reject(new Error());
    }
    fetchBPFName(): Promise<string | undefined> {
        return Promise.resolve(mockBPFName);
    }
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined> {
        return Promise.resolve(mockBPFStage);
    }
    fetchActiveStageName(bpfstage: string): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }
}

export class MockOnboardingApplicationTasksFetcherCanceledTasks implements IOnboardingApplicationTasksFetcher {
    fetchTasks({ shouldGetForms, processStage }: { shouldGetForms: boolean; processStage?: string }): Promise<ITask[]> {
        return Promise.resolve(mockTasksWithBPFStage);
    }
    updateTaskStatus(updatedStatus: TaskStatusType, updatedState: TaskStateType, taskId: string): Promise<TaskStatusType> {
        return Promise.resolve(updatedStatus);
    }
    openForm(form: ITaskForm): void {}
    hasTasksPrivilege(): boolean {
        return true;
    }
    updateTaskComment(comment: string, taskId: string): Promise<void> {
        return Promise.resolve();
    }
    async fetchTaskByTaskDefinitionId({ applicationId, taskDefinitionId }): Promise<IVerificationTask> {
        return Promise.resolve(verificationTaskMock);
    }
    async fetchTasksByTaskDefinitionId() {
        return [];
    }
    fetchBPFName(): Promise<string | undefined> {
        return Promise.resolve(mockBPFName);
    }
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined> {
        return Promise.resolve(mockBPFStage);
    }
    fetchActiveStageName(bpfstage: string): Promise<string | undefined> {
        return Promise.resolve(mockStageName);
    }
}
