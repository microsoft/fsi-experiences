export const TASKS_RESPONSIVE_CONTAINER = 'tasks-responsive-container';

export const CanceledGroupOrder = Infinity;

export const FETCH_TASKS_QUERY = 'FETCH_TASKS_QUERY';

export const FETCH_BPF_NAME_QUERY = 'FETCH_BPF_NAME_QUERY';

export const FETCH_BPF_STAGE_QUERY = 'FETCH_BPF_STAGE_QUERY';

export const FETCH_STAGE_NAME_QUERY = 'FETCH_STAGE_NAME_QUERY';

export const ASSOCIATION_TYPE = {
    Application: 104800000,
    Primary: 104800001,
    Role: 104800002,
} as const;

export type TaskAssociationType = typeof ASSOCIATION_TYPE[keyof typeof ASSOCIATION_TYPE];
