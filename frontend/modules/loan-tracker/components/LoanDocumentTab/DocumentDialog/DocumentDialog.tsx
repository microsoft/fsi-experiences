import React, { FC, useMemo } from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { IDialogOptions } from '../LoanApplicationDocuments/LoanApplicationDocuments';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Loading } from '@fsi/core-components/dist/components/atoms/Loading/Loading';

interface IDocumentDialogProps {
    options: IDialogOptions;
    onDismiss: () => void;
}

const modalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: '100%' } },
};

const DocumentDialog: FC<IDocumentDialogProps> = ({ options, onDismiss }) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);

    const dialogContentProps = useMemo(
        () => ({
            type: DialogType.normal,
            title: options.title,
            closeButtonAriaLabel: translate('CLOSE'),
            subText: options.description,
        }),
        [options.title, options.description]
    );

    const renderButtonsFooter = (
        <DialogFooter>
            {options.primaryButtonText && (
                <PrimaryButton onClick={options.onPrimaryButtonClick} text={options.primaryButtonText} data-testid="primary-button" />
            )}
            {options.defaultButtonText && (
                <DefaultButton onClick={options.onDefaultButtonClick} text={options.defaultButtonText} data-testid="default-button" />
            )}
        </DialogFooter>
    );

    return (
        <Dialog hidden={!options.isOpen} onDismiss={onDismiss} dialogContentProps={dialogContentProps} modalProps={modalProps}>
            {options.isLoading ? <Loading label={options.description} /> : renderButtonsFooter}
        </Dialog>
    );
};
export default DocumentDialog;
