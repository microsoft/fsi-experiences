import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import DialogServiceProvider, { initialDialogServiceContextValue, DialogServiceReducer, DialogServiceContext } from './DialogService';

describe('DialogServiceReducer', () => {
    it('should return the initial state', () => {
        expect(
            DialogServiceReducer(initialDialogServiceContextValue, {
                type: '',
                payload: '',
            })
        ).toEqual(initialDialogServiceContextValue);
    });

    it('should handle SHOW_DIALOG', () => {
        const payload = {
            dialogId: '123',
            context: {
                message: 'hello',
            },
        };

        expect(
            DialogServiceReducer(initialDialogServiceContextValue, {
                type: 'SHOW_DIALOG',
                payload,
            })
        ).toEqual({
            ...initialDialogServiceContextValue,
            currentDialogId: payload.dialogId,
            context: payload.context,
            isOpen: true,
        });
    });

    it('should not change state with currentDialogID is not the same for SHOW_DIALOG', () => {
        expect(
            DialogServiceReducer(
                {
                    ...initialDialogServiceContextValue,
                    currentDialogId: '123',
                },
                {
                    type: 'SHOW_DIALOG',
                    payload: '456',
                }
            )
        ).toEqual({
            ...initialDialogServiceContextValue,
            currentDialogId: '123',
        });
    });

    it('should handle HIDE_DIALOG', () => {
        expect(
            DialogServiceReducer(
                {
                    ...initialDialogServiceContextValue,
                    currentDialogId: '123',
                },
                {
                    type: 'HIDE_DIALOG',
                    payload: '123',
                }
            )
        ).toEqual({
            ...initialDialogServiceContextValue,
            isOpen: false,
        });
    });

    it('should handle CLEAR_CONTEXT', () => {
        expect(
            DialogServiceReducer(
                {
                    ...initialDialogServiceContextValue,
                },
                {
                    type: 'CLEAR_CONTEXT',
                    payload: {},
                }
            )
        ).toEqual({
            ...initialDialogServiceContextValue,
        });
    });
});

const MockComp = () => {
    const { showDialog, hideDialog, isOpen } = useContext(DialogServiceContext);

    return (
        <div>
            <button onClick={() => showDialog('test')}>Show</button>
            <button onClick={() => hideDialog()}>Hide</button>
            {isOpen && <div data-testid="test" />}
        </div>
    );
};

describe('DialogServiceProvider', () => {
    it('should the component with notification wrapped', async () => {
        const { getByText, getByTestId } = render(
            <DialogServiceProvider>
                <MockComp />
            </DialogServiceProvider>
        );

        const btn = getByText('Show');

        await act(async () => {
            await fireEvent.click(btn);
        });

        expect(getByTestId('test')).toBeInTheDocument();
    });

    it('should trigger dispatch hide notification', async () => {
        const { getByText, queryByTestId } = render(
            <DialogServiceProvider>
                <MockComp />
            </DialogServiceProvider>
        );

        const showBtn = getByText('Show');

        await act(async () => {
            await fireEvent.click(showBtn);
        });

        const btn = getByText('Hide');

        await act(async () => {
            await fireEvent.click(btn);
        });

        expect(queryByTestId('test')).toBeNull();
    });
});
