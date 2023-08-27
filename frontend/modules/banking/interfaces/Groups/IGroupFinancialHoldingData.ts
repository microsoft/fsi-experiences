import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IGroupFinancialHolding } from './IGroupFinancialHolding';

export interface IGroupFinancialHoldingData {
    financialHoldingsData: IGroupFinancialHolding[];
    requestMetadata?: { [entityName: string]: HttpStatusCode };
}
