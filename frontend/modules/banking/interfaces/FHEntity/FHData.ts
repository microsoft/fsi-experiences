import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { FinancialHoldingMap } from './FinancialHoldingMap';

export interface CalculatedFHData {
    assets: number;
}
export interface FHData {
    data: FinancialHoldingMap;
    calculated?: CalculatedFHData;
    requestMetadata?: { [entityName: string]: HttpStatusCode };
}
