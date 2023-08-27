import React from 'react';
import { render } from '@testing-library/react';
import { loanPrimaryApplicantMock } from '../../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicant.mocks';
import { PrimaryDataMainSection } from './PrimaryDataMainSection';
import differenceInYears from 'date-fns/differenceInYears';

describe('PrimaryDataMainSection', () => {
    it('should render applicant initials', () => {
        const component = render(<PrimaryDataMainSection loanPrimaryApplicant={loanPrimaryApplicantMock} />);

        const { getByText } = component;

        expect(getByText('SS')).toBeVisible();
    });

    it('should render applicant name', () => {
        const component = render(<PrimaryDataMainSection loanPrimaryApplicant={loanPrimaryApplicantMock} />);

        const { getByText } = component;

        expect(getByText(loanPrimaryApplicantMock.contact.fullName)).toBeVisible();
    });

    it('should render age and family status', () => {
        const component = render(<PrimaryDataMainSection loanPrimaryApplicant={loanPrimaryApplicantMock} />);

        const { getByText } = component;
        const age = differenceInYears(new Date(), loanPrimaryApplicantMock.contact.birthdate);
        expect(getByText(`${age}, Single`)).toBeVisible();
    });

    it('should render communications', () => {
        const component = render(<PrimaryDataMainSection loanPrimaryApplicant={loanPrimaryApplicantMock} />);

        const { getAllByTestId } = component;

        expect(getAllByTestId('communication-icon').length).toEqual(3);
    });
});
