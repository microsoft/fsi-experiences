import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';
import { IRelationship } from './IRelationship';

export interface IRelationshipFetcher {
    getCustomerRelationships(): Promise<IRelationship[]>;
    fetchRelationshipById(relationshipId: string): Promise<IRelationship>;
    addRelationship(relationship: IRelationship): Promise<string>;
    deleteRelationship(id: string): Promise<void>;
    updateRelationship(relationship: IRelationship): Promise<void>;
    getRelationshipTypesMap: () => Promise<Map<number, string>>;
    getMainCustomerDetails(): Promise<IAbbreviatedContact>;
    getRelevantContacts(name: string): Promise<IAbbreviatedContact[]>;
}
