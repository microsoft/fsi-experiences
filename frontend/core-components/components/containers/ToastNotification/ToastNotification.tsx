import React, { FC, useEffect, useMemo, useRef } from 'react';
import { popupStyles } from './ToastNotification.style';
import { IToastNotificationProps } from './ToastNotification.interface';
import { MessageBar } from '@fluentui/react/lib/components/MessageBar/MessageBar';
import { defaultPopupNotificationDisappearTime } from './ToastNotification.consts';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

export const ToastNotification: FC<IToastNotificationProps> = ({
    isOpen,
    disappearTime = defaultPopupNotificationDisappearTime,
    onClose,
    messageBarIconProps,
    styles: externalStyles,
    children,
}) => {
    const closeTimeoutFunc = useRef<NodeJS.Timeout>(); // eslint-disable-line

    const basePopupStyles = useMemo(() => mergeStyleSets(popupStyles, externalStyles), [externalStyles]);

    useEffect(() => {
        if (isOpen && disappearTime) {
            closeTimeoutFunc.current = setTimeout(() => onClose(), disappearTime);
        }
        return () => cancelTimeout();
    }, [isOpen, disappearTime]);

    const cancelTimeout = () => {
        if (closeTimeoutFunc.current) {
            clearTimeout(closeTimeoutFunc.current);
        }
    };

    const hidePopup = () => {
        cancelTimeout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <MessageBar
            styles={basePopupStyles}
            messageBarIconProps={messageBarIconProps}
            isMultiline={false}
            onDismiss={hidePopup}
            data-testid="popup-message"
        >
            {children}
        </MessageBar>
    );
};

export default ToastNotification;
