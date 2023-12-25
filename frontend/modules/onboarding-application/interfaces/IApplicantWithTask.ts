import { TaskStateType, TaskStatusType } from '../constants/Fields.const';
import { TaskAssociationType } from '../constants/OnboardingApplicationTasks.const';
import { ITaskWithBasicFields } from './ITask';

export interface IApplicantWithTask {
    id: string;
    name: string;
    role: string;
    isPrimary: boolean;
    task?: ITaskWithBasicFields & {
        updateStatus: (updatedStatus: TaskStatusType, updatedState: TaskStateType) => Promise<void>;
        processStage?: string;
        associationType?: TaskAssociationType;
    };
}
