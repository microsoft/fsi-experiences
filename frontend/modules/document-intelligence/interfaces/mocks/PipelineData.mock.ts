import { DocumentPipelineStatus, PipelineStatus } from '../../constants/PipelineStatuses.const';
import { IDocumentPipelineResult } from '../IDocumentInsight';
import { statusMessageApprove, statusMessageReject, statusMessageUnclear } from './PipelineStatusMessage.mock';

export const pipelineResultSuccessMock: IDocumentPipelineResult = {
    docStatus: DocumentPipelineStatus.Approved,
    pipelineStatus: PipelineStatus.Success,
    docPipelineStatusMessage: statusMessageApprove,
    id: 'doc-pipe-id1',
};

export const pipelineResultFailedMock: IDocumentPipelineResult = {
    docStatus: DocumentPipelineStatus.Rejected,
    pipelineStatus: PipelineStatus.Success,
    docPipelineStatusMessage: statusMessageReject,
    id: 'doc-pipe-id2',
};

export const pipelineResultUnclearMock: IDocumentPipelineResult = {
    docStatus: DocumentPipelineStatus.Unclear,
    pipelineStatus: PipelineStatus.Success,
    docPipelineStatusMessage: statusMessageUnclear,
    id: 'doc-pipe-id3',
};

export const pipelineFailedMock: IDocumentPipelineResult = {
    docStatus: DocumentPipelineStatus.Unclear,
    pipelineStatus: PipelineStatus.Failure,
    docPipelineStatusMessage: statusMessageReject,
    id: 'doc-pipe-id4',
};

export const pipelineRunningMock: IDocumentPipelineResult = {
    docStatus: DocumentPipelineStatus.Unclear,
    pipelineStatus: PipelineStatus.Running,
    id: 'doc-pipe-id5',
};
