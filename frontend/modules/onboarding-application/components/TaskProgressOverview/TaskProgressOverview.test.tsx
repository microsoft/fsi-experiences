import React from 'react';
import { act, render } from '@testing-library/react';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import TaskProgressOverview from './TaskProgressOverview';
import { MockOnboardingApplicationTasksFetcher } from '../../interfaces/mocks/MockOnboardingApplicationTasksFetcher';

const TaskProgressOverviewWithProvider = ProviderWrapper(TaskProgressOverview);

describe('TaskProgressOverview', () => {
    it('should render TaskProgressOverview', async () => {
        let component;

        await act(async () => {
            component = render(<TaskProgressOverviewWithProvider fetcher={new MockOnboardingApplicationTasksFetcher()} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('task-progress-overview-data')).toBeVisible();
    });

    it('should render EmptyState if data is not provided', async () => {
        let component;

        const mockOnboardingApplicationTasksFetcher = new MockOnboardingApplicationTasksFetcher();

        mockOnboardingApplicationTasksFetcher.fetchTasks = () => {
            return Promise.resolve([]);
        };

        await act(async () => {
            component = render(<TaskProgressOverviewWithProvider fetcher={mockOnboardingApplicationTasksFetcher} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('empty-state')).toBeVisible();
    });
});
