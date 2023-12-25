import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { MessageContext, NotificationServiceContext } from '.';
import NotificationProvider, { initialNotificationContextValue, NotificationReducer, ToastNotification } from './NotificationService';

describe('NotificationReducer', () => {
    it('should return the initial state', () => {
        expect(
            NotificationReducer(initialNotificationContextValue, {
                type: '',
            })
        ).toEqual(initialNotificationContextValue);
    });

    it('should handle SHOW_NOTIFICATION', () => {
        const payload: MessageContext = {
            message: 'test',
            type: 'error',
        };

        expect(
            NotificationReducer(initialNotificationContextValue, {
                type: 'SHOW_NOTIFICATION',
                payload,
            })
        ).toEqual({
            ...initialNotificationContextValue,
            currentState: 'shown',
            ...payload,
        });
    });

    it('should handle HIDE_NOTIFICATION', () => {
        expect(
            NotificationReducer(initialNotificationContextValue, {
                type: 'HIDE_NOTIFICATION',
            })
        ).toEqual({
            ...initialNotificationContextValue,
            currentState: 'hidden',
            message: '',
            type: 'info',
        });
    });
});

const MockComp = () => {
    const { show, hide } = useContext(NotificationServiceContext);

    return (
        <div>
            <button onClick={() => show({ message: 'hello' })}>Show</button>
            <button onClick={() => hide()}>Hide</button>
        </div>
    );
};

describe('NotificationProvider', () => {
    it('should the component with notification wrapped', async () => {
        const { getByText, getByTestId } = render(
            <NotificationProvider>
                <MockComp />
                <ToastNotification />
            </NotificationProvider>
        );

        const btn = getByText('Show');

        await act(async () => {
            await fireEvent.click(btn);
        });

        expect(getByTestId('popup-message')).toBeInTheDocument();
    });

    it('should trigger dispatch hide notification', async () => {
        const { getByText, queryByTestId } = render(
            <NotificationServiceContext.Provider value={{ ...initialNotificationContextValue, currentState: 'hidden', message: 'test' }}>
                <MockComp />
                <ToastNotification />
            </NotificationServiceContext.Provider>
        );

        const btn = getByText('Hide');

        await act(async () => {
            await fireEvent.click(btn);
        });

        expect(queryByTestId('popup-message')).toBeNull();
    });
});

describe('ToastNotification', () => {
    it('should render component', () => {
        const { getByTestId } = render(
            <NotificationServiceContext.Provider value={{ ...initialNotificationContextValue, currentState: 'shown', message: 'test' }}>
                <ToastNotification />
            </NotificationServiceContext.Provider>
        );

        expect(getByTestId('popup-message')).toBeInTheDocument();
    });

    it('should not render component', () => {
        const { queryByTestId } = render(
            <NotificationServiceContext.Provider value={{ ...initialNotificationContextValue, currentState: 'hidden', message: 'test' }}>
                <ToastNotification />
            </NotificationServiceContext.Provider>
        );

        expect(queryByTestId('popup-message')).toBeNull();
    });
});
