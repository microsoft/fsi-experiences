import React, { FC } from 'react';
import { Dialog as FluentDialog, DialogFooter as FluentDialogFooter } from '@fluentui/react/lib/components/Dialog';
import { PrimaryButton } from '@fluentui/react/lib/components/Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from '@fluentui/react/lib/components/Button/DefaultButton/DefaultButton';
import type { ICustomDialogProps } from './Dialog.interface';
import { dialogButtonStyles, DialogStyles } from './Dialog.style';
import { useTranslation } from '../../../context/hooks/useTranslation';
import { dialogContentDefaultProps } from './Dialog.const';

export const Dialog: FC<ICustomDialogProps> = props => {
    const { children, title = '', acceptButtonText, cancelButtonText, onAccept, onCancel, onDismiss } = props;

    const translate = useTranslation();

    const acceptButtonTranslatedText = acceptButtonText || translate('ACCEPT');
    const cancelButtonTranslatedText = cancelButtonText || translate('CANCEL');
    dialogContentDefaultProps.closeButtonAriaLabel = translate('CLOSE');
    dialogContentDefaultProps.title = title;

    const modalDefaultProps = {
        styles: DialogStyles,
    };

    return (
        <FluentDialog
            onDismiss={onDismiss}
            {...props}
            dialogContentProps={{ ...dialogContentDefaultProps, ...props.dialogContentProps }}
            modalProps={{ ...modalDefaultProps, ...props.modalProps }}
        >
            {children}

            {(onAccept || onCancel) && (
                <FluentDialogFooter {...props.footerProps}>
                    {onAccept && (
                        <PrimaryButton
                            {...props.acceptButtonProps}
                            styles={{ ...dialogButtonStyles, ...props?.acceptButtonProps?.styles }}
                            onClick={onAccept}
                            text={acceptButtonTranslatedText}
                            data-testid="acceptBtn"
                        />
                    )}
                    {onCancel && (
                        <DefaultButton
                            {...props.cancelButtonProps}
                            styles={{ ...dialogButtonStyles, ...props?.cancelButtonProps?.styles }}
                            onClick={onCancel}
                            text={cancelButtonTranslatedText}
                            data-testid="cancelBtn"
                        />
                    )}
                </FluentDialogFooter>
            )}
        </FluentDialog>
    );
};

export default Dialog;
