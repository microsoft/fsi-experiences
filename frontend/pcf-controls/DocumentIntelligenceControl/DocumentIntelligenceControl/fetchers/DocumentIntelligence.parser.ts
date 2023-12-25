/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IDocumentRequest, IDocumentDefinition, IDocumentFile } from '@fsi/document-intelligence/interfaces';
import {
    IDocumentPipelineResult,
    IDocumentPipelineStatusMessage,
    IStepDefinition,
    IStepFieldDefinition,
    IStepOutput,
    IStepResult,
} from '@fsi/document-intelligence/interfaces/IDocumentInsight';
import { IDocumentRegarding } from '@fsi/document-intelligence/interfaces/IDocumentRegarding';
// @ts-ignore
import { EntityReference } from 'CustomControls/Models/CustomControlMetadataInterfaces';
// @ts-ignore
import { DataSetEntityRecord } from 'CustomControls/Models/Dataset/CustomControlDataProviderInterfaces';
import { fileBase64SrcToBlob } from '@fsi/pcf-common/utilities/FileUtils';
import { extractRecordFormattedValue, getLookupValueName } from '@fsi/pcf-common/utilities/extractRecordFields';
import {
    DOC_REQUEST_FIELD_NAMES,
    DOC_DEFINITION_FIELD_NAMES,
    DOCUMENT_TABLES,
    DOC_PIPELINE_FIELD_NAMES,
    PIPELINE_MESSAGE_FIELD_NAMES,
    ANNOTATION_FIELD_NAMES,
    DOC_PIPELINE_STEP_FIELD_NAMES,
    PIPELINE_STEP_DEFINITION_FIELD_NAMES,
    REGARDING_DATASET_ALIASES,
    STEP_FIELD_DEFINITION_ALIAS,
    STEP_FIELD_DEFINITION_FIELD_NAMES,
} from './DocumentIntelligence.const';
import { DocumentPipelineStatus, PipelineStatus } from '@fsi/document-intelligence/constants/PipelineStatuses.const';

type IDataSetRecords = {
    [id: string]: any;
};
// @ts-ignore
type WebApiEntity = WebApi.Entity;

export const parseDocumentRecords = (sortedRecordIds: string[], records: IDataSetRecords, regardingList: IDataSetRecords): IDocumentRequest[] => {
    return sortedRecordIds.map(id => {
        const record = records[id];
        return parseDocument(record, regardingList);
    });
};

export const parseDocument = (record: WebApiEntity, regardingList: IDataSetRecords): IDocumentRequest => {
    const hasAutomatedFlow = !!Number(record.getValue(DOC_REQUEST_FIELD_NAMES.HAS_AUTOMATED_FLOW));
    const documentId = (record.getValue(DOC_REQUEST_FIELD_NAMES.DOCUMENT) as any)?.id.guid;
    return {
        id: record.getRecordId(),
        contextId: (record.getValue(DOC_REQUEST_FIELD_NAMES.CONTEXT) as any)?.id.guid,
        documentId,
        name:
            record.getFormattedValue(getDefinitionLinkedKey(DOC_DEFINITION_FIELD_NAMES.NAME)) ||
            record.getFormattedValue(getDefinitionLinkedKey(DOC_DEFINITION_FIELD_NAMES.TYPE)),
        type: Number(record.getValue(getDefinitionLinkedKey(DOC_DEFINITION_FIELD_NAMES.TYPE)) as string) || 0,
        modifiedBy: record.getFormattedValue(DOC_REQUEST_FIELD_NAMES.MODIFIED_BY),
        status: Number(record.getValue(DOC_REQUEST_FIELD_NAMES.STATE) as string),
        statusDisplayName: record.getFormattedValue(DOC_REQUEST_FIELD_NAMES.STATE),
        regarding: parseDocumentRegarding(record, regardingList),
        autoUpdated: !!Number(record.getValue(DOC_REQUEST_FIELD_NAMES.AUTO_UPDATED)),
        lastStatusDate: new Date(record.getValue(DOC_REQUEST_FIELD_NAMES.STATE_DATE) as number),
        uploadedDate: new Date(record.getValue(DOC_REQUEST_FIELD_NAMES.UPLOAD_DATE) as number),
        pipelineResult: parseDocumentPipelineResult(record, hasAutomatedFlow, documentId),
        description: record.getFormattedValue(DOC_REQUEST_FIELD_NAMES.DESCRIPTION),
        documentDefinitionId: (record.getValue(DOC_REQUEST_FIELD_NAMES.DEFINITION) as any)?.id.guid,
        inactive: Number(record.getValue(DOC_REQUEST_FIELD_NAMES.INACTIVE_STATE_CODE)) === 1,
    };
};

export const parseDocumentRegarding = (record: WebApiEntity, regardingList: IDataSetRecords): IDocumentRegarding => {
    const regarding = record.getValue(DOC_REQUEST_FIELD_NAMES.REGARDING) as EntityReference;
    const regardingId = regarding?.id.guid || '';
    const regardingRecord = regardingList[regardingId];
    const parsedRegardingRecord = regardingRecord && parseRegarding(regardingRecord);
    return {
        ...parsedRegardingRecord,
        id: regardingId,
        name: regarding?.name || '',
    };
};

export const parseDocumentPipelineResult = (
    record: WebApiEntity,
    hasAutomatedFlow?: boolean,
    documentId?: string
): IDocumentPipelineResult | undefined => {
    const pipelineId = record.getValue(getPipelineLinkedKey(DOC_PIPELINE_FIELD_NAMES.ID)) as string;
    if (!pipelineId) {
        return getDefaultPipelineResult(hasAutomatedFlow, documentId);
    }
    return {
        id: (pipelineId as any).guid,
        docStatus: Number(record.getValue(getPipelineLinkedKey(DOC_PIPELINE_FIELD_NAMES.DOC_STATE)) as string),
        pipelineStatus: Number(record.getValue(getPipelineLinkedKey(DOC_PIPELINE_FIELD_NAMES.STATE)) as string),
    };
};

export const parseRegardingRecords = (sortedRecordIds: string[], records: IDataSetRecords): IDocumentRegarding[] => {
    return sortedRecordIds.map(id => {
        const record = records[id];
        return parseRegarding(record);
    });
};

export const parseRegarding = (record): IDocumentRegarding => {
    return {
        id: record.getRecordId(),
        name: record.getFormattedValue(REGARDING_DATASET_ALIASES.NAME),
        role: record.getFormattedValue(REGARDING_DATASET_ALIASES.ROLE),
        isPrimary: !!Number(record.getValue(REGARDING_DATASET_ALIASES.isPrimary)),
    };
};

export const getDefinitionLinkedKey = (fieldName: string): string => {
    return getLinkedKey(fieldName, DOCUMENT_TABLES.DOC_DEFINITION);
};

export const getPipelineLinkedKey = (fieldName: string): string => {
    return getLinkedKey(fieldName, DOCUMENT_TABLES.DOC_PIPELINE);
};

export const getLinkedKey = (fieldName: string, tableName: string): string => {
    return `${tableName}.${fieldName}`;
};

export const parsePipelineMessage = (entity: WebApiEntity): IDocumentPipelineStatusMessage => {
    return {
        status: Number(entity[PIPELINE_MESSAGE_FIELD_NAMES.PIPELINE_STATE] as string),
        shortText: entity[PIPELINE_MESSAGE_FIELD_NAMES.TEXT] as string,
        description: entity[PIPELINE_MESSAGE_FIELD_NAMES.DESCRIPTION] as string,
    };
};

export const parseDocumentFile = async (entity: WebApiEntity): Promise<IDocumentFile> => {
    const fileId = entity[ANNOTATION_FIELD_NAMES.FILE_ID] as string;
    const documentBody = entity[ANNOTATION_FIELD_NAMES.FILE_BODY];
    const mimetype = entity[ANNOTATION_FIELD_NAMES.FILE_TYPE];
    const blobFile = await fileBase64SrcToBlob(documentBody, mimetype);
    const fileBase64 = URL.createObjectURL(blobFile);
    return { fileId, fileURL: fileBase64, isImage: mimetype.startsWith('image/') };
};

export const parseStepJsonOutput = (stepOutput: string): IStepOutput => {
    try {
        return JSON.parse(stepOutput) as IStepOutput;
    } catch {
        return { fields: {} };
    }
};

const parseSingleStepResult = (entity: WebApiEntity): IStepResult => {
    const parsedOutput = parseStepJsonOutput(entity[DOC_PIPELINE_STEP_FIELD_NAMES.OUTPUT] as string);
    return {
        ...parsedOutput,
        resultId: entity[DOC_PIPELINE_STEP_FIELD_NAMES.ID] as string,
        status: Number(entity[DOC_PIPELINE_STEP_FIELD_NAMES.STATE] as string),
        docStatus: Number(entity[DOC_PIPELINE_STEP_FIELD_NAMES.DOC_STATE] as string),
        pipelineId: entity[getLookupValueName(DOC_PIPELINE_STEP_FIELD_NAMES.PIPELINE)],
        definitionId: entity[getLookupValueName(DOC_PIPELINE_STEP_FIELD_NAMES.DEFINITION)],
        output: parsedOutput,
    };
};

export const parseStepsResults = (entities: WebApiEntity[]): { [stepDefinitionId: string]: IStepResult } => {
    return entities.reduce((prevSteps: { [stepDefinitionId: string]: IStepResult }, entity: WebApiEntity) => {
        const currStep = parseSingleStepResult(entity);
        return {
            ...prevSteps,
            [currStep.definitionId]: currStep,
        };
    }, {});
};

function parseSingleStepDefinition(entity: WebApiEntity): IStepDefinition {
    return {
        id: entity[PIPELINE_STEP_DEFINITION_FIELD_NAMES.ID] as string,
        name: entity[PIPELINE_STEP_DEFINITION_FIELD_NAMES.NAME] as string,
        type: Number(entity[PIPELINE_STEP_DEFINITION_FIELD_NAMES.TYPE] as string),
        order: entity[PIPELINE_STEP_DEFINITION_FIELD_NAMES.ORDER] as number,
        link: entity[PIPELINE_STEP_DEFINITION_FIELD_NAMES.LINK] as string,
        fields: [],
    };
}

function parseSingleFieldDefinition(entity: WebApiEntity): IStepFieldDefinition {
    return {
        id: entity[`${STEP_FIELD_DEFINITION_ALIAS}.${STEP_FIELD_DEFINITION_FIELD_NAMES.ID}`] as string,
        displayName: entity[`${STEP_FIELD_DEFINITION_ALIAS}.${STEP_FIELD_DEFINITION_FIELD_NAMES.DISPLAY_NAME}`] as string,
        required: !!Number(entity[`${STEP_FIELD_DEFINITION_ALIAS}.${STEP_FIELD_DEFINITION_FIELD_NAMES.REQUIRED}`]),
        order: entity[`${STEP_FIELD_DEFINITION_ALIAS}.${STEP_FIELD_DEFINITION_FIELD_NAMES.ORDER}`] as number,
        readOnly: !!Number(entity[`${STEP_FIELD_DEFINITION_ALIAS}.${STEP_FIELD_DEFINITION_FIELD_NAMES.READ_ONLY}`]),
    };
}

export const parseDocumentStepsDefinitions = (entities: WebApiEntity[]): IStepDefinition[] => {
    const definitionsMap = entities.reduce((prevSteps: { [stepDefinitionId: string]: IStepDefinition }, entity: WebApiEntity) => {
        const stepId = entity[PIPELINE_STEP_DEFINITION_FIELD_NAMES.ID];
        prevSteps[stepId] = prevSteps[stepId] || parseSingleStepDefinition(entity);
        const fieldDefinition = parseSingleFieldDefinition(entity);
        if (fieldDefinition.id) {
            prevSteps[stepId]?.fields.push(fieldDefinition);
        }
        return prevSteps;
    }, {});

    return Object.values(definitionsMap).sort((def1, def2) => def1.order - def2.order);
};

export const parseDocumentDefinition = (entity: WebApiEntity): IDocumentDefinition => {
    return {
        id: entity[DOC_DEFINITION_FIELD_NAMES.ID] as string,
        name: entity[DOC_DEFINITION_FIELD_NAMES.NAME] as string,
        type: Number(entity[DOC_DEFINITION_FIELD_NAMES.TYPE] as string),
        description: entity[DOC_DEFINITION_FIELD_NAMES.DESCRIPTION] as string,
    };
};

export const parseSingleDocument = (record: WebApiEntity): IDocumentRequest => {
    const hasAutomatedFlow = !!Number(record[DOC_REQUEST_FIELD_NAMES.HAS_AUTOMATED_FLOW]);
    const documentId = record[getLookupValueName(DOC_REQUEST_FIELD_NAMES.DOCUMENT)];
    return {
        id: record[DOC_REQUEST_FIELD_NAMES.ID],
        contextId: record[getLookupValueName(DOC_REQUEST_FIELD_NAMES.CONTEXT)],
        documentId,
        name:
            extractRecordFormattedValue(record, getDefinitionLinkedKey(DOC_DEFINITION_FIELD_NAMES.NAME)) ||
            extractRecordFormattedValue(record, getDefinitionLinkedKey(DOC_DEFINITION_FIELD_NAMES.TYPE)),
        type: Number(record[getDefinitionLinkedKey(DOC_DEFINITION_FIELD_NAMES.TYPE)] as string) || 0,
        modifiedBy: extractRecordFormattedValue(record, getLookupValueName(DOC_REQUEST_FIELD_NAMES.MODIFIED_BY)),
        status: Number(record[DOC_REQUEST_FIELD_NAMES.STATE] as string),
        statusDisplayName: extractRecordFormattedValue(record, DOC_REQUEST_FIELD_NAMES.STATE),
        regarding: {
            name: extractRecordFormattedValue(record, getLookupValueName(DOC_REQUEST_FIELD_NAMES.REGARDING)),
            id: record[getLookupValueName(DOC_REQUEST_FIELD_NAMES.REGARDING)],
        },
        autoUpdated: !!Number(record[DOC_REQUEST_FIELD_NAMES.AUTO_UPDATED]),
        lastStatusDate: new Date(record[DOC_REQUEST_FIELD_NAMES.STATE_DATE] as number),
        uploadedDate: new Date(record[DOC_REQUEST_FIELD_NAMES.UPLOAD_DATE] as number),
        pipelineResult: parseSingleDocumentPipelineResult(record, hasAutomatedFlow, documentId),
        description: record[DOC_REQUEST_FIELD_NAMES.DESCRIPTION],
        documentDefinitionId: record[getLookupValueName(DOC_REQUEST_FIELD_NAMES.DEFINITION)],
        inactive: record[DOC_REQUEST_FIELD_NAMES.INACTIVE_STATE_CODE] === 1,
    };
};

export const parseSingleDocumentPipelineResult = (
    record: WebApiEntity,
    hasAutomatedFlow?: boolean,
    documentId?: string
): IDocumentPipelineResult | undefined => {
    const pipelineId = record[getPipelineLinkedKey(DOC_PIPELINE_FIELD_NAMES.ID)] as string;
    if (!pipelineId) {
        return getDefaultPipelineResult(hasAutomatedFlow, documentId);
    }
    return {
        id: pipelineId,
        docStatus: Number(record[getPipelineLinkedKey(DOC_PIPELINE_FIELD_NAMES.DOC_STATE)]),
        pipelineStatus: Number(record[getPipelineLinkedKey(DOC_PIPELINE_FIELD_NAMES.STATE)]),
    };
};

export const getDefaultPipelineResult = (hasAutomatedFlow?: boolean, documentId?: string): IDocumentPipelineResult | undefined => {
    return hasAutomatedFlow && documentId
        ? {
              id: '',
              pipelineStatus: PipelineStatus.Running,
              docStatus: DocumentPipelineStatus.Unclear,
          }
        : undefined;
};
