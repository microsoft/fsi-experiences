import React from 'react';
import { render, act, fireEvent, queryHelpers } from '@testing-library/react';
import TasksGroupSection from './TasksGroupSection';
import oaTasksStrings from '../../../assets/strings/OnboardingApplicationTasksControl/OnboardingApplicationTasksControl.1033.json';
import {
    mockTasks,
    task_Canceled_GroupCanceled_Role_NoNav_Stage1,
    task_Done_Group0_Application_ReviewForm_NoStage,
} from '../../../interfaces/mocks/OnboardingApplicationTask.mock';

describe('TasksGroupSection', () => {
    it('should render the title of the section with numbers of items', async () => {
        let component;
        await act(async () => {
            component = await render(
                <TasksGroupSection title={'a'} tasks={[{ ...task_Done_Group0_Application_ReviewForm_NoStage }]} selectedTasksGroup={'a'} />
            );
        });
        const { getByTestId, getByText, container } = component;

        expect(getByTestId('section-header')).toBeVisible();
        expect(
            getByText(oaTasksStrings.NUMBER_OF_COMPLETED_TASKS.replace('{{numberOfCompletedTasks}}', '1').replace('{{totalTasks}}', '1'))
        ).toBeVisible();
        const queryByIconName = queryHelpers.queryByAttribute.bind(null, 'data-icon-name');
        expect(queryByIconName(container, 'Accept')).toBeVisible();
    });

    it('should render the opened section', async () => {
        let component;
        await act(async () => {
            component = await render(<TasksGroupSection title={'a'} tasks={[mockTasks[0]]} selectedTasksGroup={'a'} />);
        });
        const { getByTestId } = component;

        expect(getByTestId('section-header')).toBeVisible();
        expect(getByTestId('tasks-section')).toBeVisible();
    });

    it('should render the closed section', async () => {
        let component;
        await act(async () => {
            component = await render(
                <TasksGroupSection
                    title={'Canceled tasks'}
                    tasks={[{ ...task_Canceled_GroupCanceled_Role_NoNav_Stage1 }]}
                    selectedTasksGroup={'Canceled tasks 1'}
                />
            );
        });
        const { queryByTestId } = component;

        expect(queryByTestId('section-sub-header')).toBeNull();
        expect(queryByTestId('tasks-section')).toBeNull();
    });

    it('should close list section when clicked on section title icon', async () => {
        let component;
        await act(async () => {
            component = await render(<TasksGroupSection title={'a'} tasks={[mockTasks[0]]} selectedTasksGroup={'a'} />);
        });
        const { getByTestId, queryByTestId } = component;

        const button = getByTestId('tasks-group-collapse-icon');
        expect(button).toBeVisible();
        fireEvent.click(button);

        expect(queryByTestId('tasks-section')).toBeNull();
    });

    it('should render list when section opened', async () => {
        let component;
        await act(async () => {
            component = render(<TasksGroupSection title={'a'} tasks={[mockTasks[0]]} selectedTasksGroup={'a'} />);
        });
        const { getByTestId } = component;

        expect(getByTestId('tasks-section')).toBeVisible();
    });
});
