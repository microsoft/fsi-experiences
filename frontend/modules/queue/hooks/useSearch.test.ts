import { renderHook } from '@testing-library/react-hooks';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import useSearch from './useSearch';
import { queueItemsMock } from '../interfaces/mocks/Queue.mock';

jest.mock('@fsi/core-components/dist/hooks/useDebounce/useDebounce', () => ({
    useDebounce: fn => fn,
}));

jest.useFakeTimers();
describe('useSearch', () => {
    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should call updateSearch', async () => {
        const { result } = renderHook(
            () => useSearch({ items: queueItemsMock.map(item => ({ data: { ...item, status: { ...item.status! } }, groupId: item.stepId })) }),
            {
                wrapper: QueryClientWrapper,
            }
        );

        await waitFor(() => {
            result.current.onChangeSearch(undefined, queueItemsMock[0].itemName);
            expect(result.current.resultItems.length).toEqual(1);
        });
    });
});
