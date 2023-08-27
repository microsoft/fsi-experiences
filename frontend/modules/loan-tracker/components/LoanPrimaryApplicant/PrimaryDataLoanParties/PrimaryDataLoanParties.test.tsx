import React from 'react';
import { render } from '@testing-library/react';
import { PrimaryDataLoanParties } from './PrimaryDataLoanParties';
import { loanPrimaryApplicantMock } from '../../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicant.mocks';

describe('PrimaryDataLoanParties', () => {
    it('should render parties if exist', () => {
        const component = render(<PrimaryDataLoanParties parties={loanPrimaryApplicantMock.additionalParties} />);

        const { queryAllByTestId, queryByTestId } = component;

        expect(queryByTestId('parties-data')).toBeVisible();
        expect(queryAllByTestId('persona')).toHaveLength(loanPrimaryApplicantMock.additionalParties.length);
    });

    it('should not render parties if there is none', () => {
        const component = render(<PrimaryDataLoanParties parties={[]} />);

        const { queryByTestId } = component;

        expect(queryByTestId('persona')).toBeNull();
    });
});
