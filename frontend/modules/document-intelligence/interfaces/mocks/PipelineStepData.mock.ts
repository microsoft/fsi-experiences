import { DocumentPipelineStatus } from '../../constants/PipelineStatuses.const';
import { StepStatuses } from '../../constants/StepStatuses.const';
import { IStepResult } from '../IDocumentInsight';

export const stepResultSuccessMock: IStepResult = {
    docStatus: DocumentPipelineStatus.Approved,
    status: StepStatuses.Success,
    definitionId: 'step-def1',
    pipelineId: 'doc-pipe-id1',
    resultId: 'result-id1',
    fields: {
        field1: {
            value: 'value1',
            originalValue: 'originalValue1',
            confidence: 0.9,
        },
        field2: {
            value: 'value2',
            originalValue: 'originalValue2',
            confidence: 0.9,
        },
    },
    collection: 'idDocument.driverLicense',
    collectionConfidence: 0.97,
};

export const stepResultFailureMock: IStepResult = {
    docStatus: DocumentPipelineStatus.Rejected,
    status: StepStatuses.Success,
    definitionId: 'step-def2',
    pipelineId: 'doc-pipe-id1',
    resultId: 'result-id2',
    fields: {},
};

export const stepResultUnclearMock: IStepResult = {
    docStatus: DocumentPipelineStatus.Unclear,
    status: StepStatuses.Success,
    definitionId: 'step-def3',
    pipelineId: 'doc-pipe-id1',
    resultId: 'result-id3',
    fields: {},
};

export const stepFailedMock: IStepResult = {
    docStatus: DocumentPipelineStatus.Unclear,
    status: StepStatuses.Failure,
    definitionId: 'step-def4',
    pipelineId: 'doc-pipe-id1',
    resultId: 'result-id4',
    fields: {},
};

export const stepRunningMock: IStepResult = {
    docStatus: DocumentPipelineStatus.Unclear,
    status: StepStatuses.Running,
    definitionId: 'step-def5',
    pipelineId: 'doc-pipe-id1',
    resultId: 'result-id5',
    fields: {},
};

export const stepsResults: { [stepDefinitionId: string]: IStepResult } = {
    [stepResultSuccessMock.definitionId]: stepResultSuccessMock,
    [stepResultFailureMock.definitionId]: stepResultFailureMock,
    [stepResultUnclearMock.definitionId]: stepResultUnclearMock,
    [stepFailedMock.definitionId]: stepFailedMock,
    [stepRunningMock.definitionId]: stepRunningMock,
};
