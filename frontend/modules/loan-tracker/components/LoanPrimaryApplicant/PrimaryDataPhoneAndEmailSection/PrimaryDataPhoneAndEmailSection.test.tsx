import React from 'react';
import { render } from '@testing-library/react';
import {
    loanPrimaryApplicantMock,
    loanPrimaryApplicantMockMetadata,
} from '../../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicant.mocks';
import { PrimaryDataPhoneAndEmailSection } from './PrimaryDataPhoneAndEmailSection';

describe('PrimaryDataPhoneAndEmailSection', () => {
    it('should render phone number', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={loanPrimaryApplicantMockMetadata}
            />
        );

        const { getByText, getByTestId } = component;

        expect(getByTestId('phone-email-data')).toBeVisible();
        expect(getByText(loanPrimaryApplicantMock.contact.phoneNumber)).toBeVisible();
    });

    it('should not render phone number if not exists', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone=""
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={loanPrimaryApplicantMockMetadata}
            />
        );

        const { queryByText } = component;

        expect(queryByText(loanPrimaryApplicantMock.contact.phoneNumber)).toBeNull();
    });

    it('should render phone number display name', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={loanPrimaryApplicantMockMetadata}
            />
        );

        const { getByText } = component;

        expect(getByText(loanPrimaryApplicantMockMetadata.phoneNumber!.displayName)).toBeVisible();
    });

    it('should not render phone number display name if does not exist', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={undefined}
            />
        );

        const { queryByText } = component;

        expect(queryByText(loanPrimaryApplicantMockMetadata.phoneNumber!.displayName)).toBeNull();
    });

    it('should render email', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={loanPrimaryApplicantMockMetadata}
            />
        );

        const { getByText, getByTestId } = component;

        expect(getByTestId('phone-email-data')).toBeVisible();
        expect(getByText(loanPrimaryApplicantMock.contact.emailAddress)).toBeVisible();
    });

    it('should not render email if not exists', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email=""
                metadata={loanPrimaryApplicantMockMetadata}
            />
        );

        const { queryByText } = component;

        expect(queryByText(loanPrimaryApplicantMock.contact.emailAddress)).toBeNull();
    });

    it('should render email display name', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={loanPrimaryApplicantMockMetadata}
            />
        );

        const { getByText } = component;

        expect(getByText(loanPrimaryApplicantMockMetadata.emailAddress!.displayName)).toBeVisible();
    });

    it('should not render email display name if does not exist', () => {
        const component = render(
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicantMock.contact.phoneNumber}
                email={loanPrimaryApplicantMock.contact.emailAddress}
                metadata={undefined}
            />
        );

        const { queryByText } = component;

        expect(queryByText(loanPrimaryApplicantMockMetadata.emailAddress!.displayName)).toBeNull();
    });

    it('should not render component if email and phone do not exist', () => {
        const component = render(<PrimaryDataPhoneAndEmailSection phone="" email="" metadata={loanPrimaryApplicantMockMetadata} />);

        const { queryByTestId } = component;

        expect(queryByTestId('phone-email-data')).toBeNull();
    });
});
