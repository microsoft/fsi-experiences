import { renderHook } from '@testing-library/react-hooks/pure';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockOnboardingApplicationTasksFetcher } from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { useCancelTasksDisplay } from './useCancelTasksDisplay';
import { FSIContainer, IEnvVars } from '@fsi/core-components/dist/context/FSIContext';
import React from 'react';

describe('useCancelTasksDisplay', () => {
    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should return Cancel Tasks Display env var value', async () => {
        const wrapper = ({ children }) => (
            <FSIContainer
                envVars={{
                    canceltasksdisplayindicator: {
                        defaultvalue: 'yes',
                        value: 'no',
                    },
                }}
            >
                {children}
            </FSIContainer>
        );

        const { result } = renderHook(() => useCancelTasksDisplay({ fetcher: new MockOnboardingApplicationTasksFetcher() }), { wrapper });

        expect(result.current).toEqual(false);
    });

    it('Should return Cancel Tasks Display env var default value', async () => {
        const wrapper = ({ children }) => (
            <FSIContainer
                envVars={{
                    canceltasksdisplayindicator: {
                        defaultvalue: 'yes',
                    },
                }}
            >
                {children}
            </FSIContainer>
        );

        const { result } = renderHook(() => useCancelTasksDisplay({ fetcher: new MockOnboardingApplicationTasksFetcher() }), { wrapper });

        expect(result.current).toEqual(true);
    });
});
