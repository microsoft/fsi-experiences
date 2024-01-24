import React from 'react';
import { IButtonProps, IDialogFooterProps, IDialogProps } from '@fluentui/react';

export interface ICustomDialogProps extends IDialogProps {
    title?: string;
    acceptButtonText?: string;
    cancelButtonText?: string;
    footerProps?: IDialogFooterProps;
    acceptButtonProps?: IButtonProps;
    cancelButtonProps?: IButtonProps;
    onAccept?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDismiss?: () => void;
}
