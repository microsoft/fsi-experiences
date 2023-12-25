import { IDocumentRequest } from '../../interfaces/IDocument';
import { IDocumentBaseFetcher, UpdateStepFieldDataProps } from '../../interfaces/IDocumentsFetcher';
import { IStepResultWithDefinition } from '../../interfaces';

export interface IDocumentDetailsPaneProps {
    document: IDocumentRequest;
    fetcher: IDocumentBaseFetcher;
    showDescription?: boolean;
    hasWriteAccess?: boolean;
    updateDescription: (description: string) => void;
    onEditModeChange?: (editMode: boolean) => void;
    extractedStep?: IStepResultWithDefinition;
    enrichmentStep?: IStepResultWithDefinition;
    isErrorLoadingResults?: boolean;
    isLoadingResults?: boolean;
    isErrorLoadingSteps?: boolean;
    pipelineSteps: IStepResultWithDefinition[];
    onSaveStepFields: (props: UpdateStepFieldDataProps) => any;
    isSavingStepFields?: boolean;
}
