import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { LoanCustomerLookup } from './LoanCustomerLookup';
import {
    MockLoanApplicationCustomerFetcher,
    MockLoanApplicationCustomerFetcherNotPrivileged,
} from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomerFetcher.mocks';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import loanCustomerLookupControl from '@fsi/core-components/dist/assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';
import { DialogServiceContext, initialDialogServiceContextValue } from '@fsi/core-components/dist/services/DialogService/DialogService';
import { ADD_PARTY_DIALOG_ID, REMOVE_PARTY_DIALOG_ID } from '../../constants/LoanCustomer.consts';

const ProvidedCustomerLookup = ProviderWrapper(LoanCustomerLookup);

describe('LoanCustomerLookup', () => {
    it('should render loan customer lookup component', async () => {
        const { container } = render(
            <ProvidedCustomerLookup fetcher={new MockLoanApplicationCustomerFetcher()} loanApplicationId="" onApplicantSelectCallback={() => {}} />
        );

        expect(container).toBeInTheDocument();
    });

    it('should render add party button', async () => {
        const { findByTestId } = render(
            <ProvidedCustomerLookup fetcher={new MockLoanApplicationCustomerFetcher()} loanApplicationId="" onApplicantSelectCallback={() => {}} />
        );

        const addButton = await findByTestId('add-party-button');
        expect(addButton).toBeVisible();
    });

    it('should render add party button disabled when missing privilege', async () => {
        const { findByTestId } = render(
            <ProvidedCustomerLookup
                fetcher={new MockLoanApplicationCustomerFetcherNotPrivileged()}
                loanApplicationId=""
                onApplicantSelectCallback={() => {}}
            />
        );

        const addButton = await findByTestId('add-party-button');
        expect(addButton).toBeVisible();
        expect(addButton).toBeDisabled();
    });

    it('should disable remove party button when missing privilege', async () => {
        const { getByTestId, getByRole } = render(
            <ProvidedCustomerLookup
                fetcher={new MockLoanApplicationCustomerFetcherNotPrivileged()}
                loanApplicationId=""
                onApplicantSelectCallback={() => {}}
            />
        );

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const removeButton = getByRole('menuitem');
        expect(removeButton.getAttribute('aria-disabled')).toEqual('true');
    });

    it('should open add party dialog', async () => {
        const { getByTestId } = render(
            <DialogServiceContext.Provider
                value={{
                    ...initialDialogServiceContextValue,
                    isOpen: true,
                    currentDialogId: ADD_PARTY_DIALOG_ID,
                }}
            >
                <ProvidedCustomerLookup
                    fetcher={new MockLoanApplicationCustomerFetcher()}
                    loanApplicationId=""
                    onApplicantSelectCallback={() => {}}
                />
            </DialogServiceContext.Provider>
        );

        const addPartyButton = getByTestId('add-party-button');
        fireEvent.click(addPartyButton);

        expect(getByTestId('add-party-form')).toBeInTheDocument();
    });

    it('should open remove party dialog', async () => {
        const { getByTestId, getByText } = render(
            <DialogServiceContext.Provider
                value={{
                    ...initialDialogServiceContextValue,
                    isOpen: true,
                    currentDialogId: REMOVE_PARTY_DIALOG_ID,
                }}
            >
                <ProvidedCustomerLookup
                    fetcher={new MockLoanApplicationCustomerFetcher()}
                    loanApplicationId=""
                    onApplicantSelectCallback={() => {}}
                />
            </DialogServiceContext.Provider>
        );

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const removeButton = getByText(loanCustomerLookupControl.REMOVE_PARTY_BUTTON_TEXT);
        fireEvent.click(removeButton);

        expect(getByText(loanCustomerLookupControl.REMOVE_PARTY_CONFIRMATION_DIALOG_TITLE_TEXT)).toBeInTheDocument();
    });
});
