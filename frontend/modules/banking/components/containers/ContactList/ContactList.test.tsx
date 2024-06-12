import React from 'react';
import { render } from '@testing-library/react';
import ContactCard from './ContactList';
import ICustomerFH from '../../../interfaces/FHEntity/CustomerFH';
import { getCustomersMock } from '../CustomersTable/Customer.mock';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';

describe('ContactList', () => {
    let contacts: ICustomerFH[];

    beforeEach(() => {
        contacts = getCustomersMock();
    });

    it('Should render related contacts with 4 contacts', async () => {
        const { getByText } = render(
            <ContactCard roleMetaData={FHMetadataMock.role} contacts={contacts} customersLoadingState={LoadingState.Success} />
        );

        expect(getByText(contacts[0].contact.fullName)).toBeVisible();
        expect(contacts).toHaveLength(4);
    });

    it('Should render empty ContactList with no contacts', async () => {
        const { queryByTestId } = render(<ContactCard roleMetaData={FHMetadataMock.role} contacts={[]} customersLoadingState={LoadingState.None} />);

        expect(queryByTestId(/test-contact/i)).toBeNull();
    });

    it('Should render empty ContactList with no rules', async () => {
        const { queryAllByTestId, queryByTestId } = render(<ContactCard contacts={[]} customersLoadingState={LoadingState.Success} />);

        const getContact = queryAllByTestId(/test-contact/i);
        expect(getContact).toHaveLength(0);
        expect(queryByTestId(/test-contact/i)).toBeNull();
    });

    it('Should render error state', async () => {
        const { queryByTestId, getByText } = render(<ContactCard contacts={[]} customersLoadingState={LoadingState.Error} />);

        expect(queryByTestId('error-state')).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should render loading', async () => {
        const { queryByTestId } = render(<ContactCard contacts={[]} customersLoadingState={LoadingState.Loading} />);

        expect(queryByTestId(/shimmer-progress/i)).toBeInTheDocument();
    });
});
