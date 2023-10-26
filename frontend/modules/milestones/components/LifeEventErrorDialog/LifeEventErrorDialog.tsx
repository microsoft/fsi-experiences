import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dialog } from '@fluentui/react/lib/Dialog';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { LifeEventContext } from '../../LifeEvent.context';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { contentStyles, dialogStyles, lifeEventErrorDialogStyles, modalStyles, okButtonStyles } from './lifeEventErrorDialog.style';
import { Stack } from '@fluentui/react/lib/Stack';

export const LifeEventErrorDialog: FC = () => {
    const { errorDialog, setErrorDialog } = useContext(LifeEventContext);
    const [isLoading, setIsLoading] = useState(false);

    const { retryFunc, operationError } = errorDialog || {};
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const handleErrorDialogDismissed = useCallback(() => setErrorDialog(undefined), []);

    const errorDialogProps: IDialogContentProps = useMemo(
        () => ({
            type: DialogType.normal,
            title: translate(`LIFE_EVENT_${isLoading ? 'LOADING' : retryFunc ? 'RETRY' : 'ERROR'}_DIALOG_TITLE_${operationError}`),
            closeButtonAriaLabel: translate('LIFE_EVENT_DIALOG_CLOSE'),
            subText: retryFunc ? ' ' : translate(`LIFE_EVENT_ERROR_DIALOG_TEXT`),
            styles: dialogStyles,
        }),
        [translate, isLoading, retryFunc, operationError]
    );

    const onRetryFunc = async () => {
        setIsLoading(true);
        await retryFunc?.();
        setIsLoading(false);
    };

    return operationError ? (
        <Dialog
            modalProps={{ isBlocking: true, styles: modalStyles }}
            hidden={!operationError}
            onDismiss={handleErrorDialogDismissed}
            dialogContentProps={errorDialogProps}
            styles={lifeEventErrorDialogStyles}
            minWidth={480}
        >
            {isLoading ? (
                <Stack grow horizontalAlign="center" verticalAlign="center">
                    <Spinner label={`${translate(`LIFE_EVENT_LOADING_DIALOG_SPINNER_${operationError}`)}`} size={SpinnerSize.small} />
                </Stack>
            ) : (
                <Stack styles={contentStyles}>
                    {retryFunc ? (
                        <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
                            <PrimaryButton onClick={onRetryFunc} text={translate('TRY_AGAIN')} />
                            <DefaultButton onClick={handleErrorDialogDismissed} text={translate('CANCEL')} />
                        </Stack>
                    ) : (
                        <PrimaryButton styles={okButtonStyles} onClick={handleErrorDialogDismissed} text={translate('OK')} />
                    )}
                </Stack>
            )}
        </Dialog>
    ) : null;
};
