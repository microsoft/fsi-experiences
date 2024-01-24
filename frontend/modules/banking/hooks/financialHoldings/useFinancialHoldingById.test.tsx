import { renderHook } from '@testing-library/react-hooks';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { waitFor } from '@testing-library/react';
import useFinancialHoldingById from './useFinancialHoldingById';
import { fhVal6, getFHMapMock } from '../../components/summaryFH/FHData.mock';
import { FHData } from '../../interfaces/FHEntity/FHData';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';

const fhData: FHData = {
    data: getFHMapMock(),
    calculated: {
        assets: 100,
    },
    requestMetadata: {
        msfsi_FH_Account: 200,
        msfsi_FH_Creditline: 200,
        msfsi_FH_Investment: 200,
        msfsi_FH_Loan: 200,
        msfsi_FH_Saving: 200,
    },
};
const fetcher = {
    fetchFHData: jest.fn().mockResolvedValue(fhData),
    fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
    fetchFHById: jest.fn().mockResolvedValue(fhVal6),
    fetchFinancialProducts: jest.fn().mockResolvedValue([{ currentValue: 1, financialMarketProductType: undefined }]),
};

describe('useFinancialHoldingById tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.fetchFHData.mockClear();
        fetcher.fetchFHMetadata.mockClear();
    });

    it('Should fetch financial products and if undefined group it to Other', async () => {
        const { result } = renderHook(() => useFinancialHoldingById({ fetcher, financialHoldingId: fhVal6.id }), { wrapper: QueryClientWrapper });
        await waitFor(() => expect(result.current.portfolioChartData?.[0].category).toEqual('Other'));
        await waitFor(() => expect(result.current.financialHolding).toEqual(fhVal6));
    });
});
