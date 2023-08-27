import React, { FC, useReducer, useMemo, useCallback } from 'react';

export interface IDialogServiceContext {
    currentDialogId: string;
    isOpen: boolean;
    context: any;
    showDialog: (dialogId: string, context?: any) => void;
    hideDialog: () => void;
}

/* istanbul ignore next */
export const initialDialogServiceContextValue: IDialogServiceContext = {
    showDialog: () => {},
    hideDialog: () => {},
    context: {},
    currentDialogId: '',
    isOpen: false,
};

export const DialogServiceContext = React.createContext<IDialogServiceContext>(initialDialogServiceContextValue);

export const DIALOG_SERVICE_ACTIONS = {
    SHOW_DIALOG: 'SHOW_DIALOG',
    HIDE_DIALOG: 'HIDE_DIALOG',
    CLEAR_CONTEXT: 'CLEAR_CONTEXT',
};

export const DialogServiceReducer = (state: IDialogServiceContext, action: { type: string; payload: any }) => {
    switch (action.type) {
        case DIALOG_SERVICE_ACTIONS.SHOW_DIALOG: {
            const { dialogId, context } = action.payload;
            if (state.currentDialogId && state.currentDialogId !== dialogId) {
                return state;
            }

            return {
                ...state,
                currentDialogId: dialogId,
                isOpen: true,
                context,
            } as IDialogServiceContext;
        }
        case DIALOG_SERVICE_ACTIONS.HIDE_DIALOG: {
            return {
                ...state,
                currentDialogId: '',
                isOpen: false,
            } as IDialogServiceContext;
        }
        case DIALOG_SERVICE_ACTIONS.CLEAR_CONTEXT: {
            return {
                ...state,
                context: {},
            } as IDialogServiceContext;
        }
        default: {
            return state;
        }
    }
};

export const DialogServiceProvider: FC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer(DialogServiceReducer, initialDialogServiceContextValue);

    const showDialog = useCallback((dialogId: string, context: any) => {
        dispatch({ type: DIALOG_SERVICE_ACTIONS.SHOW_DIALOG, payload: { dialogId, context } });
    }, []);

    const hideDialog = useCallback(() => {
        /* istanbul ignore next */
        const triggerButton = state.context?.triggerButton;
        dispatch({ type: DIALOG_SERVICE_ACTIONS.HIDE_DIALOG, payload: null });
        /* istanbul ignore next */
        setTimeout(() => {
            /* This allows us to focus button, that's triggered modal window,
                in a forcible manner and prevent a screen reader's focus to be caught by the first focusable element in a DOM */
            triggerButton?.focus();
            dispatch({ type: DIALOG_SERVICE_ACTIONS.CLEAR_CONTEXT, payload: {} });
        }, state.context?.triggerFocusTimeout || 1000);
    }, [state]);

    const value = useMemo(
        () => ({
            ...state,
            showDialog,
            hideDialog,
        }),
        [state, showDialog, hideDialog]
    );

    return <DialogServiceContext.Provider value={value}>{children}</DialogServiceContext.Provider>;
};

export default DialogServiceProvider;
