import { IDocumentBaseFetcher } from '../../interfaces/IDocumentsFetcher';
import { IDocumentRequest } from '../../interfaces/IDocument';
import { IStepResultWithDefinition } from '../../interfaces';

export interface IDocumentDetailsTabProps {
    document: IDocumentRequest;
    updateDescription: (description: string) => void;
    fetcher: IDocumentBaseFetcher;
    showDescription?: boolean;
    hasWriteAccess?: boolean;
    stepsResults: IStepResultWithDefinition[];
    isErrorLoadingSteps?: boolean;
    isLoadingStepsResults?: boolean;
    onEditModeChange?: (isEditMode: boolean) => void;
}
