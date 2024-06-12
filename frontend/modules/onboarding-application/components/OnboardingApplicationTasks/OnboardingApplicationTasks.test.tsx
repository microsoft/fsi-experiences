import React from 'react';
import { act } from '@testing-library/react-hooks/pure';
import { fireEvent, render } from '@testing-library/react';
import OnboardingApplicationTasks from './OnboardingApplicationTasks';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockOnboardingApplicationTasksFetcher } from '../../interfaces/mocks/MockOnboardingApplicationTasksFetcher';

describe('OnboardingApplicationTasks', () => {
    const onReadyTasks = jest.fn();
    afterAll(() => onReadyTasks.mockClear());
    it('Should render tasks container', async () => {
        let component;
        await act(async () => {
            component = render(<OnboardingApplicationTasks fetcher={new MockOnboardingApplicationTasksFetcher()} onReadyTasks={onReadyTasks} />, {
                wrapper: QueryClientWrapper,
            });
        });
        const { container } = component;
        expect(container).toBeInTheDocument();
    });

    it('Should render cancel tasks message bar', async () => {
        let component;
        await act(async () => {
            component = render(<OnboardingApplicationTasks fetcher={new MockOnboardingApplicationTasksFetcher()} onReadyTasks={onReadyTasks} />, {
                wrapper: QueryClientWrapper,
            });
        });
        const { getByTestId, getByLabelText, queryByTestId } = component;
        expect(getByTestId('cancel-tasks-message')).toBeVisible();
        fireEvent.click(getByLabelText('Close'));
        expect(queryByTestId('cancel-tasks-message')).toBeNull();
    });
});
