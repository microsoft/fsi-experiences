import { IAIFactor } from '../../atoms/AIFactor/AIFactor.interface';
import { IAIInfo } from '../../atoms/AIScore/AIScore.interface';

export interface IAIFactorsInfo extends IAIInfo {
    factors: IAIFactor[];
}
export interface IAIFactorListProps {
    factorsInfo: IAIFactorsInfo;
    lowIsGood?: boolean;
    negativeLabel: string;
    positiveLabel: string;
}
