import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LoanProgressOverviewList from './LoanProgressOverviewList';
import { loanProgressDataMock } from '../../../interfaces/ILoanProgressOverview/mocks/ILoanProgressData.mocks';

describe('LoanProgressOverviewList', () => {
    it('should render list columns', () => {
        const component = render(<LoanProgressOverviewList loanProgressData={loanProgressDataMock} />);

        const { queryAllByRole } = component;

        expect(queryAllByRole('columnheader')).toHaveLength(4);
    });

    it('should render row with app section name', () => {
        const component = render(<LoanProgressOverviewList loanProgressData={loanProgressDataMock} />);

        const { getByText } = component;

        expect(getByText(loanProgressDataMock[0].name)).toBeVisible();
    });

    it('should render row with verified complete', () => {
        const component = render(<LoanProgressOverviewList loanProgressData={loanProgressDataMock} />);

        const { getByTestId } = component;

        expect(getByTestId('verify-complete-text')).toBeVisible();
    });

    it('should render row with no icon if not completed', () => {
        const component = render(<LoanProgressOverviewList loanProgressData={loanProgressDataMock} />);

        const { queryByTestId } = component;

        expect(queryByTestId('completed-icon')).toBeNull();
    });

    it('should render row with completed icon', () => {
        const loanData = [...loanProgressDataMock];
        loanData[0] = { ...loanData[0], completed: loanData[0].total };

        const component = render(<LoanProgressOverviewList loanProgressData={loanData} />);

        const { queryByTestId } = component;

        expect(queryByTestId('completed-icon')).toBeVisible();
    });

    it('should call open tab function', () => {
        const newDataMock = { ...loanProgressDataMock[0], openTabFunc: jest.fn() };

        const component = render(<LoanProgressOverviewList loanProgressData={[newDataMock]} />);

        const { getByTestId } = component;

        const openTabButton = getByTestId('open-tab');
        expect(openTabButton).toBeVisible();

        fireEvent.click(openTabButton);

        expect(newDataMock.openTabFunc).toBeCalled();
    });
});
