import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { renderHook } from '@testing-library/react-hooks';
import { MockApplicantFetcher } from '../interfaces/mocks/ApplicantFetcher.mock';
import { mockFinancialCategoriesApplicants } from '../interfaces/mocks/IApplicant.mock';
import { useApplicantData } from './useApplicantData';

describe('useApplicant tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should returns applicants data', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useApplicantData({
                    fetcher: new MockApplicantFetcher(),
                    applicantId: '',
                }),
            { wrapper: QueryClientWrapper }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.applicantName).toEqual(mockFinancialCategoriesApplicants[0].name);
        expect(result.current.hasFinancialItemPrivilege).toBeTruthy();
    });
});
