import { useTranslation } from "@fsi/core-components/dist/context/hooks/useTranslation";
import { NOTIFICATION_TYPES } from "@fsi/core-components/dist/services/NotificationService";
import { useCallback, useEffect, useState } from "react";
import { QUEUE_NAMESPACE } from "../constants/Queue.const";
import useBrowserCommunication from "@fsi/core-components/hooks/useBrowserCommunication";
import { useNotificationService } from "@fsi/core-components/dist/hooks/useNotificationService";
import { IOnboardingApplicationQueueFetcher } from "../interfaces/IOnboardingApplicationQueueFetcher";



interface IUseArchiveApplicationProps {
    fetcher: IOnboardingApplicationQueueFetcher;
    actionName: string;
    selectedApplication: {
        id: string;
        name?: string | undefined;
    };
}

interface IUseArchiveApplicationResponse {
    closeArchiveDialog: () => void;
    isArchiveDialogOpened: boolean;
    onMoveToArchive: (reason: any, comment: any) => Promise<void>;
}
/* istanbul ignore next */
const useArchiveApplication = ({ fetcher, actionName, selectedApplication }: IUseArchiveApplicationProps): IUseArchiveApplicationResponse => {
    const { show } = useNotificationService();
    const { postMessage: postSuccessMessage } = useBrowserCommunication(`archive-application-success`);
    const translate = useTranslation(QUEUE_NAMESPACE);
    const { messages } = useBrowserCommunication('archive-application');
    const [isArchiveDialogOpened, setIsArchiveDialogOpened] = useState(false);
    const closeArchiveDialog = () => setIsArchiveDialogOpened(false);

    /* istanbul ignore next */
    useEffect(() => {
        if (messages.length) {
            setIsArchiveDialogOpened(true);
        }
    }, [messages]);

    const onMoveToArchive = useCallback(async (reason, comment) => {

        await fetcher.archiveApplication(actionName, selectedApplication.id, reason, comment);
        show({
            message: translate('ARCHIVE_APPLICATION_POPUP_TEXT', { itemName: selectedApplication.name || '' }),
            type: NOTIFICATION_TYPES.SUCCESS,
        });
        closeArchiveDialog();
        postSuccessMessage('SUCCESS');
    }, [fetcher, actionName, selectedApplication, postSuccessMessage]);

    return { closeArchiveDialog, isArchiveDialogOpened, onMoveToArchive };
}

export default useArchiveApplication;