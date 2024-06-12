import { IDocumentPipelineResult } from '../../interfaces/IDocumentInsight';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { IStyle } from '@fluentui/style-utilities/lib/MergeStyles';

export interface IDocumentRecommendationProps {
    pipelineResult: IDocumentPipelineResult;
    documentStatus?: number;
    autoUpdated?: boolean;
    showDescription?: boolean;
    customTextStyles?: ITextStyles;
    customIconStyles?: { root: IStyle };
}
