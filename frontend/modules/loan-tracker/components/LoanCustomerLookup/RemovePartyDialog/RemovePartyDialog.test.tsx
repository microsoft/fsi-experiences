import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { RemovePartyDialog } from './RemovePartyDialog';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import loanCustomerLookupControl from '@fsi/core-components/dist/assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';
import { mockLoanCustomers } from '../../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';

const ProvidedRemovePartyDialog = ProviderWrapper(RemovePartyDialog);

const props = {
    title: 'test',
    onSubmitMutationFunc: jest.fn(),
    onCancel: jest.fn(),
    onDismiss: jest.fn(),
    isOpen: true,
    applicantToRemove: mockLoanCustomers[1],
};

describe('RemovePartyDialog', () => {
    it('should render RemovePartyDialog component', () => {
        const { container } = render(<ProvidedRemovePartyDialog {...props} />);

        expect(container).toBeInTheDocument();
    });

    it('should not render if not open', () => {
        const { queryByTestId } = render(<ProvidedRemovePartyDialog {...props} isOpen={false} />);

        expect(queryByTestId('add-party-form')).toBeNull();
    });

    it('should show error dialog', async () => {
        const customProps = { ...props, onSubmitMutationFunc: jest.fn().mockImplementation(() => Promise.reject()) };

        const { getByTestId } = render(<ProvidedRemovePartyDialog {...customProps} />);

        const removeButton = getByTestId('acceptBtn');
        fireEvent.click(removeButton);

        await waitFor(() => expect(getByTestId('dialog-error-text')).toBeInTheDocument());
    });

    it('should call remove func when remove button clicked', async () => {
        const { getByTestId } = render(<ProvidedRemovePartyDialog {...props} />);

        const removeButton = getByTestId('acceptBtn');
        fireEvent.click(removeButton);

        await waitFor(() => expect(props.onSubmitMutationFunc).toBeCalled());
    });

    it('should call onCancel when cancel button clicked', () => {
        const { getByTestId } = render(<ProvidedRemovePartyDialog {...props} />);

        const cancelButton = getByTestId('cancelBtn');
        fireEvent.click(cancelButton);

        expect(props.onCancel).toBeCalled();
    });

    it('should show delete applicant text', () => {
        const { getByText } = render(<ProvidedRemovePartyDialog {...props} />);

        const removeText = loanCustomerLookupControl.REMOVE_PARTY_CONFIRMATION_DIALOG_TEXT.replace(
            '{{applicantFullName}}',
            props.applicantToRemove.fullName
        ).replace('{{role}}', props.applicantToRemove.role);

        expect(getByText(removeText)).toBeInTheDocument();
    });
});
