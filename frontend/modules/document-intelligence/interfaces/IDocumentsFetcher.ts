import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { IAddDocumentRequestData, IDocumentDefinition, IDocumentRequest, IDocumentFile, IDocumentsMetadata } from '.';
import { IStepDefinition, IStepResult, IStepFieldData } from './IDocumentInsight';
import { IDocumentRegarding } from './IDocumentRegarding';

export type UpdateStepFieldDataProps = {
    stepResultId: string;
    fieldsToUpdate: { [fieldKey: string]: string | number };
    stepOutput?: any;
};

export interface IDocumentBaseFetcher {
    regardingEntity?: string;
    getPipelineStepsResults(pipelineId: string): Promise<{ [stepDefinitionId: string]: IStepResult }>;
    getDocumentFile(documentId: string): Promise<IDocumentFile>;
    updateDocumentStatus(document: IDocumentRequest, status: number): Promise<IDocumentRequest>;
    uploadDocument(document: IDocumentRequest, file: File): Promise<IDocumentRequest>;
    removeDocument(document: IDocumentRequest, deleteRequest: boolean): Promise<boolean>;
    hasDocumentPrivilege(type: PrivilegeType): boolean;
    getMaxUploadSize(): Promise<number>;
    getDocumentsMetadata(): Promise<IDocumentsMetadata>;
    updateDocumentDescription(document: IDocumentRequest, description: string): Promise<IDocumentRequest>;
    getStepsDefinitions(documentDefinitionId: string): Promise<IStepDefinition[]>;
    updateStepFieldsData({ stepResultId, fieldsToUpdate, stepOutput }: UpdateStepFieldDataProps): Promise<boolean>;
}
export interface IDocumentsFetcher extends IDocumentBaseFetcher {
    getDocuments(contextId: string, search?: string): Promise<IDocumentRequest[]>;
    getContextRegardingEntities(contextId: string): Promise<IDocumentRegarding[]>;
    getDocumentDefinitions(): Promise<IDocumentDefinition[]>;
    createDocumentRequest(data: IAddDocumentRequestData): Promise<{ id: string }>;
    openNewDocumentForm(formId: string): Promise<string | undefined>;
    isContextInactive(contextId: string): Promise<boolean>;
}

export interface IDocumentDetailsFetcher extends IDocumentBaseFetcher {
    getSingleDocument(id: string): Promise<IDocumentRequest>;
}
