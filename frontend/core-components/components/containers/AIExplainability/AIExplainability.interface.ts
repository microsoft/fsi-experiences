import { IAIScoreInfo } from '../../atoms/AIScore/AIScore.interface';
import { IAIFactorListProps } from '../AIFactorList/AIFactorList.interface';

export interface IAIExplainabilityProps extends IAIFactorListProps {
    modelTitle: string;
    scoreInfo: IAIScoreInfo;
    lowIsGood?: boolean;
    learnMoreLink?: string;
    learnMoreAdditionalText?: string;
}
