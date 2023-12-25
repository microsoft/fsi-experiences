/* istanbul ignore file */
import { useContext } from 'react';
import { INotificationContext, NotificationServiceContext } from '../../services/NotificationService';

export const useNotificationService = (): INotificationContext => {
    const context = useContext(NotificationServiceContext);

    return context;
};
