import React, { FC } from 'react';
import { DOCUMENT_INTL_CLASS_PREFIX, DOC_STATUS_UPDATE_NOTIFICATION_TIMEOUT } from './constants/DocumentIntelligence.const';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { NotificationProvider, ToastNotification } from '@fsi/core-components/dist/services/NotificationService';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { createPortal } from 'react-dom';
import { diToastNotificationStyles, diToastNotificationWrapperStyles } from './DocumentIntelligence.style';

export const DocumentIntelligenceWrapper: FC = ({ children }) => {
    return (
        <ResponsiveContainer classPrefix={DOCUMENT_INTL_CLASS_PREFIX}>
            <NotificationProvider>
                {children}
                {createPortal(
                    <Stack horizontalAlign="center" styles={diToastNotificationWrapperStyles}>
                        <ToastNotification styles={diToastNotificationStyles} disappearTime={DOC_STATUS_UPDATE_NOTIFICATION_TIMEOUT} />
                    </Stack>,
                    document.body
                )}
            </NotificationProvider>
        </ResponsiveContainer>
    );
};

export default DocumentIntelligenceWrapper;
