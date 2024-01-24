import React, { FC } from 'react';
import { IOnboardingApplicationQueueFetcher } from '@fsi/queue/dist/interfaces/IOnboardingApplicationQueueFetcher';
import { PCFContainerProps } from '@fsi/pcf-common/dist/containers/PCFContainer';
import { ArchiveApplicationWrapper } from '@fsi/queue/dist/components/ArchiveApplicationWrapper/ArchiveApplicationWrapper';
import { IQueueData } from '@fsi/queue/dist/interfaces/IQueueData.interface';

interface IArchiveApplicationWidgetContainerProps extends PCFContainerProps {
    fetcher: IOnboardingApplicationQueueFetcher;
    selectedItem?: IQueueData;
}

export const ArchiveApplicationWidgetContainer: FC<IArchiveApplicationWidgetContainerProps> = ({ fetcher, context, selectedItem }) => {
    const actionName = context.parameters?.archiveActionName?.raw?.trim();

    if (!actionName || !selectedItem) {
        return null;
    }

    return (
        <ArchiveApplicationWrapper
            fetcher={fetcher}
            selectedApplication={{
                id: selectedItem.objectId,
                name: selectedItem.itemName,
            }}
            actionName={actionName}
        />
    );
};
