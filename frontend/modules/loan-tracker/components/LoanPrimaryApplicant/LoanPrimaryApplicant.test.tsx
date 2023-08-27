import React from 'react';
import { act, render } from '@testing-library/react';
import LoanPrimaryApplicant from './LoanPrimaryApplicant';
import { MockLoanPrimaryApplicantFetcher } from '../../interfaces/ILoanPrimaryApplicant/mocks/ILoanPrimaryApplicantFetcher.mocks';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';

const LoanPrimaryApplicantWithProvider = ProviderWrapper(LoanPrimaryApplicant);

describe('LoanPrimaryApplicant', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should render primary applicant data', async () => {
        let component;

        await act(async () => {
            component = render(<LoanPrimaryApplicantWithProvider fetcher={new MockLoanPrimaryApplicantFetcher()} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('primary-applicant-data')).toBeVisible();
    });

    it('should render error state if primary applicant data not found', async () => {
        const customFetcher = new MockLoanPrimaryApplicantFetcher();
        let component;

        jest.spyOn(customFetcher, 'getLoanPrimaryApplicant').mockImplementation(() => Promise.reject());

        await act(async () => {
            component = render(<LoanPrimaryApplicantWithProvider fetcher={customFetcher} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render error state if primary applicant metadata not found', async () => {
        const customFetcher = new MockLoanPrimaryApplicantFetcher();
        let component;

        jest.spyOn(customFetcher, 'getLoanPrimaryApplicantMetadata').mockImplementation(() => Promise.reject());

        await act(async () => {
            component = render(<LoanPrimaryApplicantWithProvider fetcher={customFetcher} />);
        });

        const { getByTestId } = component;

        expect(getByTestId('error-state')).toBeVisible();
    });
});
