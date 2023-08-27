import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { LoanApplicationList } from '../LoanApplicationList';
import { LoanEntityWidget } from '../LoanEntityWidget';
import { LoanOnboardingContext } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import { mainDivStyle, separatorStyles } from './LoanOnboardingWidget.style';
import { LoanApplicationArchiveDialog } from '../LoanApplicationArchiveDialog';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { ToastNotification, NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService';

export const LoanOnboardingWidget: FC = () => {
    const { archiveApplication, selectedApplication } = useContext(LoanOnboardingContext);
    const t = useTranslation(namespaces.LOAN_ONBOARDING_CONTROL);
    const { show } = useNotificationService();

    const [isArchiveDialogOpened, setIsArchiveDialogOpened] = useState(false);
    const { messages } = useBrowserCommunication('loan-archive');
    const { messages: toastNotifications } = useBrowserCommunication('loan-popup-notification');

    /* istanbul ignore next */
    const closeArchiveDialog = () => setIsArchiveDialogOpened(false);

    /* istanbul ignore next */
    const onMoveToArchive = useCallback(
        async (reason: string, comment?: string) => {
            await archiveApplication(selectedApplication?.id || '', reason, comment);
            closeArchiveDialog();
            show({
                message: t('LOAN_ARCHIVE_POPUP_TEXT', { loanName: selectedApplication?.name || '' }),
                type: NOTIFICATION_TYPES.SUCCESS,
            });
        },
        [archiveApplication, selectedApplication]
    );

    /* istanbul ignore next */
    useEffect(() => {
        if (messages.length) {
            setIsArchiveDialogOpened(true);
        }
    }, [messages]);

    /* istanbul ignore next */
    useEffect(() => {
        if (toastNotifications.length) {
            const message = toastNotifications[toastNotifications.length - 1] as string;
            show({
                message,
                type: NOTIFICATION_TYPES.SUCCESS,
            });
        }
    }, [toastNotifications]);

    return (
        <>
            <Stack className={mainDivStyle}>
                <LoanApplicationList />
                <Separator vertical styles={separatorStyles} />
                <LoanEntityWidget />
            </Stack>
            <LoanApplicationArchiveDialog
                isOpen={isArchiveDialogOpened}
                onDismiss={closeArchiveDialog}
                onCancel={closeArchiveDialog}
                onMoveToArchive={onMoveToArchive}
            />
            <ToastNotification />
        </>
    );
};

export default LoanOnboardingWidget;
