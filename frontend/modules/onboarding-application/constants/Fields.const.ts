export const ContactIconProps = { iconName: 'Contact' };

export const TaskStatus = {
    Pending: 2,
    Done: 5,
    Canceled: 6,
};

export const TaskState = {
    Opened: 0,
    Completed: 1,
    Canceled: 2,
};

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export type TaskStateType = typeof TaskState[keyof typeof TaskState];

export const STATUS_TRANSLATION = {
    [TaskStatus.Pending]: 'TASKS_PENDING',
    [TaskStatus.Done]: 'TASKS_DONE',
    [TaskStatus.Canceled]: 'TASKS_CANCELED',
};

export const STATUS_TO_STATE = {
    [TaskStatus.Pending]: TaskState.Opened,
    [TaskStatus.Done]: TaskState.Completed,
    [TaskStatus.Canceled]: TaskState.Canceled,
};

export const TASK_TYPE = {
    Verification: 104800000,
    General: 104800001,
};
