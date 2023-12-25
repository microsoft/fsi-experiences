import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Contact from './Contact';
import userEvent from '@testing-library/user-event';

const mockData = {
    contactId: '123456',
    contactName: 'Olaf',
    role: 'Snowman',
};
const mockOpenForm = jest.fn();
jest.mock('../../../context/hooks/useOpenForm', () => {
    return { useOpenForm: () => mockOpenForm };
});

describe('Contact', () => {
    beforeEach(() => {
        mockOpenForm.mockReset();
    });

    it('Should render Contact', () => {
        const { getByText, container } = render(<Contact contactId={mockData.contactId} contactName={mockData.contactName} role={mockData.role} />);

        expect(container.querySelector(`i[data-icon-name="Contact"]`)).toBeVisible();
        expect(getByText('Olaf')).toBeVisible();
    });

    it('Should render Contact with no role', () => {
        const { getByText, queryByTestId, container } = render(<Contact contactId={mockData.contactId} contactName={mockData.contactName} role="" />);

        expect(container.querySelector(`i[data-icon-name="Contact"]`)).toBeVisible();
        expect(getByText('Olaf')).toBeVisible();
        expect(queryByTestId('contact-role')).toBeNull();
    });

    it('Should render Contact with different styles', () => {
        const styles = {
            containerButton: {
                background: 'red',
            },
        };
        const { getByTestId, container } = render(
            <Contact styles={styles} contactId={mockData.contactId} contactName={mockData.contactName} role="" />
        );
        expect(getByTestId('test-contact')).toHaveStyle({
            background: 'red',
        });
    });

    it('Should render clickable Contact by default', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(
            <Contact contactId={mockData.contactId} contactName={mockData.contactName} role="" overrideOnClick={onClick} />
        );

        userEvent.click(getByTestId('test-contact'));
        expect(onClick).toBeCalled();
        expect(mockOpenForm).not.toBeCalled();
    });

    it('Should render not clickable Contact', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(
            <Contact contactId={mockData.contactId} contactName={mockData.contactName} role="" overrideOnClick={onClick} clickable={false} />
        );

        userEvent.click(getByTestId('test-contact'));
        expect(onClick).not.toBeCalled();
    });

    it('Should render clickable Contact without callback', () => {
        const { getByTestId } = render(<Contact contactId={mockData.contactId} contactName={mockData.contactName} role="" clickable={true} />);
        userEvent.click(getByTestId('test-contact'));
        expect(mockOpenForm).toBeCalled();
    });
});
