import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks/pure';
import React from 'react';
import FinancialCategoriesWidgetWrapper from './FinancialCategoriesWidget';

describe('AssetsAndLiabilitiesWidget', () => {
    it('Should render assets and liabilities widget', async () => {
        let component;
        await act(async () => {
            component = render(
                <FinancialCategoriesWidgetWrapper
                    isLoading={false}
                    isError={false}
                    applicantName={''}
                    currencyId={''}
                    applicantsCount={1}
                    snapshot={{
                        totalAssets: 120,
                        totalLiabilities: 45,
                        applicantTotalAssets: 34,
                        applicantTotalLiabilities: 100,
                    }}
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
