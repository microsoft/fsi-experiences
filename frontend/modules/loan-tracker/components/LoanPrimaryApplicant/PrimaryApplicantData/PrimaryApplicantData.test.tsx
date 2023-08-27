import React from 'react';
import { render } from '@testing-library/react';
import { PrimaryApplicantData } from './PrimaryApplicantData';
import {
    loanPrimaryApplicantMock,
    loanPrimaryApplicantMockMetadata,
} from '../../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicant.mocks';

describe('PrimaryApplicantData', () => {
    it('should render primary applicant data', async () => {
        const component = render(
            <PrimaryApplicantData loanPrimaryApplicant={loanPrimaryApplicantMock} metadata={loanPrimaryApplicantMockMetadata} />
        );

        const { getByTestId } = component;

        expect(getByTestId('primary-applicant-data')).toBeVisible();
    });
});
