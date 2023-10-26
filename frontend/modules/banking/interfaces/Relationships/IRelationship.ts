import { IAbbreviatedContact } from '../../../../core-components/dataLayerInterface/entity/contact';

export interface IRelationship {
    id: string;
    contactFrom: IAbbreviatedContact;
    contactTo: IAbbreviatedContact;
    relationshipType: number;
}
