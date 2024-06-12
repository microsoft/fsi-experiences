import React from 'react';
import NotificationProvider, { ToastNotification } from '@fsi/core-components/dist/services/NotificationService/NotificationService';
import { createPortal } from 'react-dom';

export const NotificationContainerWrapper = ({ children }) => {
    return (
        <NotificationProvider>
            {children}
            {createPortal(<ToastNotification />, document.body)}
        </NotificationProvider>
    );
};
