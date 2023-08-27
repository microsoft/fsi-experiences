import { MessageBar } from '@fluentui/react/lib/components/MessageBar/MessageBar';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC } from 'react';
import type { IViewWithNotificationProps } from './ViewWithNotification.interface';

const ViewWithNotification: FC<IViewWithNotificationProps> = ({
    displayNotification = false,
    notificationContent,
    notificationType = MessageBarType.info,
    onDismissNotification,
    children,
}) => {
    const isNotificationVisible = displayNotification && !!notificationContent;
    const NotificationContentComp: FC<{}> =
        typeof notificationContent === 'string' ? () => <>{notificationContent}</> : (notificationContent as FC<any>);

    return (
        <Stack grow>
            {isNotificationVisible && (
                <MessageBar messageBarType={notificationType} onDismiss={onDismissNotification} data-testid="message-bar">
                    <NotificationContentComp />
                </MessageBar>
            )}
            {children}
        </Stack>
    );
};

export default ViewWithNotification;
