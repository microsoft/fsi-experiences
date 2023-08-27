import React from 'react';
import { act, render } from '@testing-library/react';
import LoanData from './LoanData';
import format from 'date-fns/format';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { mockLoanInformation, mockLoanInformationMetadata } from '../../../interfaces/ILoanInformation/mocks/ILoanInformation.mocks';

describe('LoanData', () => {
    const N_A = commonStrings['N_A'];

    it('should render the main section', async () => {
        let component;

        await act(async () => {
            component = render(<LoanData loanInformation={mockLoanInformation} metadata={mockLoanInformationMetadata} />);
        });

        const { getByTestId, getByText } = component;

        expect(getByTestId('main-section')).toBeVisible();
        expect(getByText(mockLoanInformation.name)).toBeVisible();
        expect(getByText(mockLoanInformation.loanType)).toBeVisible();
    });

    it('should render N/A when Loan Name and Loan Type are not available in the main section', async () => {
        const { getByTestId } = render(
            <LoanData
                loanInformation={{ ...mockLoanInformation, name: undefined as any, loanType: undefined as any }}
                metadata={mockLoanInformationMetadata}
            />
        );

        const mainSectionLoanName = getByTestId('main-section-loan-name');
        const mainSectionLoanType = getByTestId('main-section-loan-type');

        expect(mainSectionLoanName.textContent).toBe(N_A);
        expect(mainSectionLoanType.textContent).toBe(N_A);
    });

    it('should render principal amount', async () => {
        let component;

        await act(async () => {
            component = render(<LoanData loanInformation={mockLoanInformation} metadata={mockLoanInformationMetadata} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('currency-wrapper')).toBeVisible();
    });

    it('should render N/A when principal amount is unavailable', async () => {
        const { getByTestId } = render(
            <LoanData loanInformation={{ ...mockLoanInformation, principalAmount: undefined as any }} metadata={mockLoanInformationMetadata} />
        );

        const applicationPrincipalAmountTitle = getByTestId(`databox-label-${mockLoanInformationMetadata.principalAmount?.displayName}`);

        expect(applicationPrincipalAmountTitle.nextElementSibling?.textContent).toBe(N_A);
    });

    it('should render loan term', async () => {
        let component;

        await act(async () => {
            component = render(<LoanData loanInformation={mockLoanInformation} metadata={mockLoanInformationMetadata} />);
        });

        const { getByText } = component;

        expect(getByText('24 Months')).toBeVisible();
    });

    it('should no render display names if no metadata exists', async () => {
        const { queryByText } = render(<LoanData loanInformation={mockLoanInformation} metadata={undefined} />);

        expect(queryByText(mockLoanInformationMetadata.loanTerm!.displayName)).toBeNull();
        expect(queryByText(mockLoanInformationMetadata.principalAmount!.displayName)).toBeNull();
        expect(queryByText(mockLoanInformationMetadata.applicationDate!.displayName)).toBeNull();
        expect(queryByText(mockLoanInformationMetadata.interestRate!.displayName)).toBeNull();
    });

    it('should render N/A when loan term is unavailable', async () => {
        const { getByTestId } = render(
            <LoanData loanInformation={{ ...mockLoanInformation, loanTerm: undefined as any }} metadata={mockLoanInformationMetadata} />
        );

        const applicationLoanTermTitle = getByTestId(`databox-label-${mockLoanInformationMetadata.loanTerm?.displayName}`);

        expect(applicationLoanTermTitle.nextElementSibling?.textContent).toBe(N_A);
    });

    it('should render application date', async () => {
        let component;

        await act(async () => {
            component = render(<LoanData loanInformation={mockLoanInformation} metadata={mockLoanInformationMetadata} />);
        });

        const date = format(mockLoanInformation.applicationDate, 'MMM dd, yyyy');
        const { getByText } = component;

        expect(getByText(date)).toBeVisible();
    });

    it('should render N/A when application date is unavailable', async () => {
        const { getByTestId } = render(
            <LoanData loanInformation={{ ...mockLoanInformation, applicationDate: undefined as any }} metadata={mockLoanInformationMetadata} />
        );

        const applicationDateTitle = getByTestId(`databox-label-${mockLoanInformationMetadata.applicationDate?.displayName}`);

        expect(applicationDateTitle.nextElementSibling?.textContent).toBe(N_A);
    });

    it('should render interest rate', async () => {
        let component;

        await act(async () => {
            component = render(<LoanData loanInformation={mockLoanInformation} metadata={mockLoanInformationMetadata} />);
        });

        const { getByText } = component;

        expect(getByText(`${mockLoanInformation.interestRate}%`)).toBeVisible();
    });

    it('should render N/A when interest rate is unavailable', async () => {
        const { getByTestId } = render(
            <LoanData loanInformation={{ ...mockLoanInformation, interestRate: undefined as any }} metadata={mockLoanInformationMetadata} />
        );

        const applicationInterestRateTitle = getByTestId(`databox-label-${mockLoanInformationMetadata.interestRate?.displayName}`);

        expect(applicationInterestRateTitle.nextElementSibling?.textContent).toBe(N_A);
    });
});
