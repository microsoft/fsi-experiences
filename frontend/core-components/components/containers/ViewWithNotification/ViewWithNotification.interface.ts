import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import { FC } from 'react';

export interface IViewWithNotificationProps {
    displayNotification?: boolean;
    notificationContent?: FC<any> | string;
    notificationType?: MessageBarType;
    onDismissNotification?: () => void;
}
