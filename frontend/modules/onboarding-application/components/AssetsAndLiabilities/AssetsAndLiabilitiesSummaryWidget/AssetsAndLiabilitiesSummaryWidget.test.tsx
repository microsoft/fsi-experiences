import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks/pure';
import React from 'react';
import { ASSETS_AND_LIABILITIES } from '../../../constants/namespaces.const';
import { MockApplicantFetcher } from '../../../interfaces/mocks/ApplicantFetcher.mock';
import { mockApplicants } from '../../../interfaces/mocks/ApplicantList.mock';
import { MockFinancialCategoryFetcher } from '../../../interfaces/mocks/FinancialCategoryFetcher.mock';
import AssetsAndLiabilitiesWidget from './AssetsAndLiabilitiesSummaryWidget';

describe('AssetsAndLiabilitiesWidget', () => {
    it('Should render assets and liabilities widget', async () => {
        let component;
        await act(async () => {
            component = render(
                <AssetsAndLiabilitiesWidget
                    financialItemsType={ASSETS_AND_LIABILITIES}
                    financialCategoryFetchers={[new MockFinancialCategoryFetcher('asset'), new MockFinancialCategoryFetcher('liability')]}
                    applicantFetcher={new MockApplicantFetcher()}
                    applicantId={mockApplicants[0].id}
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
