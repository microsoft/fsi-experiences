import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LoanApplicationArchiveDialog from './LoanApplicationArchiveDialog';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { renderLoanOnboardingContextProvider } from '../../../testUtils';
import { loanArchiveReasonsMock, mockApplications, stepsMock } from '../../../interfaces/ILoanApplication/mocks/ILoanApplication.mocks';
import loanOnBoardingStrings from '@fsi/core-components/dist/assets/strings/LoanOnboardingControl/LoanOnboardingControl.1033.json';

const LoanApplicationArchiveDialogWithProvider = ProviderWrapper(LoanApplicationArchiveDialog);

const mockProps = {
    isOpen: true,
    onCancel: jest.fn(),
    onDismiss: jest.fn(),
    onMoveToArchive: jest.fn(),
};

const mockContext = {
    applications: mockApplications,
    steps: stepsMock,
    archiveReasons: loanArchiveReasonsMock,
    isToastNotificationShown: false,
    archiveApplication: jest.fn(),
    setSelected: jest.fn(),
    setSearchTerm: jest.fn(),
    openToastNotification: jest.fn(),
    hideToastNotification: jest.fn(),
};

describe('LoanApplicationArchiveDialog', () => {
    it('should render category list after loading', () => {
        const { container } = render(renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext));

        expect(container).toBeInTheDocument();
    });

    it('should render list with reasons', () => {
        const { getByTestId } = render(renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext));

        expect(getByTestId('reasons-list')).toBeInTheDocument();
    });

    it('should set selected reason to empty string when there are no archive reasons', () => {
        const cutomMockContext = { ...mockContext, archiveReasons: {} };
        const { queryByRole } = render(renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, cutomMockContext));

        const selectedOption = queryByRole('option');

        expect(selectedOption).toBeNull();
    });

    it('should choose first reason by default', () => {
        const { getByText } = render(renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext));

        expect(getByText(loanArchiveReasonsMock[1])).toBeInTheDocument();
    });

    it('should show reasons in the list', () => {
        const { getByTestId, getAllByRole } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext)
        );

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        // Removing first element because the first element is the selected element and it also has the role "option"
        const options = getAllByRole('option');

        expect(options).toHaveLength(Object.keys(loanArchiveReasonsMock).length);
    });

    it('should show comment field if Other reason was chosen', () => {
        const { getByTestId, getByText } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext)
        );

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        const otherReason = getByText(loanArchiveReasonsMock[6]);
        fireEvent.click(otherReason);

        expect(getByTestId('comment-field')).toBeInTheDocument();
    });

    it('should change comment when there is a value', () => {
        const { getByTestId, getByText } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext)
        );

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        const otherReason = getByText(loanArchiveReasonsMock[6]);
        fireEvent.click(otherReason);

        const newValue = 'test';
        const commentField = getByTestId('comment-field');
        fireEvent.change(commentField, { target: { value: newValue } });

        expect(commentField).toHaveValue(newValue);
    });

    it('should change comment to empty when no value', () => {
        const { getByTestId, getByText } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext)
        );

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        const otherReason = getByText(loanArchiveReasonsMock[6]);
        fireEvent.click(otherReason);

        const commentField = getByTestId('comment-field');
        fireEvent.change(commentField, { target: { value: undefined } });

        expect(commentField).toHaveValue('');
    });

    it('should call moveToArchive method', async () => {
        const { getByText } = render(renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext));

        const moveToArchiveButton = getByText(loanOnBoardingStrings.LOAN_ARCHIVE_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(mockProps.onMoveToArchive).toBeCalled());
    });

    it('should show error dialog', async () => {
        const customProps = { ...mockProps, onMoveToArchive: jest.fn().mockImplementation(() => Promise.reject()) };
        const { getByTestId, getByText } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, customProps, mockContext)
        );

        const moveToArchiveButton = getByText(loanOnBoardingStrings.LOAN_ARCHIVE_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(getByTestId('dialog-error-text')).toBeInTheDocument());

        const errorText = getByText(loanOnBoardingStrings.LOAN_ARCHIVE_DIALOG_ERROR_TEXT.replace('{{loanName}}', ''));
        await waitFor(() => expect(errorText).toBeInTheDocument());
    });

    it('should show error dialog with the selected application name', async () => {
        const customProps = { ...mockProps, onMoveToArchive: jest.fn().mockImplementation(() => Promise.reject()) };
        const customContext = { ...mockContext, selectedApplication: mockApplications[0] };
        const { getByTestId, getByText } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, customProps, customContext)
        );

        const moveToArchiveButton = getByText(loanOnBoardingStrings.LOAN_ARCHIVE_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(getByTestId('dialog-error-text')).toBeInTheDocument());

        const errorText = getByText(
            loanOnBoardingStrings.LOAN_ARCHIVE_DIALOG_ERROR_TEXT.replace('{{loanName}}', customContext.selectedApplication.name)
        );
        await waitFor(() => expect(errorText).toBeInTheDocument());
    });

    it('should show loading dialog', async () => {
        const { getByTestId, getByText } = render(
            renderLoanOnboardingContextProvider(LoanApplicationArchiveDialogWithProvider, mockProps, mockContext)
        );

        const moveToArchiveButton = getByText(loanOnBoardingStrings.LOAN_ARCHIVE_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(getByTestId('spinner')).toBeInTheDocument());
    });
});
