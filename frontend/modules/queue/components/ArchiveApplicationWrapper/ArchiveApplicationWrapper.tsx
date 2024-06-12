import { NotificationContainerWrapper } from '@fsi/onboarding-application/dist/components/NotificationContainerWrapper/NotificationContainerWrapper';
import React, { FC } from 'react';
import useArchiveApplication from '../../hooks/useArchiveApplication';
import useGetArchiveReason from '../../hooks/useArchiveReasons';
import ArchiveApplicationDialog from '../ArchiveApplicationDialog/ArchiveApplicationDialog';
import { IArchiveApplicationWrapperProps } from './ArchiveApplicationWrapper.interface';

const Wrapper: FC<IArchiveApplicationWrapperProps> = ({ fetcher, selectedApplication, actionName }) => {
    const archiveReasons = useGetArchiveReason({ fetcher, applicationID: selectedApplication.id });
    const { closeArchiveDialog, isArchiveDialogOpened, onMoveToArchive } = useArchiveApplication({ fetcher, actionName, selectedApplication });

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
