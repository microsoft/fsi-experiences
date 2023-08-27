import React, { FC, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NotificationContainerWrapper } from '@fsi/onboarding-application/dist/components/NotificationContainerWrapper/NotificationContainerWrapper';
import { IArchiveApplicationWrapperProps } from './ArchiveApplicationWrapper.interface';
import ArchiveApplicationDialog from '../ArchiveApplicationDialog/ArchiveApplicationDialog';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService';
import { NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { QUEUE_NAMESPACE } from '../../constants/Queue.const';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';

const Wrapper: FC<IArchiveApplicationWrapperProps> = ({ fetcher, selectedApplication, actionName }) => {
    const { show } = useNotificationService();
    const translate = useTranslation(QUEUE_NAMESPACE);
    const [isArchiveDialogOpened, setIsArchiveDialogOpened] = useState(false);
    const closeArchiveDialog = () => setIsArchiveDialogOpened(false);
    const { messages } = useBrowserCommunication('archive-application');
    const { postMessage: postSuccessMessage } = useBrowserCommunication(`archive-application-success`);

    const { data: archiveReasons } = useQuery('fetchArchiveReasons', () => fetcher.fetchArchiveReasons(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    /* istanbul ignore next */
    useEffect(() => {
        if (messages.length) {
            setIsArchiveDialogOpened(true);
        }
    }, [messages]);

    /* istanbul ignore next */
    const onMoveToArchive = useCallback(
        async (reason: string, comment?: string) => {
            await fetcher.archiveApplication(actionName, selectedApplication.id, reason, comment);
            show({
                message: translate('ARCHIVE_APPLICATION_POPUP_TEXT', { itemName: selectedApplication.name || '' }),
                type: NOTIFICATION_TYPES.SUCCESS,
            });
            closeArchiveDialog();
            postSuccessMessage('SUCCESS');
        },
        [selectedApplication, postSuccessMessage]
    );

    return (
        <ArchiveApplicationDialog
            archiveReasons={archiveReasons ?? {}}
            itemName={selectedApplication.name}
            isOpen={isArchiveDialogOpened}
            onCancel={closeArchiveDialog}
            onDismiss={closeArchiveDialog}
            onMoveToArchive={onMoveToArchive}
        />
    );
};

export const ArchiveApplicationWrapper: FC<IArchiveApplicationWrapperProps> = props => (
    <NotificationContainerWrapper>
        <Wrapper {...props} />
    </NotificationContainerWrapper>
);

export default ArchiveApplicationWrapper;
