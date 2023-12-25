import { IInputs } from '../generated/ManifestTypes';
import { ATTRIBUTES_ALIASES, ENTITY_NAMES, FlowAliasName } from './OnboardingApplicationQueue.const';

export const getBpfFormQuery = (bpfEntityName: string) => `?$select=formxml&$filter=objecttypecode eq '${bpfEntityName}'&$top=1`;

export const getWorkflowClientDataQuery = (bpfEntityName: string) =>
    [
        '<fetch>',
        "<entity name='workflow'>",
        "<attribute name='clientdata' />",
        '<filter>',
        `<condition attribute='uniquename' operator='eq' value='${bpfEntityName}'/>`,
        '</filter>',
        '</entity>',
        '</fetch>',
    ].join('');

export const fetchQueueItemApplicationQuery = (parameters: IInputs, bpfName: string) => {
    const queueItemsIds = parameters.applications?.sortedRecordIds;
    const valuesTagsIds = queueItemsIds.map(id => `<value>${id}</value>`);
    return [
        '<fetch>',
        `<entity name='${ENTITY_NAMES.QUEUE_ITEM}'>`,
        `<attribute name="${ATTRIBUTES_ALIASES.OBJECT_ID}" />`,
        `<attribute name='${ATTRIBUTES_ALIASES.QUEUE_ITEM_ID}' />`,
        `<attribute name='${ATTRIBUTES_ALIASES.WORKER_ID}' />`,
        `<filter type="or">`,
        `<condition attribute='${ATTRIBUTES_ALIASES.QUEUE_ITEM_ID}' operator='in'>`,
        ...valuesTagsIds,
        `</condition>`,
        `</filter>`,
        `<link-entity name='${parameters.entityName.raw}' from='${parameters.entityName.raw}id' to='objectid'>`,
        `<attribute name='${parameters.primaryCustomer.raw}' alias="${ATTRIBUTES_ALIASES.PRIMARY_CUSTOMER}" />`,
        `<attribute name='${parameters.name.raw}' alias="${ATTRIBUTES_ALIASES.NAME}" />`,
        `<attribute name='${parameters.subtitle.raw}' alias="${ATTRIBUTES_ALIASES.SUBTITLE}" />`,
        parameters.date.raw && `<attribute name='${parameters.date.raw}' alias="${ATTRIBUTES_ALIASES.DATE}" />`,
        parameters.status.raw && `<attribute name='${parameters.status.raw}' alias="${ATTRIBUTES_ALIASES.STATUS}" />`,
        `<link-entity name='${bpfName}' from='bpf_${parameters.entityName.raw}id' to='${parameters.entityName.raw}id' alias='${FlowAliasName}'>`,
        `<attribute name='${ATTRIBUTES_ALIASES.ACTIVE_STAGE_ID}' />`,
        '</link-entity>',
        "<order attribute='createdon' />",
        `</link-entity>`,
        '</entity>',
        '</fetch>',
    ].join('');
};

export const fetchArchivingReasonsPerScenario = (businessScenario: number) => {
    return [
        '<fetch>',
        `<entity name="${ENTITY_NAMES.ARCHIVE_REASON}" >`,
        '<attribute name="msfsi_name" />',
        '<filter>',
        `<condition attribute="msfsi_businessscenario" operator="eq" value="${businessScenario}" />`,
        '</filter>',
        '</entity>',
        '</fetch>',
    ].join('');
};
