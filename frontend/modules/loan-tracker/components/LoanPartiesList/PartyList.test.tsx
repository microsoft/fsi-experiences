import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import loanCustomerLookupControl from '@fsi/core-components/dist/assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';
import verificationStatusControl from '@fsi/core-components/dist/assets/strings/VerificationStatusControl/VerificationStatusControl.1033.json';
import { PartyList } from './PartyList';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { VERIFICATION_STATUSES } from '../../constants/LoanStateMap.consts';

let isMediaMatched = false;
jest.mock('@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener', () => {
    return jest.fn(() => isMediaMatched);
});

describe('PartList', () => {
    const onChange = jest.fn();
    const onVerifyToggle = jest.fn();
    const onAddApplicant = jest.fn();
    const onRemoveApplicant = jest.fn();
    const defaultHasPrivilege = jest.fn().mockReturnValue(true);
    const compToRender = (item, hasApplicantPrivilege = defaultHasPrivilege) => (
        <PartyList
            items={mockLoanCustomers}
            onChange={onChange}
            onVerifyToggle={onVerifyToggle}
            onAddApplicant={onAddApplicant}
            onRemoveApplicant={onRemoveApplicant}
            selectedApplicantId={item.id}
            hasApplicantPrivilege={hasApplicantPrivilege}
        />
    );

    beforeEach(() => {
        isMediaMatched = false;
        onChange.mockClear();
        onVerifyToggle.mockClear();
        onAddApplicant.mockClear();
        onRemoveApplicant.mockClear();
    });

    it('Should render party list', async () => {
        const { getByText, getAllByText } = render(compToRender(mockLoanCustomers[0]));

        expect(getByText(loanCustomerLookupControl.PRIMARY_APPLICANT)).toBeInTheDocument();
        expect(getAllByText(verificationStatusControl.VERIFIED).length).toEqual(2);
    });

    it('Should render responsive party list', async () => {
        isMediaMatched = true;

        const { getByTestId, getAllByText } = render(compToRender(mockLoanCustomers[0]));

        expect(getByTestId('applicants-dropdown')).toBeInTheDocument();
        expect(getAllByText(verificationStatusControl.VERIFIED).length).toEqual(1);
    });

    it('Should render selected persona', async () => {
        isMediaMatched = true;

        const { getByTestId, getByText } = render(compToRender(mockLoanCustomers[0]));

        expect(getByTestId('title-persona')).toBeVisible();
        expect(getByText(mockLoanCustomers[0].fullName)).toBeVisible();
    });

    it('Should click on member', async () => {
        const { getByText } = render(compToRender(mockLoanCustomers[0]));

        fireEvent.click(getByText(mockLoanCustomers[0].fullName));
        expect(onChange).toBeCalledWith(mockLoanCustomers[0].id);
    });

    it('Should click on dropdown to show list of applicants', async () => {
        isMediaMatched = true;

        const { queryAllByTestId, getByTestId } = render(compToRender(mockLoanCustomers[0]));

        fireEvent.click(getByTestId('applicants-dropdown'));
        expect(queryAllByTestId('applicant-persona')).toHaveLength(2);
    });

    it('Should click on verified', async () => {
        const { getAllByText } = render(compToRender(mockLoanCustomers[0]));

        fireEvent.click(getAllByText(verificationStatusControl.VERIFIED)[1]);
        expect(onVerifyToggle).toBeCalledWith({ ...mockLoanCustomers[1], verificationStatus: VERIFICATION_STATUSES.Verified });
        expect(onChange).not.toBeCalled();
    });

    it('Should click on verified on small windows', async () => {
        isMediaMatched = true;

        const { getByText } = render(compToRender(mockLoanCustomers[0]));

        fireEvent.click(getByText(verificationStatusControl.VERIFIED));
        expect(onVerifyToggle).toBeCalledWith({ ...mockLoanCustomers[0], verificationStatus: VERIFICATION_STATUSES.Unverified });
    });

    it('Should be checked if verified', async () => {
        const { container } = render(compToRender(mockLoanCustomers[0]));

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-checked')).toEqual('true');
        expect(checkboxes[1].getAttribute('aria-checked')).toEqual('false');
    });

    it('Verified checkbox should be enabled if has privilege', async () => {
        const { container } = render(compToRender(mockLoanCustomers[0]));

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-disabled')).toEqual('false');
        expect(checkboxes[1].getAttribute('aria-disabled')).toEqual('false');
    });

    it('Verified checkbox should be disabled if missing privilege', async () => {
        const { container } = render(compToRender(mockLoanCustomers[0], jest.fn().mockReturnValue(false)));

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-disabled')).toEqual('true');
        expect(checkboxes[1].getAttribute('aria-disabled')).toEqual('true');
    });

    it('Should click on add applicant on small windows', () => {
        isMediaMatched = true;

        const { getByText, getByTestId } = render(compToRender(mockLoanCustomers[0]));

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const addButton = getByText(loanCustomerLookupControl.ADD_NEW_PARTY_BUTTON);
        fireEvent.click(addButton);

        expect(onAddApplicant).toBeCalled();
    });

    it('Should click on remove applicant on small windows', () => {
        isMediaMatched = true;

        const { getByText, getByTestId } = render(compToRender(mockLoanCustomers[1]));

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const removeButton = getByText(loanCustomerLookupControl.REMOVE_PARTY_BUTTON_TEXT);
        fireEvent.click(removeButton);

        expect(onRemoveApplicant).toBeCalledWith(mockLoanCustomers[1].id);
    });

    it('Add and remove applicant are disabled on small windows', () => {
        isMediaMatched = true;

        const { getByText, getByTestId } = render(compToRender(mockLoanCustomers[1], jest.fn().mockReturnValue(false)));

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const removeButton = getByText(loanCustomerLookupControl.REMOVE_PARTY_BUTTON_TEXT);
        fireEvent.click(removeButton);
        expect(onRemoveApplicant).not.toBeCalled();

        const addButton = getByText(loanCustomerLookupControl.ADD_NEW_PARTY_BUTTON);
        fireEvent.click(addButton);
        expect(onAddApplicant).not.toBeCalled();
    });
});
