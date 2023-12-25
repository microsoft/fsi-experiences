import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TasksGroupCollapse from './TasksGroupCollapse';

describe('Collapse', () => {
    const onToggleIsOpen = jest.fn();
    it('Should render collapse', async () => {
        const { queryByTestId, getByTestId } = render(
            <TasksGroupCollapse content={<div>content</div>} onToggleIsOpen={onToggleIsOpen}>
                <div data-testid="content-test-div">just check</div>
            </TasksGroupCollapse>
        );

        expect(queryByTestId('content-test-div')).not.toBeInTheDocument();
        fireEvent.click(getByTestId('tasks-group-collapse-icon'));
        expect(onToggleIsOpen).toBeCalled();
    });
});
