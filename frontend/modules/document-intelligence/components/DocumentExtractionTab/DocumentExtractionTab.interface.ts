import { UpdateStepFieldDataProps } from '../../interfaces/IDocumentsFetcher';
import { IStepResultWithDefinition } from '../../interfaces/IDocumentInsight';

export interface IDocumentExtractedInfoProps {
    extractedStep: IStepResultWithDefinition;
    enrichmentStep?: IStepResultWithDefinition;
    onSave: ({ stepResultId, fieldsToUpdate, stepOutput }: UpdateStepFieldDataProps) => Promise<boolean>;
    onEditModeChange?: (editMode: boolean) => void;
    isLoadingResults?: boolean;
    isSavingStepFields?: boolean;
    editFieldsDisabled?: boolean;
}

export interface IDocumentExtractionTabProps extends IDocumentExtractedInfoProps {
    isErrorLoadingResults?: boolean;
}
