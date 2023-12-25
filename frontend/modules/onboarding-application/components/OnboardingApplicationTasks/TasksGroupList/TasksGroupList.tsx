import React, { FC, useCallback } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { openedListStyle, detailsListStyles, columnHeaderTextStyles } from './TasksGroupList.style';
import { CheckboxVisibility, DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { TASKS_COLUMNS, defaultColumnProps, COLUMN_MIN_WIDTH, COLUMN_WIDTH } from './TasksGroupList.const';
import TaskWithAction from './Fields/TaskWithAction';
import { cellStyleProps } from './TasksGroupList.const';
import { useResizeDetector } from 'react-resize-detector';
import { DetailsHeader } from '@fluentui/react/lib/components/DetailsList/DetailsHeader';
import { ONBOARDING_APPLICATION_TASKS } from '../../../constants/namespaces.const';
import { ITask } from '../../../interfaces/ITask';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import { PersonaSize } from '@fluentui/react/lib/components/Persona/Persona.types';
import { Persona } from '@fluentui/react/lib/components/Persona/Persona';
import TaskComment from '../TaskComment/TaskComment';
import { RelatedParty } from './Fields/RelatedParty';
import TaskStatusField from './Fields/TaskStatusField';
export interface ITasksGroupListProps {
    tasks: ITask[];
    editTasksDisabled?: boolean;
}

export const getColumns = ({ isDisabled, width }: { isDisabled?: boolean; width: number }) => {
    const columnsWidth = column => ({
        minWidth: (width - COLUMN_MIN_WIDTH) * COLUMN_WIDTH[column],
        maxWidth: (width - COLUMN_MIN_WIDTH) * COLUMN_WIDTH[column],
    });

    return [
        {
            ...defaultColumnProps(TASKS_COLUMNS.NAME),
            ...columnsWidth(TASKS_COLUMNS.NAME),
            onRender: (item: ITask) => <TaskWithAction item={item} />,
        },
        {
            ...defaultColumnProps(TASKS_COLUMNS.ASSOCIATED_WITH),
            ...columnsWidth(TASKS_COLUMNS.ASSOCIATED_WITH),
            onRender: (item: ITask) => <RelatedParty item={item} />,
        },
        {
            ...defaultColumnProps(TASKS_COLUMNS.STATUS),
            ...columnsWidth(TASKS_COLUMNS.STATUS),
            onRender: (item: ITask) => <TaskStatusField item={item} isDisabled={isDisabled} />,
        },
        {
            ...defaultColumnProps(TASKS_COLUMNS.MODIFIED_BY),
            ...columnsWidth(TASKS_COLUMNS.MODIFIED_BY),
            onRender: (item: ITask) =>
                item.modifiedBy ? <Persona text={item.modifiedBy} size={PersonaSize.size8} title={item.modifiedBy} /> : <>-</>,
        },
        {
            ...defaultColumnProps(TASKS_COLUMNS.COMMENTS),
            ...columnsWidth(TASKS_COLUMNS.COMMENTS),
            onRender: (item: ITask) => <TaskComment task={item} />,
        },
    ];
};
/* istanbul ignore next */
const onRenderColumnHeaderTooltip = tooltipHostProps => {
    const columnName = tooltipHostProps.column?.name;
    return (
        <OverflowText text={columnName} styles={columnHeaderTextStyles} overflowModeSelf>
            <span data-is-focusable="true">{columnName}</span>
        </OverflowText>
    );
};

const TasksGroupList: FC<ITasksGroupListProps> = ({ tasks, editTasksDisabled }) => {
    /* istanbul ignore next */
    const { width = 0, ref } = useResizeDetector({ handleWidth: true, handleHeight: false });
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);

    const onRenderDetailsHeader = useCallback(
        detailsHeaderProps => {
            return (
                <DetailsHeader
                    {...detailsHeaderProps}
                    columns={detailsHeaderProps.columns.map(col => ({ ...col, name: translate(col.key) }))}
                    onRenderColumnHeaderTooltip={onRenderColumnHeaderTooltip}
                />
            );
        },
        [translate]
    );

    return (
        <div ref={ref}>
            <Stack styles={openedListStyle} verticalAlign="center" data-testid="tasks-section">
                <DetailsList
                    items={tasks}
                    columns={getColumns({
                        isDisabled: editTasksDisabled,
                        width,
                    })}
                    checkboxVisibility={CheckboxVisibility.hidden}
                    selectionMode={SelectionMode.none}
                    styles={detailsListStyles}
                    cellStyleProps={cellStyleProps}
                    onRenderDetailsHeader={onRenderDetailsHeader}
                />
            </Stack>
        </div>
    );
};

export default TasksGroupList;
