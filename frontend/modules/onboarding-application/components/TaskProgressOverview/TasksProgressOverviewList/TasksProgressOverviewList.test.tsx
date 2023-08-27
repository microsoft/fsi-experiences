import React from 'react';
import { render } from '@testing-library/react';
import TasksProgressOverviewList from './TasksProgressOverviewList';
import { TASKS_PROGRESS_OVERVIEW_LIST_TEST_ID } from './TasksProgressOverviewList.const';
import { taskGroupsMock } from '../../../interfaces/mocks/ApplicationProgress.mock';

describe('TasksProgressOverviewList', () => {
    const mockProps = { taskGroups: taskGroupsMock };

    it('should render component', () => {
        const { getByTestId } = render(<TasksProgressOverviewList {...mockProps} />);

        expect(getByTestId(TASKS_PROGRESS_OVERVIEW_LIST_TEST_ID)).toBeVisible();
    });

    it('should NOT render component if `tasks` property is undefined or empty', () => {
        const { queryByTestId } = render(<TasksProgressOverviewList taskGroups={undefined as any} />);

        expect(queryByTestId(TASKS_PROGRESS_OVERVIEW_LIST_TEST_ID)).toBeNull();
    });
});
