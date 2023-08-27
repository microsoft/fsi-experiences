import LoanApplicationList from './LoanApplicationList';
import { renderLoanOnboardingContextProvider } from '../../../testUtils';
import { mockApplications, stepsMock } from '../../../interfaces/ILoanApplication/mocks/ILoanApplication.mocks';
import { initialOnboardingValue } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import { render } from '@testing-library/react';

describe('LoanApplicationList', () => {
    it('should render the component with a searchbox and a list', () => {
        const { container, queryByTestId, queryAllByTestId } = render(
            renderLoanOnboardingContextProvider(
                LoanApplicationList,
                {},
                {
                    ...initialOnboardingValue,
                    applications: mockApplications,
                    steps: stepsMock,
                }
            )
        );

        expect(container).toBeInTheDocument();
        expect(queryByTestId('loan-list-search-wrapper')).toBeVisible();
        expect(queryAllByTestId('application-row').length).toEqual(mockApplications.length);
    });

    it('should render the component with a matching term', () => {
        const { queryAllByTestId } = render(
            renderLoanOnboardingContextProvider(
                LoanApplicationList,
                {},
                {
                    ...initialOnboardingValue,
                    applications: mockApplications,
                    searchTerm: mockApplications[1].name,
                    steps: stepsMock,
                }
            )
        );

        expect(queryAllByTestId('application-row').length).toEqual(1);
    });
});
