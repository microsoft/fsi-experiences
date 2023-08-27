import React from 'react';
import { render } from '@testing-library/react';
import { loanProgressDataMock } from '../../../interfaces/ILoanProgressOverview/mocks/ILoanProgressData.mocks';
import { LoanProgressOverviewData } from './LoanProgressOverviewData';

describe('LoanProgressOverviewData', () => {
    it('should render loan overview bar', () => {
        const component = render(<LoanProgressOverviewData loanProgressData={loanProgressDataMock} />);
        const { getByTestId } = component;

        expect(getByTestId('loan-overview-bar')).toBeVisible();
    });
});
