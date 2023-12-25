import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskWithAction from './TaskWithAction';
import { RelatedParty } from './RelatedParty';
import {
    task_Canceled_GroupCanceled_Role_NoNav_Stage1,
    task_Done_Group0_Application_ReviewForm_NoStage,
    task_Done_Group1_Primary_OpenTab_Stage1,
} from '../../../../interfaces/mocks/OnboardingApplicationTask.mock';
import oaTasksStrings from '../../../../assets/strings/OnboardingApplicationTasksControl/OnboardingApplicationTasksControl.1033.json';

describe('RelatedParty', () => {
    it('should render RelatedParty for application', () => {
        const { getByText } = render(<RelatedParty item={task_Done_Group0_Application_ReviewForm_NoStage} />);
        expect(getByText('1')).toBeVisible();
    });

    it('should render RelatedParty for role', () => {
        const { getByText } = render(<RelatedParty item={task_Canceled_GroupCanceled_Role_NoNav_Stage1} />);
        expect(getByText('(Owner)')).toBeVisible();
    });

    it('should render RelatedParty for primary', () => {
        const { getByText } = render(<RelatedParty item={task_Done_Group1_Primary_OpenTab_Stage1} />);
        expect(getByText(`(${oaTasksStrings.PRIMARY_APPLICANT})`)).toBeVisible();
    });
});

describe('TaskWithAction', () => {
    it('should render the TaskWithAction field', () => {
        const item = task_Done_Group1_Primary_OpenTab_Stage1;
        const { getByText } = render(<TaskWithAction item={item} />);
        const taskName: HTMLElement = getByText(item.taskDefinition.name);
        expect(taskName).toBeVisible();
    });

    it('should call provided onClick method when clicked', () => {
        const onLinkClick = jest.fn();
        const item = task_Done_Group1_Primary_OpenTab_Stage1;
        item.taskDefinition.taskNavigation!.action = onLinkClick;
        const { getByText } = render(<TaskWithAction item={item} />);
        const taskName: HTMLElement = getByText(item.taskDefinition.name);
        expect(taskName).toBeVisible();
        fireEvent.click(taskName);
        expect(onLinkClick).toBeCalled();
    });

    it('should render plain text when taskNavigation is undefined hence taskNavigation.action is empty', () => {
        const item = task_Done_Group1_Primary_OpenTab_Stage1;
        item.taskDefinition.taskNavigation = undefined;
        const { getByText } = render(<TaskWithAction item={item} />);
        const taskName: HTMLElement = getByText(item.taskDefinition.name);
        expect(taskName).toBeVisible();
        expect(taskName).not.toHaveAttribute('aria-label');
    });
});
