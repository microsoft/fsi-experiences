export const TASKS_COLUMNS = {
    NAME: 'TASK_NAME',
    STATUS: 'TASK_STATUS',
    MODIFIED_BY: 'TASKS_MODIFIED_BY',
    ASSOCIATED_WITH: 'TASKS_ASSOCIATED_WITH',
    COMMENTS: 'COMMENTS',
};

export const cellStyleProps = { cellLeftPadding: 40, cellExtraRightPadding: 10, cellRightPadding: 10 };

export const COLUMN_MAX_WIDTH = 600;
export const COLUMN_MIN_WIDTH = 250;

export const COLUMN_WIDTH = {
    [TASKS_COLUMNS.NAME]: 0.33,
    [TASKS_COLUMNS.ASSOCIATED_WITH]: 0.16,
    [TASKS_COLUMNS.STATUS]: 0.1,
    [TASKS_COLUMNS.MODIFIED_BY]: 0.16,
    [TASKS_COLUMNS.COMMENTS]: 0.25,
};

export const NUM_TASKS_ITEMS_IN_LIST = 5;

export const defaultColumnProps = key => ({
    key,
    name: key,
    fieldName: key,
    isResizable: false,
    isIconOnly: false,
});
