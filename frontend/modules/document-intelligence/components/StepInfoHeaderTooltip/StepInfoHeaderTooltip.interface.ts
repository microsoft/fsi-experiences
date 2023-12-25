import { IStepResultWithDefinition } from '../../interfaces/IDocumentInsight';

export interface IStepInfoHeaderTooltip {
    step: IStepResultWithDefinition;
    description: string;
    linkInfoLabel: string;
    prefixLinkInfoLabel?: string;
}
