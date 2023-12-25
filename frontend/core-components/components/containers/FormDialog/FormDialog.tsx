import React, { FC, useEffect, useRef } from 'react';
import { Dialog } from '../Dialog/Dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { Text } from '@fluentui/react/lib/Text';
import type { IFormDialogProps } from './FormDialog.interface';
import { useMutation } from 'react-query';
import { Spinner } from '@fluentui/react/lib/components/Spinner/Spinner';
import { useTranslation } from '../../../context/hooks/useTranslation';
import { formErrorModalStyles, FormErrorStyles } from './FormDialog.style';
import { IModal } from '@fluentui/react/lib/components/Modal/Modal.types';

export const FormDialog: FC<IFormDialogProps> = ({ isOpen, onSubmit, children, mutationOptions, formProps, ...props }) => {
    const t = useTranslation();
    const { isLoading, isError, mutate: onSubmitForm, reset } = useMutation(onSubmit, mutationOptions);
    const methods = useForm(formProps);

    const onDismissHandler = () => {
        props.onDismiss?.();
        reset();
    };

    const errorDialogRef = useRef(null);

    /* istanbul ignore next */
    useEffect(() => {
        if (!isError) return;

        setTimeout(() => {
            // forcibly focus error dialog (mainly for the screen reader/keyboard use purpose)
            (errorDialogRef.current! as IModal)?.focus();
        }, 300);
    }, [isError]);

    if (isLoading) {
        return (
            <Dialog hidden={!isOpen} onDismiss={onDismissHandler} title="" maxWidth={493} isBlocking dialogContentProps={{ showCloseButton: false }}>
                <Spinner data-testid="spinner" ariaLabel={props.loadingProps.text} label={props.loadingProps.text} />
            </Dialog>
        );
    }

    if (isError) {
        return (
            <Dialog
                hidden={!isOpen}
                maxWidth={480}
                title={props.errorProps.title}
                acceptButtonText={t('CLOSE')}
                onAccept={onDismissHandler}
                onDismiss={onDismissHandler}
                modalProps={{ styles: formErrorModalStyles, componentRef: errorDialogRef }}
            >
                <Text data-testid="dialog-error-text" styles={FormErrorStyles}>
                    {props.errorProps.message}
                </Text>
            </Dialog>
        );
    }

    return (
        <FormProvider {...methods}>
            <Dialog maxWidth={493} hidden={!isOpen} {...props} onAccept={methods.handleSubmit(() => onSubmitForm())}>
                {children}
            </Dialog>
        </FormProvider>
    );
};

export default FormDialog;
