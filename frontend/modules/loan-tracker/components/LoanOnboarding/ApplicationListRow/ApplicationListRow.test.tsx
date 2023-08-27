import ApplicationListRow from './ApplicationListRow';
import { act, fireEvent, render } from '@testing-library/react';
import { ILoanApplication } from '../../../interfaces/ILoanApplication/ILoanApplication';
import { mockApplications } from '../../../interfaces/ILoanApplication/mocks/ILoanApplication.mocks';
import { ILoanOnboardingContext, initialOnboardingValue } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import { renderLoanOnboardingContextProvider } from '../../../testUtils';

describe('ApplicationListRow', () => {
    const mockApplication: ILoanApplication = mockApplications[0];

    it('should render the component', () => {
        const { container, queryByText, queryByTestId } = render(
            renderLoanOnboardingContextProvider(ApplicationListRow, { application: mockApplication }, initialOnboardingValue)
        );

        expect(container).toBeInTheDocument();
        expect(queryByText(mockApplication.name)).toBeVisible();
        expect(queryByText(mockApplication.loanType)).toBeVisible();

        const statusIcon = queryByTestId(/row-status-icon/);
        expect(statusIcon?.dataset.iconName).toBe('Completed');
    });

    it('should render a single persona', () => {
        const { queryByTestId } = render(
            renderLoanOnboardingContextProvider(ApplicationListRow, { application: mockApplication }, initialOnboardingValue)
        );

        expect(queryByTestId(/row-applicant-persona/)).toBeVisible();
        const applicantsContainer = queryByTestId(/row-applicant-wrapper/);

        expect(applicantsContainer?.getElementsByClassName('row-applicant-wrapper').length).toEqual(0);
    });

    it('should trigger setSelected when click on row', async () => {
        const mockContextValue: ILoanOnboardingContext = {
            ...initialOnboardingValue,
            setSelected: jest.fn(),
        };

        const { getByTestId } = render(renderLoanOnboardingContextProvider(ApplicationListRow, { application: mockApplication }, mockContextValue));

        const row = getByTestId(/application-row/);

        await act(async () => {
            await fireEvent.click(row);
        });

        expect(mockContextValue.setSelected).toBeCalled();
    });

    it('should highlight the row if selected', () => {
        const mockContextValue: ILoanOnboardingContext = {
            ...initialOnboardingValue,
            selectedApplication: mockApplication,
        };

        const mockProps = {
            application: mockApplication,
            styles: {
                root: {
                    padding: '5px',
                },
            },
        };

        const { getByTestId } = render(renderLoanOnboardingContextProvider(ApplicationListRow, mockProps, mockContextValue));

        const row = getByTestId(/application-row/);

        expect(row.dataset.isSelected).toEqual('true');
    });

    it('should take additional className', () => {
        const mockProps = {
            application: mockApplication,
            className: 'hello',
        };

        const { container } = render(renderLoanOnboardingContextProvider(ApplicationListRow, mockProps, initialOnboardingValue));

        expect(container.getElementsByClassName('hello').length).toEqual(1);
    });
});
