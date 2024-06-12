import React from 'react';
import { render } from '@testing-library/react';
import AnnualIncome from './AnnualIncome';
import mainHouseholdStrings from '../../../assets/strings/MainHousehold/MainHousehold.1033.json';

describe('AnnualIncome', () => {
    it('Should render AnnualIncome', () => {
        const { getByText } = render(<AnnualIncome annualIncome={1000} />);

        expect(getByText(mainHouseholdStrings.ANNUAL_INCOME)).toBeInTheDocument();
    });

    it('Should render AnnualIncome compact', () => {
        const { getByText, queryByTestId } = render(<AnnualIncome isCompact annualIncome={1000} />);

        expect(getByText(mainHouseholdStrings.ANNUAL_INCOME)).toBeInTheDocument();
        expect(queryByTestId('group-financial-data-view-separator')).not.toBeInTheDocument();
    });

    it('Should render AnnualIncome with 0', () => {
        const { getByText } = render(<AnnualIncome annualIncome={0} />);

        expect(getByText(mainHouseholdStrings.NOT_AVAILABLE)).toBeInTheDocument();
    });
});
