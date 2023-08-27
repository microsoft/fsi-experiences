import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IGroupFinancialHolding } from './IGroupFinancialHolding';
import { IGroupMember } from './IGroupMember';

export interface IGroup {
    id: string;
    name: string;
    primaryMember: string;
    type: number;
    members: IGroupMember[];
    financialHoldings?: IGroupFinancialHolding[];
    fhRequestMetadata?: { [entityName: string]: HttpStatusCode };
    creationDate: Date;
    version: number;
}
