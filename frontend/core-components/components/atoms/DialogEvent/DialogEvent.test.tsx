import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import DialogEvent from './DialogEvent';
import commonStrings from '../../../assets/strings/common/common.1033.json';

describe('DialogEvent', () => {
    const actionOnClick = jest.fn();
    const onDialogDismiss = jest.fn();

    const props = {
        visible: true,
        dialogContentProps: {},
        actionOnClick: actionOnClick,
        onDialogDismiss: onDialogDismiss,
        actionButtonName: 'test-title',
        cancelActionButtonName: commonStrings.DONE,
        modalProps: {},
    };

    beforeEach(() => {
        actionOnClick.mockClear();
        onDialogDismiss.mockClear();
    });

    it('Should show dialog event and cancel', async () => {
        const { getByText } = render(<DialogEvent {...props} />);

        fireEvent.click(getByText(props.cancelActionButtonName));
        expect(onDialogDismiss).toBeCalled();
        expect(getByText('test-title')).not.toBeVisible();
    });

    it('Should show dialog event and click on action', async () => {
        const { getByTestId, getByText } = render(<DialogEvent {...props} />);

        fireEvent.click(getByTestId('action-button-dialog'));
        expect(actionOnClick).toBeCalled();
        expect(getByText('test-title')).not.toBeVisible();
    });
    //
});
