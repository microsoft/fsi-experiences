import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { IDocumentBaseFetcher, UpdateStepFieldDataProps } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { PCFBaseExecuteWebAPI } from '@fsi/pcf-common/data-layer/base/PCFBaseExecuteWebAPI';
import { IDocumentRequest, IDocumentFile, IDocumentsMetadata } from '@fsi/document-intelligence/interfaces';
import { IStepDefinition, IStepFieldData, IStepResult } from '@fsi/document-intelligence/interfaces/IDocumentInsight';
import { parseDocumentFile, parseDocumentStepsDefinitions, parseStepsResults } from './DocumentIntelligence.parser';
import {
    DOC_REQUEST_FIELD_NAMES,
    DOCUMENT_TABLES,
    UPLOAD_API_NAME,
    UPLOAD_API_PARAM,
    DELETE_API_PARAM,
    DELETE_API_NAME,
    DOC_PIPELINE_STEP_FIELD_NAMES,
} from './DocumentIntelligence.const';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';

import { getDocumentFileQuery, getDocumentPipelineStepsQuery, getStepsDefinitionQuery } from './DocumentIntelligence.query';
import { DEFAULT_MAX_UPLOAD_SIZE } from '@fsi/document-intelligence/constants/DocumentIntelligence.const';

export class DocumentIntelligenceBaseFetcher extends PCFBaseExecuteWebAPI implements IDocumentBaseFetcher {
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    public async getPipelineStepsResults(pipelineId: string): Promise<{ [stepDefinitionId: string]: IStepResult }> {
        try {
            const encodedFetchXml = encodeURIComponent(getDocumentPipelineStepsQuery(pipelineId));
            const { entities } = await this.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.DOC_PIPELINE_STEP, `?fetchXml=${encodedFetchXml}`);
            return parseStepsResults(entities);
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                this.getPipelineStepsResults.name,
                'An error accrued while fetching document pipeline-step results',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    public async getStepsDefinitions(documentDefinitionId: string): Promise<IStepDefinition[]> {
        try {
            const encodedFetchXml = encodeURIComponent(getStepsDefinitionQuery(documentDefinitionId));
            const { entities } = await this.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.PIPELINE_STEP_DEFINITION, `?fetchXml=${encodedFetchXml}`);
            return parseDocumentStepsDefinitions(entities);
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                this.getStepsDefinitions.name,
                'An error accrued while fetching document steps definitions',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    private getUpdatedOutput(
        fieldsToUpdate: { [fieldKey: string]: string | number },
        stepOutput: any
    ): { fields: { [key: string]: IStepFieldData } } {
        const updatedFields = Object.keys(fieldsToUpdate)?.reduce((prevFields, fieldKey: string) => {
            const currField = prevFields?.[fieldKey];
            if (!currField) {
                return {
                    ...prevFields,
                    [fieldKey]: {
                        value: fieldsToUpdate[fieldKey],
                        originalValue: undefined,
                        confidence: undefined,
                    },
                };
            }

            return {
                ...prevFields,
                [fieldKey]: {
                    ...currField,
                    value: fieldsToUpdate[fieldKey],
                },
            };
        }, stepOutput?.fields);

        return { ...(stepOutput || {}), fields: updatedFields };
    }

    public async updateStepFieldsData({ stepResultId, fieldsToUpdate, stepOutput }: UpdateStepFieldDataProps): Promise<boolean> {
        const updatedOutput = this.getUpdatedOutput(fieldsToUpdate, stepOutput);
        const updatedStepResult: {} = {
            [DOC_PIPELINE_STEP_FIELD_NAMES.OUTPUT]: JSON.stringify(updatedOutput),
        };

        await this.webAPI.updateRecord(DOCUMENT_TABLES.DOC_PIPELINE_STEP, stepResultId, updatedStepResult);
        return true;
    }

    public async getDocumentFile(documentId: string): Promise<IDocumentFile> {
        try {
            const encodedFetchXml = encodeURIComponent(getDocumentFileQuery(documentId));
            const result = await this.context.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.ANNOTATION, `?fetchXml=${encodedFetchXml}`);

            if (result.entities.length === 0) {
                return { fileId: '', fileURL: '' };
            }

            return parseDocumentFile(result.entities[0]);
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                'getDocumentFile',
                'An error accrued getting document file',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    async updateDocumentStatus(document: IDocumentRequest, status: number, documentId?: string, afterUpload?: boolean): Promise<IDocumentRequest> {
        try {
            const now = new Date();
            const updatedData: {} = {
                [DOC_REQUEST_FIELD_NAMES.STATE]: status,
                [DOC_REQUEST_FIELD_NAMES.STATE_DATE]: now,
                [DOC_REQUEST_FIELD_NAMES.AUTO_UPDATED]: false,
            };

            if (documentId) {
                updatedData[`${DOC_REQUEST_FIELD_NAMES.DOCUMENT}@odata.bind`] = `/msfsi_documents(${documentId})`;
            }
            if (afterUpload) {
                updatedData[`${DOC_REQUEST_FIELD_NAMES.PIPELINE}@odata.bind`] = null;
                updatedData[`${DOC_REQUEST_FIELD_NAMES.UPLOAD_DATE}`] = now;
            }
            await this.webAPI.updateRecord(DOCUMENT_TABLES.DOCUMENT_REQUEST, document.id, updatedData);

            return { ...document, status, lastStatusDate: now };
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                'updateDocument',
                `An error occurred while updating document (${document.id})`,
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    async uploadDocument(document: IDocumentRequest, file: File): Promise<IDocumentRequest> {
        try {
            const fileBase64 = await this.convertFileToBase64(file);
            const parts = fileBase64?.split(',');
            if (!parts || !parts[1]) {
                throw new Error('Error converting file to base64');
            }
            const result = await this.execute(this.createDIUploadAction(document, file, parts[1]));
            return { ...document, documentId: result.DocumentId?.msfsi_documentid };
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                'uploadDocument',
                'An error occurred while uploading new document',
                FSIErrorTypes.ServerError,
                e
            );

            return Promise.reject(e);
        }
    }

    private convertFileToBase64(file: Blob): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString());
            reader.onerror = error => reject(error);
        });
    }

    public hasDocumentPrivilege(type): boolean {
        return this.hasEntitiesPrivilege([DOCUMENT_TABLES.DOCUMENT_REQUEST], type);
    }

    private createDIUploadAction(document: IDocumentRequest, file: File, fileBody: string) {
        return this.createBoundActionWithMultipleParams(
            {
                entityType: 'msfsi_documentrequest',
                id: document.id,
            },
            [
                { paramName: UPLOAD_API_PARAM.NAME, data: file.name, type: 'Edm.String' },
                { paramName: UPLOAD_API_PARAM.TYPE, data: file.type, type: 'Edm.String' },
                { paramName: UPLOAD_API_PARAM.BODY, data: fileBody, type: 'Edm.String' },
            ],
            UPLOAD_API_NAME
        );
    }

    async getMaxUploadSize(): Promise<number> {
        try {
            const result = await this.webAPI.retrieveMultipleRecords('organization', '?$select=maxuploadfilesize');
            return Number(result.entities[0]['maxuploadfilesize']);
        } catch {
            return DEFAULT_MAX_UPLOAD_SIZE;
        }
    }

    async removeDocument(document: IDocumentRequest, deleteRequest: boolean): Promise<boolean> {
        try {
            await this.execute(this.createDIDeleteAction(document, deleteRequest));
            return true;
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                'removeDocument',
                'An error accrued while removing document',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    private createDIDeleteAction(document: IDocumentRequest, deleteRequest: boolean) {
        return this.createBoundActionWithMultipleParams(
            {
                entityType: 'msfsi_documentrequest',
                id: document.id,
            },
            [{ paramName: DELETE_API_PARAM.DELETE_REQUEST, data: deleteRequest, type: 'Edm.Boolean' }],
            DELETE_API_NAME
        );
    }

    async getDocumentsMetadata(): Promise<IDocumentsMetadata> {
        throw new Error('Method not implemented.');
    }

    async updateDocumentDescription(document: IDocumentRequest, description: string): Promise<IDocumentRequest> {
        try {
            const updatedData: {} = {
                [DOC_REQUEST_FIELD_NAMES.DESCRIPTION]: description,
            };

            await this.webAPI.updateRecord(DOCUMENT_TABLES.DOCUMENT_REQUEST, document.id, updatedData);

            return { ...document, description };
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceBaseFetcher.name,
                'updateDocument',
                `An error occurred while updating document (${document.id})`,
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }
}
