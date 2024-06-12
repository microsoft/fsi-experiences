export interface IDocumentPipelineResult {
    id: string;
    docStatus: number;
    pipelineStatus: number;
    docPipelineStatusMessage?: IDocumentPipelineStatusMessage;
}

export interface IDocumentPipelineStepResult {
    pipelineId: string;
    status: number;
    docStatus: number;
    id: string;
    name: string;
    link?: string;
}

export interface IStepOutput {
    fields: {
        [key: string]: IStepFieldData;
    };
    collection?: string;
    collectionConfidence?: number;
}

export interface IStepResult extends IStepOutput {
    status: number;
    definitionId: string;
    docStatus: number;
    pipelineId?: string;
    resultId: string;
    skipped?: boolean;
    output?: any;
}

export interface IStepResultWithDefinition extends Omit<IStepResult, 'fields'>, Omit<IStepDefinition, 'fields'> {
    fields: IStepFieldDataWithDefinition[];
}

export interface IStepFieldDataWithDefinition extends IStepFieldData, IStepFieldDefinition {}

export interface IDocumentPipelineStatusMessage {
    status: number;
    shortText: string;
    description: string;
}

export interface IStepDefinition {
    id: string;
    name: string;
    type?: number;
    order: number;
    link?: string;
    fields: IStepFieldDefinition[];
}

export interface IStepFieldDefinition {
    id: string;
    displayName: string;
    required?: boolean;
    order?: number;
    readOnly?: boolean;
}

export interface IStepFieldData {
    value?: string | number;
    originalValue?: string | number;
    confidence?: number;
}

export interface IDocumentInsight {
    pipelineResults: IDocumentPipelineResult[];
}
