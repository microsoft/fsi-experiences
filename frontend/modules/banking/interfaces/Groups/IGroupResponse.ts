import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IGroup } from './IGroup';

export interface IGroupResponse {
    groupsArray: IGroup[];
    metadata?: { [entityName: string]: HttpStatusCode };
}
