import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VerificationStatus from './VerificationStatus';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import verificationStatusControl from '@fsi/core-components/dist/assets/strings/VerificationStatusControl/VerificationStatusControl.1033.json';

describe('VerificationStatus', () => {
    const onChange = jest.fn();

    beforeEach(() => {
        onChange.mockReset();
    });

    it('Should click on verified', async () => {
        const { getByText } = render(<VerificationStatus onChange={onChange} verificationStatus={mockLoanCustomers[0].verificationStatus} />);

        fireEvent.click(getByText(verificationStatusControl.VERIFIED));
        expect(onChange).toBeCalled();
    });

    it('Should be checked if verified', async () => {
        const { container } = render(<VerificationStatus onChange={onChange} verificationStatus={mockLoanCustomers[0].verificationStatus} />);

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-checked')).toEqual('true');
    });

    it('Should be unchecked if not verified', async () => {
        const { container } = render(<VerificationStatus onChange={onChange} verificationStatus={mockLoanCustomers[1].verificationStatus} />);

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes[0].getAttribute('aria-checked')).toEqual('false');
    });
});
