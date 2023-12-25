import { renderHook } from '@testing-library/react-hooks';
import { MockOnboardingApplicationQueueFetcher } from '../interfaces/mocks/MockOnboardingApplicationQueueFetcher';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import { queueItemsMock } from '../interfaces/mocks/Queue.mock';
import useQueueData from './useQueueData';

jest.mock('@fsi/core-components/dist/hooks/useDebounce/useDebounce', () => ({
    useDebounce: fn => fn,
}));

jest.useFakeTimers();
describe('useQueueData', () => {
    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should return queue items', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { result } = renderHook(() => useQueueData({ fetcher, applicationIds: [] }), {
            wrapper: QueryClientWrapper,
        });

        const mockResults = queueItemsMock.map(item => ({ data: { ...item, status: { ...item.status! } }, groupId: item.stepId }));
        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
        });

        await waitFor(() => {
            expect(result.current.items).toEqual(mockResults);
        });
    });

    it('Should fail and return empty items', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { result } = renderHook(() => useQueueData({ fetcher, applicationIds: [] }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => {
            expect(result.current.items).toEqual([]);
        });
    });
});
