import React from 'react';
import { act, render } from '@testing-library/react';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { ArchiveApplicationWrapper } from './ArchiveApplicationWrapper';
import { MockOnboardingApplicationQueueFetcher } from '../../interfaces/mocks/MockOnboardingApplicationQueueFetcher';

describe('ArchiveApplicationWrapper', () => {
    it('should render component', async () => {
        let component;
        await act(async () => {
            component = render(
                <ArchiveApplicationWrapper
                    fetcher={new MockOnboardingApplicationQueueFetcher()}
                    selectedApplication={{
                        id: '',
                        name: 'test',
                    }}
                    actionName={''}
                />,
                {
                    wrapper: QueryClientWrapper,
                }
            );
        });

        const { container } = component;
        expect(container).toBeInTheDocument();
    });
});
