import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Dialog from './Dialog';

describe('Dialog', () => {
    let dialogProps;
    let onDismissMock;

    beforeEach(() => {
        dialogProps = {
            title: 'My Dialog',
        };
        onDismissMock = jest.fn();
    });

    it('Should NOT be rendered in DOM', () => {
        render(<Dialog {...dialogProps} />);
        const dialog = screen.queryByRole('dialog');
        expect(dialog).toBeNull();
    });

    it('Should be rendered in DOM, and be visible', () => {
        render(<Dialog {...dialogProps} hidden={false} />);
        const dialog = screen.queryByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });

    it('Should call onDismiss handler, when Close button (X icon) is pressed', () => {
        const { getByTitle } = render(
            <Dialog {...dialogProps} dialogContentProps={{ closeButtonAriaLabel: 'Reject' }} hidden={false} onDismiss={onDismissMock} />
        );

        const closeBtn = getByTitle('Reject');

        fireEvent.click(closeBtn);

        expect(onDismissMock).toHaveBeenCalled();
    });

    it('Should call onCancel handler, when Cancel button is pressed', () => {
        const onCancelMockHandler = jest.fn();
        const { getByTestId } = render(<Dialog {...dialogProps} hidden={false} onCancel={onCancelMockHandler} />);

        const cancelBtn = getByTestId('cancelBtn');

        fireEvent.click(cancelBtn);

        expect(onCancelMockHandler).toHaveBeenCalled();
    });

    it('Should not render cancel button', () => {
        const onAcceptMockHandler = jest.fn();
        const { queryByTestId } = render(<Dialog {...dialogProps} hidden={false} onAccept={onAcceptMockHandler} />);

        const cancelBtn = queryByTestId('cancelBtn');

        expect(cancelBtn).toBeNull();
    });

    it('Should not render accept button', () => {
        const onCancelMockHandler = jest.fn();
        const { queryByTestId } = render(<Dialog {...dialogProps} hidden={false} onCancel={onCancelMockHandler} />);

        const acceptBtn = queryByTestId('acceptBtn');

        expect(acceptBtn).toBeNull();
    });

    it('Should not render accept and cancel button', () => {
        const { queryByTestId } = render(<Dialog {...dialogProps} hidden={false} />);

        const acceptBtn = queryByTestId('acceptBtn');
        const cancelBtn = queryByTestId('cancelBtn');

        expect(acceptBtn).toBeNull();
        expect(cancelBtn).toBeNull();
    });

    it('Should call onAccept handler, when Accept button is pressed', () => {
        const onAcceptMockHandler = jest.fn();
        const { getByTestId } = render(<Dialog {...dialogProps} hidden={false} onAccept={onAcceptMockHandler} />);

        const acceptBtn = getByTestId('acceptBtn');

        fireEvent.click(acceptBtn);

        expect(onAcceptMockHandler).toHaveBeenCalled();
    });
});
