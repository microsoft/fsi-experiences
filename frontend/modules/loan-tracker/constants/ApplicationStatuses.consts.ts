import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const MAP_BY_STATUSES = {
    104800000: 'Draft',
    104800001: 'In Review',
    104800002: 'In Progress',
    104800003: 'On hold',
    104800004: 'Approved',
    104800005: 'Rejected',
    104800006: 'Abandoned',
};

export const MAP_BY_LOAN_TYPE = {
    104800000: 'Secured',
    104800001: 'Unsecured',
    104800002: 'Mortgage',
};

export const APPLICATION_STATUSES = {
    [MAP_BY_STATUSES[104800001]]: {
        key: 'In Review',
        label: 'LOAN_STATUS_IN_REVIEW',
        group: 'LOAN_PROCESSING',
    },
    [MAP_BY_STATUSES[104800002]]: {
        key: 'In Progress',
        label: 'LOAN_STATUS_IN_PROGRESS',
        icon: 'clock',
        group: 'LOAN_PROCESSING',
    },
    [MAP_BY_STATUSES[104800003]]: {
        key: 'On hold',
        label: 'LOAN_STATUS_ON_HOLD',
        icon: 'CirclePause',
        group: 'LOAN_PROCESSING',
    },
    [MAP_BY_STATUSES[104800004]]: {
        key: 'Approved',
        label: 'LOAN_STATUS_APPROVED',
        icon: 'Completed',
        group: 'CLOSURE',
        color: COLORS.green,
    },
    [MAP_BY_STATUSES[104800005]]: {
        key: 'Rejected',
        label: 'LOAN_STATUS_REJECTED',
        icon: 'ErrorBadge',
        group: 'CLOSURE',
        color: COLORS.red,
    },
};

export const APPLICATION_STATUS_GROUPS = {
    LOAN_APPLICATIONS: {
        name: 'LOAN_GROUP_DEFAULT',
        key: 1,
    },
    LOAN_PROCESSING: {
        key: 2,
        name: 'LOAN_GROUP_ACTIVE',
    },
    CLOSURE: {
        name: 'LOAN_GROUP_CLOSED',
        key: 3,
    },
};

export const APPLICATION_FIELDS = {
    LOANTYPE: 'msfsi_loantype',
    NAME: 'msfsi_name',
    ENTITY_NAME: 'msfsi_loanapplication',
    APPLICANT_NAME: 'applicant',
};
