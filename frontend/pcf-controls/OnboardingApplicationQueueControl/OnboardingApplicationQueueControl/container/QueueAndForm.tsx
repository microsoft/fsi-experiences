import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { PCFContainerProps } from '@fsi/pcf-common/dist/containers/PCFContainer';
import { usePCFLoggerService } from '@fsi/pcf-common/dist/hooks/usePCFLoggerService';
import { Queue } from '@fsi/queue/dist/components/Queue';
import useQueueData from '@fsi/queue/dist/hooks/useQueueData';
import { IQueueListItem } from '@fsi/queue/dist/components/QueueList';
import { ModelFormContainer } from '@fsi/pcf-common/dist/containers/ModelFormContainer';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { QUEUE_NAMESPACE } from '@fsi/queue/dist/constants/Queue.const';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { IOnboardingApplicationQueueFetcher } from '@fsi/queue/dist/interfaces/IOnboardingApplicationQueueFetcher';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { dividerStyles, modelFormContainerStyles, widgetStyles } from './QueueAndForm.style';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { ArchiveApplicationWidgetContainer } from './ArchiveApplicationWidgetContainer';

interface IQueueAndFormProps extends PCFContainerProps {
    fetcher: IOnboardingApplicationQueueFetcher;
}

const QueueAndForm: FC<IQueueAndFormProps> = ({ fetcher, context }) => {
    const { messages: stageChangesMessages } = useBrowserCommunication('stage-change');
    const { messages: archiveSuccessMessages } = useBrowserCommunication('archive-application-success');
    const [selectedQueueItem, setSelectedQueueItem] = useState<IQueueListItem>();
    const translate = useTranslation(QUEUE_NAMESPACE);
    const logger = usePCFLoggerService();
    const applicationIds = context.parameters.applications.sortedRecordIds;
    const onSelectQueueItem = useCallback(
        (queueItem: IQueueListItem) => {
            if (selectedQueueItem?.data.id === queueItem.data.id) {
                return;
            }
            logger.logInteractionOrAction({ uniqueName: 'Click on queue item' });
            context.parameters.applications.setSelectedRecordIds([queueItem.data.id]);
            setSelectedQueueItem(queueItem);
        },
        [context.parameters.applications, logger, selectedQueueItem]
    );
    const formId = context.parameters.formId.raw || '';
    const entityName = context.parameters.entityName.raw || '';
    const compactLayout = !!(!context.parameters.status.raw && !context.parameters.date.raw);
    const { steps, isError, isLoading, items, metadata, refetch } = useQueueData({ fetcher, applicationIds });
    useEffect(() => {
        if (stageChangesMessages.length) {
            refetch();
        }
    }, [refetch, stageChangesMessages]);

    useEffect(() => {
        if (archiveSuccessMessages.length) {
            context.parameters.applications.refresh();
        }
    }, [archiveSuccessMessages]);

    useEffect(() => {
        if (!selectedQueueItem && items.length) {
            onSelectQueueItem(items[0]);
        }
    }, [items, onSelectQueueItem, selectedQueueItem]);

    const emptyProps = useMemo(
        () =>
            !items.length && !isError && !isLoading
                ? { title: translate('EMPTY_STATE_NO_QUEUE_ITEMS'), icon: IMAGE_SRC.emptyState, iconSize: 200 }
                : undefined,
        [items.length, isError, isLoading, translate]
    );

    useEffect(() => {
        if (selectedQueueItem) {
            if (context.parameters.applications.loading) {
                context.parameters.applications.clearSelectedRecordIds();
            } else {
                context.parameters.applications.setSelectedRecordIds([selectedQueueItem.data.id]);
            }
        }
    }, [fetcher]);

    return (
        <Widget
            isLoading={isLoading}
            loadingLabel={translate('CONNECTING_WITH_DATA')}
            isError={isError}
            errorIconSize={200}
            emptyProps={emptyProps}
            name="queue-container"
            styles={widgetStyles}
        >
            <Queue
                compactLayout={compactLayout}
                selectedQueueItemId={selectedQueueItem?.data.id}
                onSelectQueueItem={onSelectQueueItem}
                steps={steps}
                items={items}
                metadata={metadata}
            />
            <Divider vertical customClassName="application-queue-divider" styles={dividerStyles} />
            <ModelFormContainer
                style={modelFormContainerStyles}
                context={context}
                formId={formId}
                entityName={entityName}
                objectId={selectedQueueItem?.data.objectId}
            />
            <ArchiveApplicationWidgetContainer fetcher={fetcher} selectedItem={selectedQueueItem?.data} context={context} />
        </Widget>
    );
};

export default QueueAndForm;
