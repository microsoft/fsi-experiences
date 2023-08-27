import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import verificationStatusControl from '@fsi/core-components/dist/assets/strings/VerificationStatusControl/VerificationStatusControl.1033.json';
import loanCustomerLookupControl from '@fsi/core-components/dist/assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';
import cellRenderer from './cellRenderer';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { VERIFICATION_STATUSES } from '../../constants/LoanStateMap.consts';

describe('PartList - cellRenderer', () => {
    const onChange = jest.fn();
    const onVerifyToggle = jest.fn();
    const onRemoveApplicant = jest.fn();
    const defaultHasPrivilege = jest.fn().mockReturnValue(true);

    const CellRenderer = ({ item, hasApplicantPrivilege = defaultHasPrivilege }) => {
        const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);

        return (
            <div>
                {cellRenderer({
                    onChange,
                    selectedApplicantId: item?.id,
                    onVerifyToggle,
                    onRemoveApplicant,
                    translate,
                    themePrimary: 'blue',
                    hasApplicantPrivilege,
                })(item)}
            </div>
        );
    };

    beforeEach(() => {
        onChange.mockReset();
        onVerifyToggle.mockReset();
        onRemoveApplicant.mockReset();
    });

    it('Should render cellRenderer', async () => {
        const { getByText } = render(<CellRenderer item={mockLoanCustomers[0]} />);

        expect(getByText(loanCustomerLookupControl.PRIMARY_APPLICANT)).toBeInTheDocument();
        expect(getByText(verificationStatusControl.VERIFIED)).toBeInTheDocument();
    });

    it('Should render cellRenderer if null', async () => {
        const { queryByText } = render(<CellRenderer item={null} />);

        expect(queryByText(loanCustomerLookupControl.PRIMARY_APPLICANT)).toBeNull();
    });

    it('Should click on verified', async () => {
        const { getByText } = render(<CellRenderer item={mockLoanCustomers[0]} />);

        fireEvent.click(getByText(verificationStatusControl.VERIFIED));
        expect(onVerifyToggle).toBeCalledWith({ ...mockLoanCustomers[0], verificationStatus: VERIFICATION_STATUSES.Unverified });
        expect(onChange).not.toBeCalled();
    });

    it('Should click on member', async () => {
        const { getByText } = render(<CellRenderer item={mockLoanCustomers[0]} />);

        fireEvent.click(getByText(mockLoanCustomers[0].fullName));
        expect(onChange).toBeCalledWith(mockLoanCustomers[0].id);
    });

    it('Should be checked if verified', async () => {
        const { container } = render(<CellRenderer item={mockLoanCustomers[0]} />);

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-checked')).toEqual('true');
    });

    it('Verified should be disabled when missing privilege', async () => {
        const { container } = render(<CellRenderer item={mockLoanCustomers[0]} hasApplicantPrivilege={jest.fn().mockReturnValue(false)} />);

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-disabled')).toEqual('true');
    });

    it('Should not show delete button for primary member', async () => {
        const { queryByTestId } = render(<CellRenderer item={mockLoanCustomers[0]} />);

        const moreButton = queryByTestId('more-button');
        expect(moreButton).toBeNull();
    });

    it('Should click on remove for non primary member', async () => {
        const { getByTestId, getByText } = render(<CellRenderer item={mockLoanCustomers[1]} />);

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const removeButton = getByText(loanCustomerLookupControl.REMOVE_PARTY_BUTTON_TEXT);
        fireEvent.click(removeButton);

        expect(onRemoveApplicant).toBeCalledWith(mockLoanCustomers[1].id);
    });

    it('Should disable remove button when missing privilege', async () => {
        const { getByTestId, getByText } = render(
            <CellRenderer item={mockLoanCustomers[1]} hasApplicantPrivilege={jest.fn().mockReturnValue(false)} />
        );

        const moreButton = getByTestId('more-button');
        fireEvent.click(moreButton);

        const removeButton = getByText(loanCustomerLookupControl.REMOVE_PARTY_BUTTON_TEXT);
        fireEvent.click(removeButton);

        expect(onRemoveApplicant).not.toBeCalled();
    });
});
