import { QUEUE_STATUS } from '@fsi/queue/dist/constants/Queue.const';
import { IQueueConfiguration } from '@fsi/queue/dist/interfaces/IQueueConfiguration';
import { IQueueData } from '@fsi/queue/dist/interfaces/IQueueData.interface';
import { ATTRIBUTES_ALIASES, FlowAliasName } from './OnboardingApplicationQueue.const';

const getStatus = ({ entity, configuration }: { entity: any; configuration: IQueueConfiguration }) => {
    const statusId = entity[ATTRIBUTES_ALIASES.STATUS];
    const statusText = entity[`${ATTRIBUTES_ALIASES.STATUS}@OData.Community.Display.V1.FormattedValue`] ?? entity[ATTRIBUTES_ALIASES.STATUS];

    if (configuration.approvedStatusIds.includes(statusId)) {
        return { status: { type: QUEUE_STATUS.APPROVED, text: statusText } };
    }

    if (configuration.rejectedStatusIds.includes(statusId)) {
        return { status: { type: QUEUE_STATUS.REJECTED, text: statusText } };
    }

    if (configuration.pendingStatusIds.includes(statusId)) {
        return { status: { type: QUEUE_STATUS.PENDING, text: statusText } };
    }

    return {};
};
export const parseApplications = ({ entities, configuration }: { entities: any[]; configuration: IQueueConfiguration }) =>
    entities?.map((entity: any): IQueueData => {
        return {
            id: entity[ATTRIBUTES_ALIASES.QUEUE_ITEM_ID],
            objectId: entity[`_${ATTRIBUTES_ALIASES.OBJECT_ID}_value`],
            itemName: entity[ATTRIBUTES_ALIASES.NAME],
            date: new Date(entity[`${ATTRIBUTES_ALIASES.DATE}`]),
            itemText: entity[`${ATTRIBUTES_ALIASES.SUBTITLE}@OData.Community.Display.V1.FormattedValue`] ?? entity[ATTRIBUTES_ALIASES.SUBTITLE],
            primaryCustomer:
                entity[`${ATTRIBUTES_ALIASES.PRIMARY_CUSTOMER}@OData.Community.Display.V1.FormattedValue`] ??
                entity[ATTRIBUTES_ALIASES.PRIMARY_CUSTOMER],
            stepId: entity[`${FlowAliasName}.${ATTRIBUTES_ALIASES.ACTIVE_STAGE_ID}`],
            workedBy: entity[`_${ATTRIBUTES_ALIASES.WORKER_ID}_value@OData.Community.Display.V1.FormattedValue`],
            ...getStatus({ entity, configuration }),
        };
    });

export const parseArchiveReasons = ({ entities }): { [key: string]: string } => {
    const result = {};
    entities?.forEach((entity: any) => {
        result[entity['msfsi_archivereasonid']] = entity['msfsi_name'];
    });
    return result;
};
