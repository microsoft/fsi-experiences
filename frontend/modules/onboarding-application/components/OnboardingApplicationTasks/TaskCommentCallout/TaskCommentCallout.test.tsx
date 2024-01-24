import { render } from '@testing-library/react';
import React from 'react';
import TaskCommentCallout from './TaskCommentCallout';
import { TASK_COMMENT_CALLOUT_CONTENT_TEST_ID, TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID } from './TaskCommentCallout.const';

describe('TaskCommentCallout', () => {
    it('Should render Contact', () => {
        const { getByTestId, getAllByTestId } = render(
            <TaskCommentCallout content={'test content'} modifiedOn={new Date()} modifiedBy={'Hayden Reyes'} />
        );

        expect(getByTestId(TASK_COMMENT_CALLOUT_CONTENT_TEST_ID)).toBeDefined();
        expect(getByTestId(TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID)).toBeDefined();
        expect(getAllByTestId('date-time-text')[0]).toBeDefined();
        expect(getAllByTestId('date-time-text')[1]).toBeDefined();
    });
});
