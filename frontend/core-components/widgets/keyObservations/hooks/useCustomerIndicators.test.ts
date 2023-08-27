import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClientWrapper, testingQueryClient } from '../../../utilities/tests/ProviderWrapper';
import useCustomerIndicators from './useCustomerIndicators';

const fetcher = {
    fetchIndicator: jest.fn(),
};

const errorFetcher = {
    fetchIndicator: jest.fn().mockRejectedValue({ name: 'CustomerIndicatorsConfigError' }),
};

describe('useFHData tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchIndicator.mockClear();
        errorFetcher.fetchIndicator.mockClear();
    });

    it('Should call to fetchIndicator and return invalid config', async () => {
        const { result } = renderHook(() => useCustomerIndicators({ fetcher: errorFetcher }), { wrapper: QueryClientWrapper });

        waitFor(() => {
            expect(result.current.invalidConfig).toBe(true);
        });
    });
});
