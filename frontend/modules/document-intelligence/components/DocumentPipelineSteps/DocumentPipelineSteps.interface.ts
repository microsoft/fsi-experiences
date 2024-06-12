import { IStepResultWithDefinition } from '../../interfaces/IDocumentInsight';

export interface IDocumentPipelineStepsProps {
    stepResults: IStepResultWithDefinition[];
    isLoading?: boolean;
    isError?: boolean;
}
export interface IDocumentPipelineStepItemProps {
    pipelineStepResult: IStepResultWithDefinition;
}
