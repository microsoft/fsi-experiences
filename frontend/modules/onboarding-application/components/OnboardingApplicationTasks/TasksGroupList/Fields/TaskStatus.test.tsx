import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import TaskStatus from './TaskStatus';
import { TaskStatus as TaskStatusConst } from '../../../../constants/Fields.const';
import oaTasksStrings from '../../../../assets/strings/OnboardingApplicationTasksControl/OnboardingApplicationTasksControl.1033.json';

describe('TaskStatus', () => {
    it('should render the TaskStatus field', () => {
        const { getByTestId } = render(<TaskStatus status={TaskStatusConst.Pending} updateTaskStatus={() => Promise.resolve()} />);
        expect(getByTestId('task-status-dropdown')).toBeVisible();
    });

    it('should render Canceled status', () => {
        const { getByText } = render(<TaskStatus status={TaskStatusConst.Canceled} updateTaskStatus={() => Promise.resolve()} />);
        expect(getByText(oaTasksStrings.TASKS_CANCELED)).toBeVisible();
    });

    it('should update task status', async () => {
        const _updateStatus = jest.fn();
        const { getByTestId, getAllByText } = render(<TaskStatus status={TaskStatusConst.Pending} updateTaskStatus={_updateStatus} />);

        await act(async () => {
            fireEvent.click(getByTestId('task-status-dropdown'));
        });
        const dropdownOptionsButtons = getAllByText((content, element) => {
            // hack we use `classList.contains` to find elements by a class name
            return element?.classList.contains('ms-Dropdown-item')!;
        });

        await act(async () => {
            fireEvent.click(dropdownOptionsButtons[1]);
        });

        expect(_updateStatus).toBeCalled();
    });

    it('should render disabled dropdown field', () => {
        const { getByTestId } = render(<TaskStatus status={TaskStatusConst.Pending} updateTaskStatus={() => Promise.resolve()} isDisabled={true} />);
        expect(getByTestId('task-status-dropdown').getAttribute('aria-disabled')).toEqual('true');
    });
});
