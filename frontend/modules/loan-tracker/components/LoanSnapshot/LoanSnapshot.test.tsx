import React from 'react';
import { act, render } from '@testing-library/react';
import LoanSnapshot from './LoanSnapshot';
import { MockLoanInformationFetcher } from '../../interfaces/ILoanInformation/mocks/ILoanInformationFetcher.mock';
import { MockLoanPrimaryApplicantFetcher } from '../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicantFetcher.mocks';
import { MockLoanProgressOverviewFetcher } from '../../interfaces/ILoanProgressOverview/mocks/ILoanProgressOverviewFetcher.mocks';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockLoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilitiesFetcher.mocks';
import { mockApplications } from '../../interfaces/ILoanApplication/mocks/ILoanApplication.mocks';

const LoanSnapshotWithProvider = ProviderWrapper(LoanSnapshot);

const loanSnapshotProps = {
    loanInformationFetcher: new MockLoanInformationFetcher(),
    loanPrimaryApplicantFetcher: new MockLoanPrimaryApplicantFetcher(),
    loanProgressOverviewFetcher: new MockLoanProgressOverviewFetcher(),
    loanAssetsAndLiabilitiesFetcher: new MockLoanAssetsAndLiabilitiesFetcher(),
    loanApplicationId: mockApplications[0].id,
};
describe('LoanSnapshot', () => {
    it('should render component', async () => {
        let component;

        await act(async () => {
            component = render(<LoanSnapshotWithProvider {...loanSnapshotProps} />);
        });

        const { container } = component;

        expect(container).toBeInTheDocument();
    });
});
