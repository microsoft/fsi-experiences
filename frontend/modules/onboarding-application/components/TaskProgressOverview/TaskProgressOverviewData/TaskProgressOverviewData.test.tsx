import React from 'react';
import { render } from '@testing-library/react';
import TaskProgressOverviewData from './TaskProgressOverviewData';
import { mockHookResultCompletedTasks, mockHookResultTasks } from '../../../interfaces/mocks/OnboardingApplicationTask.mock';
import oaTasksProgressStrings from '../../../assets/strings/OnboardingApplicationTaskProgressOverviewControl/OnboardingApplicationTaskProgressOverviewControl.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';

describe('TaskProgressOverviewData', () => {
    it('should render Progressbar', () => {
        const { getByTestId } = render(<TaskProgressOverviewData taskProgressData={mockHookResultTasks} />);

        expect(getByTestId('progressbar-container')).toBeVisible();
    });

    it('should render Progressbar- all tasks completed', () => {
        const { getByText } = render(<TaskProgressOverviewData taskProgressData={mockHookResultCompletedTasks} />);

        expect(getByText(commonStrings.PERCENTS_COMPLETED.replace('{{percents}}', '100'))).toBeVisible();
        expect(getByText(oaTasksProgressStrings.TASK_PROGRESS_OVERVIEW_PROGRESS_BAR_DESCRIPTION_COMPLETED)).toBeVisible();
    });
});
