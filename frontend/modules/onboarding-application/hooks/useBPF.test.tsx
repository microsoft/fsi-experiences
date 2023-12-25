import { renderHook } from '@testing-library/react-hooks/pure';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockOnboardingApplicationTasksFetcher } from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { mockBPFName, mockBPFStage, mockHookResultTasks } from '../interfaces/mocks/OnboardingApplicationTask.mock';
import { useBPF } from './useBPF';

let messages: any = [];
jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        messages,
    }))
);

describe('useBPF', () => {
    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should return BPF name and stage', async () => {
        const { result } = renderHook(() => useBPF({ fetcher: new MockOnboardingApplicationTasksFetcher() }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => {
            expect(result.current.bpfName).toEqual(mockBPFName);
        });

        await waitFor(() => {
            expect(result.current.bpfStage).toEqual(mockBPFStage);
        });
    });

    it('Should refetch BPF name and stage', async () => {
        messages = ['satge'];
        const fetcher = new MockOnboardingApplicationTasksFetcher();
        jest.spyOn(fetcher, 'fetchActiveBPFStage');

        const { result } = renderHook(() => useBPF({ fetcher }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => {
            expect(fetcher.fetchActiveBPFStage).toBeCalledTimes(2);
        });
    });
});
