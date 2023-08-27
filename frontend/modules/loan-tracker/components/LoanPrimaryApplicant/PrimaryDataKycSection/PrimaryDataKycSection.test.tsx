import React from 'react';
import { render } from '@testing-library/react';
import { PrimaryDataKycSection } from './PrimaryDataKycSection';
import {
    loanPrimaryApplicantMock,
    loanPrimaryApplicantMockMetadata,
} from '../../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicant.mocks';

describe('PrimaryDataKycSection', () => {
    it('should render kyc status', () => {
        const component = render(
            <PrimaryDataKycSection kycStatus={loanPrimaryApplicantMock.kycStatus} metadata={loanPrimaryApplicantMockMetadata} />
        );

        const { getByText } = component;

        expect(getByText(loanPrimaryApplicantMock.kycStatus)).toBeVisible();
    });

    it('should render kyc status display name', () => {
        const component = render(
            <PrimaryDataKycSection kycStatus={loanPrimaryApplicantMock.kycStatus} metadata={loanPrimaryApplicantMockMetadata} />
        );

        const { getByText } = component;

        expect(getByText(loanPrimaryApplicantMockMetadata.kycStatus!.displayName)).toBeVisible();
    });

    it('should not render kyc status if does not exist', () => {
        const component = render(<PrimaryDataKycSection kycStatus="" metadata={loanPrimaryApplicantMockMetadata} />);

        const { queryByTestId } = component;

        expect(queryByTestId('databox-label-')).toBeNull();
    });

    it('should not render kyc display name if does not exist', () => {
        const component = render(<PrimaryDataKycSection kycStatus={loanPrimaryApplicantMock.kycStatus} metadata={undefined} />);

        const { queryByText } = component;

        expect(queryByText(loanPrimaryApplicantMockMetadata.kycStatus!.displayName)).toBeNull();
    });
});
