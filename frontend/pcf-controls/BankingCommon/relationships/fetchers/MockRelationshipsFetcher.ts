import { sleep } from '@fsi/core-components/dist/utilities/TimeUtils';
import { IRelationship } from '@fsi/banking/interfaces/Relationships/IRelationship';
import { IRelationshipFetcher } from '@fsi/banking/interfaces/Relationships/IRelationshipFetcher';
import { contactRelationships, MainCustomer, relationshipsRelevantContacts, relationshipsTypesMap } from '../MockData';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';

export class MockRelationshipsFetcher implements IRelationshipFetcher {
    async fetchRelationshipById(relationshipId: string): Promise<IRelationship> {
        await sleep(1500);
        const relationshipToReturn = contactRelationships.entities.filter(entity => entity.msfsi_relationshipid === relationshipId)[0];

        return {
            id: relationshipToReturn.msfsi_relationshipid,
            contactFrom: {
                contactId: relationshipToReturn._msfsi_contactfrom_value,
                fullName: relationshipToReturn['ContactFrom.fullname'],
            },
            contactTo: {
                contactId: relationshipToReturn._msfsi_contactto_value,
                fullName: relationshipToReturn['ContactTo.fullname'],
            },
            relationshipType: relationshipToReturn.msfsi_relationshiptype,
        };
    }

    async addRelationship(relationship: IRelationship): Promise<string> {
        await sleep(1500);
        contactRelationships.entities.push({
            'ContactFrom.fullname': MainCustomer.fullname,
            'ContactTo.fullname': relationship.contactTo.fullName,
            msfsi_relationshipid: Math.floor(Math.random() * 10000).toString(),
            msfsi_relationshiptype: relationship.relationshipType,
            _msfsi_contactfrom_value: MainCustomer.id,
            _msfsi_contactto_value: relationship.contactTo.contactId,
        });

        return relationship.id;
    }

    async deleteRelationship(id: string): Promise<void> {
        await sleep(1500);
        contactRelationships.entities = contactRelationships.entities.filter(entity => entity.msfsi_relationshipid !== id);
    }

    async updateRelationship(relationship: IRelationship): Promise<void> {
        await sleep(1500);
        contactRelationships.entities.forEach(entity => {
            if (entity.msfsi_relationshipid === relationship.id) {
                entity['ContactTo.fullname'] = relationship.contactTo.fullName;
                entity._msfsi_contactto_value = relationship.contactTo.contactId;
                entity.msfsi_relationshiptype = relationship.relationshipType;
            }
        });
    }

    async getCustomerRelationships(): Promise<IRelationship[]> {
        await sleep(1500);
        const relationshipsToReturn: IRelationship[] = contactRelationships.entities.map(relationship => ({
            id: relationship['msfsi_relationshipid'],
            contactFrom: {
                contactId: relationship['_msfsi_contactfrom_value'],
                fullName: relationship['ContactFrom.fullname'],
            },
            contactTo: {
                contactId: relationship['_msfsi_contactto_value'],
                fullName: relationship['ContactTo.fullname'],
            },
            relationshipType: relationship['msfsi_relationshiptype'],
        }));

        return relationshipsToReturn;
    }

    async getMainCustomerDetails(): Promise<IAbbreviatedContact> {
        const result = MainCustomer;
        return {
            contactId: result.id,
            fullName: result.fullname,
        };
    }

    getRelationshipTypesMap = async (): Promise<Map<number, string>> => relationshipsTypesMap;

    async getRelevantContacts(name: string): Promise<IAbbreviatedContact[]> {
        const contacts = relationshipsRelevantContacts;
        const contactsToReturn: IAbbreviatedContact[] = [];
        contacts.entities.forEach(contact => {
            contactsToReturn.push({
                contactId: contact['contactid'],
                fullName: contact['fullname'],
            });
        });
        return contactsToReturn;
    }
}

export default MockRelationshipsFetcher;
