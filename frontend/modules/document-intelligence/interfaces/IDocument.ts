import { IDocumentDefinition } from './IDocumentDefinition';
import { IDocumentPipelineResult, IDocumentPipelineStatusMessage } from './IDocumentInsight';
import { IDocumentRegarding } from './IDocumentRegarding';

export interface IDocumentRequest {
    id: string;
    name: string;
    description?: string;
    status: number;
    statusDisplayName: string;
    modifiedBy: string;
    type: number;
    lastStatusDate?: Date;
    uploadedDate?: Date;
    regarding: IDocumentRegarding;
    contextId: string;
    documentId?: string;
    autoUpdated?: boolean;
    pipelineResult?: IDocumentPipelineResult;
    documentDefinitionId: string;
    inactive?: boolean;
}

export interface IAddDocumentRequestData {
    contextId?: string;
    regarding: IDocumentRegarding;
    definition: IDocumentDefinition;
    contextEntitySetName?: string;
    contextRelationshipName?: string;
    regardingEntitySetName?: string;
    descriptionEntity?: string;
    regardingRelationshipName?: string;
}

export const DocumentStatus = {
    MissingFile: 104800000,
    PendingReview: 104800001,
    Approved: 104800002,
    Rejected: 104800003,
};

export interface IDocumentsMetadata {
    pipelineMessages: IDocumentPipelineStatusMessage[];
    contextEntityName?: string;
    contextRelationshipName?: string;
    contextEntitySetName?: string;
    regardingEntityName?: string;
    regardingRelationshipName?: string;
    regardingEntitySetName?: string;
    documentEntityName?: string;
}
