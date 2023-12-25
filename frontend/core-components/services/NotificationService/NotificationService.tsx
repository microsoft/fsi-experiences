import React, { FC, useMemo, useReducer, useContext } from 'react';
import { IToastNotificationProps, ToastNotification as ToastMessage } from '../../components/containers/ToastNotification';
import { notificationIconProps } from './NotificationService.style';
import { NOTIFICATION_STATES, NOTIFICATION_TYPES } from './NotificationService.const';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];
export type NotificationStateOption = typeof NOTIFICATION_STATES[keyof typeof NOTIFICATION_STATES];
export interface MessageContext {
    message: string;
    type?: NotificationType;
}

export interface INotificationContext extends MessageContext {
    currentState: NotificationStateOption;
    show: (context: MessageContext) => void;
    hide: () => void;
}

export const initialNotificationContextValue = {
    currentState: NOTIFICATION_STATES.HIDDEN as INotificationContext['currentState'],
    message: '',
    type: 'info' as NotificationType,
    show: context => {},
    hide: () => {},
};

export const NotificationServiceContext = React.createContext<INotificationContext>(initialNotificationContextValue);

export const NotificationActions = {
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

export const NotificationReducer = (state: any, action: { type: string; payload?: MessageContext }) => {
    switch (action.type) {
        case NotificationActions.SHOW_NOTIFICATION: {
            const payload = action.payload;

            return {
                ...state,
                currentState: NOTIFICATION_STATES.SHOWN,
                message: payload?.message,
                type: payload?.type,
            };
        }
        case NotificationActions.HIDE_NOTIFICATION: {
            return {
                ...state,
                currentState: NOTIFICATION_STATES.HIDDEN,
                message: '',
                type: 'info',
            };
        }
        default: {
            return state;
        }
    }
};

export const NotificationProvider: FC<{}> = ({ children }) => {
    const [state, dispatch] = useReducer(NotificationReducer, initialNotificationContextValue);

    const show = (context: MessageContext) => {
        dispatch({ type: NotificationActions.SHOW_NOTIFICATION, payload: context });
    };

    const hide = () => {
        dispatch({ type: NotificationActions.HIDE_NOTIFICATION });
    };

    const value = useMemo(
        () => ({
            ...state,
            show,
            hide,
        }),
        [state]
    );

    return <NotificationServiceContext.Provider value={value}>{children}</NotificationServiceContext.Provider>;
};

export const ToastNotification = (props: Partial<IToastNotificationProps>) => {
    const {
        palette: { themePrimary },
    } = useTheme();

    const { message, currentState, hide, type = 'info' } = useContext(NotificationServiceContext);

    return (
        <ToastMessage messageBarIconProps={notificationIconProps(themePrimary)[type]} {...props} isOpen={currentState === 'shown'} onClose={hide}>
            {message}
        </ToastMessage>
    );
};

export default NotificationProvider;
