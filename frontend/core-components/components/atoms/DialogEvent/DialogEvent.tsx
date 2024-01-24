import React, { FC } from 'react';
import { Dialog, DialogFooter, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { IModalProps } from '@fluentui/react/lib/components/Modal';
import { dialogModalStyle } from './DialogEvent.style';

export interface EditDialogEventProps {
    visible: boolean;
    dialogContentProps: IDialogContentProps;
    actionOnClick: () => void;
    onDialogDismiss: () => void;
    actionButtonName: string;
    cancelActionButtonName: string;
    modalProps: IModalProps;
}

const DialogEvent: FC<EditDialogEventProps> = ({
    visible,
    dialogContentProps,
    actionOnClick,
    onDialogDismiss,
    actionButtonName,
    cancelActionButtonName,
    modalProps,
}) => {
    return (
        <Dialog
            hidden={!visible}
            onDismiss={onDialogDismiss}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
            data-testid="dialog-test"
            styles={dialogModalStyle}
        >
            <DialogFooter>
                <PrimaryButton onClick={actionOnClick} text={actionButtonName} ariaLabel={actionButtonName} data-testid="action-button-dialog" />
                <DefaultButton onClick={onDialogDismiss} text={cancelActionButtonName} ariaLabel={cancelActionButtonName} />
            </DialogFooter>
        </Dialog>
    );
};

export default DialogEvent;
