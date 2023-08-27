import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AddNewPartyDialog } from './AddNewPartyDialog';
import { rolesMock } from '../../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';

const ProvidedAddNewPartyDialog = ProviderWrapper(AddNewPartyDialog);

const props = {
    roles: rolesMock,
    title: 'test',
    addButtonText: 'add',
    onSubmitMutationFunc: jest.fn(),
    onCancel: jest.fn(),
    onDismiss: jest.fn(),
    isOpen: true,
};

describe('AddNewPartyDialog', () => {
    it('should render AddNewPartyDialog component', () => {
        const { container } = render(<ProvidedAddNewPartyDialog {...props} />);

        expect(container).toBeInTheDocument();
    });

    it('should not render if not open', () => {
        const { queryByTestId } = render(<ProvidedAddNewPartyDialog {...props} isOpen={false} />);

        expect(queryByTestId('add-party-form')).toBeNull();
    });

    it('should render list with roles', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        expect(getByTestId('role-field')).toBeInTheDocument();
    });

    it('should show possible roles on click', () => {
        const { getByTestId, getAllByRole } = render(<ProvidedAddNewPartyDialog {...props} />);

        const rolesist = getByTestId('role-field');
        fireEvent.click(rolesist);

        const options = getAllByRole('option');

        expect(options).toHaveLength(props.roles.length);
    });

    it('should update first name on change', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const firstNameField = getByTestId('first-name-field');
        fireEvent.change(firstNameField, { target: { value: 'name' } });

        expect(firstNameField).toHaveValue('name');
    });

    it('should set empty first name if undefined', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const firstNameField = getByTestId('first-name-field');
        fireEvent.change(firstNameField, { target: { value: undefined } });

        expect(firstNameField).toHaveValue('');
    });

    it('should update last name on change', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const lastNameField = getByTestId('last-name-field');
        fireEvent.change(lastNameField, { target: { value: 'last' } });

        expect(lastNameField).toHaveValue('last');
    });

    it('should set empty last name if undefined', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const lastNameField = getByTestId('last-name-field');
        fireEvent.change(lastNameField, { target: { value: undefined } });

        expect(lastNameField).toHaveValue('');
    });

    it('should update email on change', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const emailAddressField = getByTestId('email-address-field');
        fireEvent.change(emailAddressField, { target: { value: 'test@test.com' } });

        expect(emailAddressField).toHaveValue('test@test.com');
    });

    it('should set empty email if undefined', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const emailAddressField = getByTestId('email-address-field');
        fireEvent.change(emailAddressField, { target: { value: '' } });

        expect(emailAddressField).toHaveValue('');
    });

    it('should show error dialog', async () => {
        const customProps = { ...props, onSubmitMutationFunc: jest.fn().mockImplementation(() => Promise.reject()) };
        const firstName = 'name';
        const lastName = 'last';
        const phone = '1234567890';

        const { getByTestId, getAllByRole } = render(<ProvidedAddNewPartyDialog {...customProps} />);

        const rolesist = getByTestId('role-field');
        fireEvent.click(rolesist);

        const options = getAllByRole('option');
        fireEvent.click(options[0]);

        const firstNameField = getByTestId('first-name-field');
        fireEvent.change(firstNameField, { target: { value: firstName } });

        const lastNameField = getByTestId('last-name-field');
        fireEvent.change(lastNameField, { target: { value: lastName } });

        const phoneField = getByTestId('telephone-number-field');
        fireEvent.change(phoneField, { target: { value: phone } });

        const addButton = getByTestId('acceptBtn');
        fireEvent.click(addButton);

        await waitFor(() => expect(getByTestId('dialog-error-text')).toBeInTheDocument());
    });

    it('should call add func when add button clicked', async () => {
        const firstName = 'name';
        const lastName = 'last';
        const phone = '1234567890';

        const { getByTestId, getAllByRole } = render(<ProvidedAddNewPartyDialog {...props} />);

        const rolesist = getByTestId('role-field');
        fireEvent.click(rolesist);

        const options = getAllByRole('option');
        fireEvent.click(options[0]);

        const firstNameField = getByTestId('first-name-field');
        fireEvent.change(firstNameField, { target: { value: firstName } });

        const lastNameField = getByTestId('last-name-field');
        fireEvent.change(lastNameField, { target: { value: lastName } });

        const phoneField = getByTestId('telephone-number-field');
        fireEvent.change(phoneField, { target: { value: phone } });

        const addButton = getByTestId('acceptBtn');
        fireEvent.click(addButton);

        await waitFor(() => expect(props.onSubmitMutationFunc).toBeCalled());
    });

    it('should call onCancel when cancel button clicked', () => {
        const { getByTestId } = render(<ProvidedAddNewPartyDialog {...props} />);

        const cancelButton = getByTestId('cancelBtn');
        fireEvent.click(cancelButton);

        expect(props.onCancel).toBeCalled();
    });
});
