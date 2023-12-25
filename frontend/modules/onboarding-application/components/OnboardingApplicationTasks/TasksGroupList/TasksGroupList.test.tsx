import React from 'react';
import { render } from '@testing-library/react';
import TasksGroupList, { getColumns } from './TasksGroupList';
import { COLUMN_MIN_WIDTH } from './TasksGroupList.const';
import { mockTasks, task_Done_Group1_Primary_OpenTab_Stage1 } from '../../../interfaces/mocks/OnboardingApplicationTask.mock';

describe('TasksGroupList', () => {
    it('should render the tasks list', async () => {
        const { getByTestId } = render(<TasksGroupList tasks={[mockTasks[0]]} />);
        expect(getByTestId('tasks-section')).toBeVisible();
    });
    it('should render name of contact "modified by" column', async () => {
        const _columns = [...getColumns({ width: COLUMN_MIN_WIDTH })];
        const { getByText } = render(_columns[3].onRender(mockTasks[0]));
        expect(getByText('Mona Cane')).toBeInTheDocument();
    });
    it('should not render name of contact "modified by" column', async () => {
        const _columns = [...getColumns({ width: COLUMN_MIN_WIDTH })];
        const { getByText } = render(_columns[3].onRender({ ...mockTasks[0], modifiedBy: undefined }));
        expect(getByText('-')).toBeInTheDocument();
    });

    it('should render non application task in associated with column', async () => {
        const _columns = [...getColumns({ width: COLUMN_MIN_WIDTH })];
        const { getByTestId } = render(_columns[1].onRender({ ...task_Done_Group1_Primary_OpenTab_Stage1 }));
        expect(getByTestId('associated-with-contact')).toBeInTheDocument();
    });
});
