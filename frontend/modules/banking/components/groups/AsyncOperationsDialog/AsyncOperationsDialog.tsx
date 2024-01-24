import React, { FC, useMemo } from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogFooter, DialogType, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { contentStyles, dialogStyles } from './AsyncOperationsDialog.style';

interface IAsyncOperationsDialogProps {
    isOpen: boolean;
    isLoading: boolean;
    header: string;
    text: string;
    onDismiss: () => void;
    onDeleteClick?: () => void;
}

const AsyncOperationsDialog: FC<IAsyncOperationsDialogProps> = ({ isOpen, isLoading, header, text, onDismiss, onDeleteClick }) => {
    const translate = useTranslation(namespaces.GROUPS_CONTROL);

    const dialogContentProps: IDialogContentProps = {
        type: DialogType.normal,
        title: header,
        closeButtonAriaLabel: 'Close',
        subText: isLoading ? '' : text,
        styles: contentStyles,
    };

    const modalProps = useMemo(
        () => ({
            isBlocking: true,
            styles: { main: { maxWidth: '100%' } },
        }),
        []
    );

    const renderDeleteFooter = () => (
        <DialogFooter>
            <PrimaryButton onClick={onDeleteClick} text={translate('DELETE')} />
            <DefaultButton onClick={onDismiss} text={translate('CANCEL')} />
        </DialogFooter>
    );

    const renderInfoFooter = () => (
        <DialogFooter>
            <PrimaryButton onClick={onDismiss} text="Ok" />
        </DialogFooter>
    );

    const renderLoadingView = () => <Spinner label={text} styles={{ root: { paddingTop: text ? 0 : 20 } }} data-testid="group-dialog-spinner" />;

    const renderFooter = () => (onDeleteClick ? renderDeleteFooter() : renderInfoFooter());

    return (
        <Dialog styles={dialogStyles} hidden={!isOpen} onDismiss={onDismiss} dialogContentProps={dialogContentProps} modalProps={modalProps}>
            {isLoading ? renderLoadingView() : renderFooter()}
        </Dialog>
    );
};
export default AsyncOperationsDialog;
