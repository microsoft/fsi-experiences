import { TaskStateType, TaskStatusType } from '../constants/Fields.const';

export interface IGroup {
    name: string;
    order: number;
}

export interface ITaskDefinition {
    id: string;
    name: string;
    applicationName: string;
    group?: IGroup;
    associationType: number;
    processStage?: string;
    taskNavigation?: ITaskNavigation;
    taskType: number;
}

export interface ITaskForm {
    formId: string;
    entityName: string;
    entityId?: string | null;
    contactDetails?: string;
    applicationDetails?: string;
}

export interface ITaskNavigation {
    type: number;
    details?: any;
    taskForm?: ITaskForm;
    action?: () => void;
}

export interface ITasksGroupObject {
    tasks: ITask[];
    group: IGroup;
}

export interface ITasksByGroupsObject {
    [key: string]: ITasksGroupObject;
}

export interface IRelatedParty {
    id: string;
    name: string;
    role?: string;
    isPrimary: boolean;
}

export interface ITask {
    id: string;
    taskDefinition: ITaskDefinition;
    modifiedBy: string | undefined;
    status: number;
    updateStatus: (updatedStatus: TaskStatusType, updatedState: TaskStateType) => Promise<void>;
    comment: string | undefined;
    commentModifiedOn: Date | undefined;
    commentModifiedBy: string | undefined;
    updateComment: (comment: string) => Promise<void>;
    relatedParty?: IRelatedParty;
}

export interface ITaskWithBasicFields {
    id: string;
    name: string;
    status: number;
    state: TaskStateType;
}
