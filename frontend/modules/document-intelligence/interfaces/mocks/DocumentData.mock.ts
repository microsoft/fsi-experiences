import { DocumentStatus, IDocumentRequest } from '../IDocument';
import { docDefinitionIdentity } from './DocumentDefinition.mock';
import * as pipelineResults from './PipelineData.mock';
import { regardingPrimaryMock } from './RegardingData.mock';

const basicDocMock: IDocumentRequest = {
    name: 'Proof of identity - passport',
    description: '',
    id: 'doc-id1',
    documentId: 'common-doc1',
    lastStatusDate: new Date(),
    modifiedBy: 'Mona Cane',
    type: 104800000,
    status: DocumentStatus.PendingReview,
    statusDisplayName: 'Pending review',
    contextId: '12121',
    regarding: regardingPrimaryMock,
    documentDefinitionId: docDefinitionIdentity.id,
};

export const pendingReviewDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.PendingReview,
};

export const missingFileDocMock: IDocumentRequest = {
    ...basicDocMock,
    documentId: undefined,
    status: DocumentStatus.MissingFile,
    id: 'doc-id2',
};

export const recApprovalDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.PendingReview,
    pipelineResult: pipelineResults.pipelineResultSuccessMock,
    id: 'doc-id3',
};

export const recUnclearDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.PendingReview,
    pipelineResult: pipelineResults.pipelineResultUnclearMock,
    id: 'doc-id4',
};

export const recRejectDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.PendingReview,
    pipelineResult: pipelineResults.pipelineResultFailedMock,
    id: 'doc-id5',
};

export const recInProgressDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.PendingReview,
    pipelineResult: pipelineResults.pipelineRunningMock,
    id: 'doc-id6',
};

export const rejectedDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.Rejected,
    pipelineResult: pipelineResults.pipelineResultFailedMock,
    id: 'doc-id7',
};

export const approvedDocMock: IDocumentRequest = {
    ...basicDocMock,
    status: DocumentStatus.Approved,
    id: 'doc-id8',
};

export const autoApprovedDocMock: IDocumentRequest = {
    ...basicDocMock,
    autoUpdated: true,
    pipelineResult: pipelineResults.pipelineResultSuccessMock,
    status: DocumentStatus.Approved,
    id: 'doc-id9',
};
export const autoRejectedDocMock: IDocumentRequest = {
    ...basicDocMock,
    autoUpdated: true,
    pipelineResult: pipelineResults.pipelineResultSuccessMock,
    status: DocumentStatus.Rejected,
    id: 'doc-id10',
};

export const docMockIncludeDescription: IDocumentRequest = {
    ...basicDocMock,
    description: 'test description',
    id: 'doc-id11',
    uploadedDate: new Date(),
};
