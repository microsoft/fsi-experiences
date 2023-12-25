import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TaskComment from './TaskComment';
import { mockTasks } from '../../../interfaces/mocks/OnboardingApplicationTask.mock';
import { EDITABLE_TEXT_FIELD_TEST_ID, TASK_COMMENT_WRAPPER_TEST_ID } from './TaskComment.const';
import { TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID } from '../TaskCommentCallout/TaskCommentCallout.const';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';

jest.mock('@fsi/core-components/dist/hooks/useNotificationService/useNotificationService');

const tooltipShowMock = jest.fn();

describe('TaskComment', () => {
    beforeEach(() => {
        (useNotificationService as any).mockReturnValue({
            show: tooltipShowMock,
        });
    });

    it('should render the tasks comment', async () => {
        const { getByTestId } = render(<TaskComment task={mockTasks[0]} />);
        const taskCommentWrapper = getByTestId(TASK_COMMENT_WRAPPER_TEST_ID);
        expect(taskCommentWrapper).toBeVisible();
    });

    it('should change the value', async () => {
        const { getByTestId } = render(<TaskComment task={mockTasks[0]} />);
        const taskCommentInput = getByTestId(EDITABLE_TEXT_FIELD_TEST_ID);

        fireEvent.click(taskCommentInput);
        fireEvent.change(taskCommentInput, { target: { value: 'updated comment' } });

        expect(taskCommentInput).toHaveValue('updated comment');
    });

    it('should display callout on wrapper mouseOver', async () => {
        const { getByTestId } = render(<TaskComment task={mockTasks[0]} />);
        const taskCommentWrapper = getByTestId(TASK_COMMENT_WRAPPER_TEST_ID);

        fireEvent.mouseOver(taskCommentWrapper);
        expect(getByTestId(TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID)).toBeDefined();
    });

    it('should NOT display callout on wrapper mouseLeave', async () => {
        const { getByTestId, queryByTestId } = render(<TaskComment task={mockTasks[0]} />);
        const taskCommentWrapper = getByTestId(TASK_COMMENT_WRAPPER_TEST_ID);

        fireEvent.mouseOver(taskCommentWrapper);

        fireEvent.mouseLeave(taskCommentWrapper);

        expect(queryByTestId(TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID)).toBeNull();
    });

    it('should display callout on input focus', async () => {
        const { getByTestId } = render(<TaskComment task={mockTasks[0]} />);
        const taskCommentInput = getByTestId(EDITABLE_TEXT_FIELD_TEST_ID);

        fireEvent.focus(taskCommentInput);
        expect(getByTestId(TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID)).toBeInTheDocument();
    });

    it('should NOT display callout on input blur', async () => {
        const { getByTestId, queryByTestId } = render(<TaskComment task={mockTasks[0]} />);
        const taskCommentInput = getByTestId(EDITABLE_TEXT_FIELD_TEST_ID);

        fireEvent.focus(taskCommentInput);

        fireEvent.blur(taskCommentInput);

        expect(queryByTestId(TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID)).toBeNull();
    });

    it('should call updateComment on input blur', async () => {
        const task = mockTasks[0];
        task.updateComment = jest.fn();
        const { getByTestId } = render(<TaskComment task={task} />);
        const taskCommentInput = getByTestId(EDITABLE_TEXT_FIELD_TEST_ID);
        fireEvent.focus(taskCommentInput);
        fireEvent.change(taskCommentInput, { target: { value: 'updated comment' } });

        fireEvent.blur(taskCommentInput);
        expect(task.updateComment).toBeCalled();
    });
});
