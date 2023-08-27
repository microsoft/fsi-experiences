import { CIEntitiesError } from '../../../../dataLayerInterface/entity/CIEntitiesError';
import { CIPrediction } from '../../../../dataLayerInterface/entity/CIPrediction/CIPrediction';

export interface IPredictionRiskProps {
    prediction: CIPrediction | CIEntitiesError | undefined;
    isPredictionSupported: boolean;
}
