import { TaskStateType, TaskStatusType } from '../constants/Fields.const';
import { ITaskWithBasicFields } from './ITask';

export interface IVerificationTask extends ITaskWithBasicFields {
    regardingId: string;
    regarding: string;
    processStage?: string;
    updateStatus?: (updatedStatus: TaskStatusType, updatedState: TaskStateType) => Promise<void>;
}
