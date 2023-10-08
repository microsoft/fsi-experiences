import { PCFBaseFetcher } from '@fsi/pcf-common/data-layer/base/PCFBaseFetcher';
import { IRelationshipFetcher } from '@fsi/banking/interfaces/Relationships/IRelationshipFetcher';
import { IRelationship } from '@fsi/banking/interfaces/Relationships/IRelationship';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';

export class PcfRelationshipFetcher extends PCFBaseFetcher implements IRelationshipFetcher {
    constructor(context: any, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    async getCustomerRelationships(): Promise<IRelationship[]> {
        const contactId = this.context.parameters?.contactId?.raw;
        const fetchXml = [
            `<fetch>`,
            `  <entity name="msfsi_relationship">`,
            `    <attribute name="msfsi_contactfrom" />`,
            `    <attribute name="msfsi_contactto" />`,
            `    <attribute name="msfsi_relationshiptype" />`,
            `    <attribute name="msfsi_relationshipid" />`,
            `    <attribute name="msfsi_relationshiptypename" />`,
            `    <filter>`,
            `      <condition attribute="msfsi_contactfrom" operator="eq" value="${contactId}"/>`,
            `    </filter>`,
            `    <link-entity name="contact" from="contactid" to="msfsi_contactfrom" link-type="outer" alias="ContactFrom">`,
            `      <attribute name="fullname" />`,
            `    </link-entity>`,
            `    <link-entity name="contact" from="contactid" to="msfsi_contactto" link-type="outer" alias="ContactTo">`,
            `      <attribute name="fullname" />`,
            `      <attribute name="entityimage_url"/>`,
            `    </link-entity>`,
            `  </entity>`,
            `</fetch>`,
        ].join('');

        try {
            const encodedFetchXml = encodeURIComponent(fetchXml);
            const relationships: any = await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'getCustomerRelationships',
                'Started fetching customer relationships.',
                'Successfully fetched customer relationships.',
                {
                    contactId,
                },
                () => this.context.webAPI.retrieveMultipleRecords('msfsi_relationship', `?fetchXml=${encodedFetchXml}`)
            );
            const relationshipsToReturn: IRelationship[] = relationships.entities.map(relationship => ({
                id: relationship['msfsi_relationshipid'],
                contactFrom: {
                    contactId: relationship['_msfsi_contactfrom_value'],
                    fullName: relationship['ContactFrom.fullname'],
                },
                contactTo: {
                    contactId: relationship['_msfsi_contactto_value'],
                    fullName: relationship['ContactTo.fullname'],
                    contactImgUrl: relationship['ContactTo.entityimage_url'],
                },
                relationshipType: relationship['msfsi_relationshiptype'],
            }));

            return relationshipsToReturn;
        } catch (e) {
            this.loggerService.logError(
                PcfRelationshipFetcher.name,
                'getCustomerRelationships',
                'Failed to fetch customer relationships.',
                FSIErrorTypes.ServerError,
                e,
                { contactId }
            );
            throw e;
        }
    }

    async fetchRelationshipById(relationshipId: string): Promise<IRelationship> {
        try {
            const result: any = await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'fetchRelationshipById',
                'Started fetching relationship.',
                'Successfully fetched relationship.',
                {
                    relationshipId,
                },
                () => this.context.webAPI.retrieveRecord('msfsi_relationship', relationshipId)
            );

            const id: string = result['msfsi_relationshipid'];
            const contactFromId: string = result['_msfsi_contactfrom_value'];
            const contactFromName: string = result['_msfsi_contactfrom_value@OData.Community.Display.V1.FormattedValue'];
            const contactToId: string = result['_msfsi_contactto_value'];
            const contactToName: string = result['_msfsi_contactto_value@OData.Community.Display.V1.FormattedValue'];
            const relationshipType: number = result['msfsi_relationshiptype'];

            return {
                id,
                contactFrom: { contactId: contactFromId, fullName: contactFromName },
                contactTo: { contactId: contactToId, fullName: contactToName },
                relationshipType,
            };
        } catch (e) {
            this.loggerService.logError(
                PcfRelationshipFetcher.name,
                'fetchRelationshipById',
                'Failed to fetch relationship.',
                FSIErrorTypes.ServerError,
                e,
                { relationshipId }
            );
            throw e;
        }
    }

    async addRelationship(relationship: IRelationship): Promise<string> {
        const contactId = this.context.parameters?.contactId?.raw;

        if (!contactId) {
            this.loggerService.logError(PcfRelationshipFetcher.name, 'addRelationship', 'Contact id is null or empty.', FSIErrorTypes.InvalidParam);
            return '';
        }

        const relationshipMappingToEntity = {
            'msfsi_Contactfrom@odata.bind': '/contacts(' + contactId + ')',
            'msfsi_Contactto@odata.bind': '/contacts(' + relationship.contactTo.contactId + ')',
            msfsi_relationshiptype: relationship.relationshipType,
        };

        try {
            const result: any = await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'addRelationship',
                'Started adding relationship.',
                'Successfully added relationship.',
                {
                    relationship,
                },
                () => this.context.webAPI.createRecord('msfsi_relationship', relationshipMappingToEntity)
            );

            return result.id as string;
        } catch (e) {
            this.loggerService.logError(PcfRelationshipFetcher.name, 'addRelationship', 'Failed to add relationship.', FSIErrorTypes.ServerError, e, {
                relationship,
            });
            throw e;
        }
    }

    async deleteRelationship(id: string): Promise<void> {
        try {
            await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'deleteRelationship',
                'Started deleting relationship.',
                'Successfully deleted relationship.',
                {
                    'relationship id': id,
                },
                () => this.context.webAPI.deleteRecord('msfsi_relationship', id)
            );
        } catch (e) {
            this.loggerService.logError(
                PcfRelationshipFetcher.name,
                'deleteRelationship',
                'Failed to delete relationship.',
                FSIErrorTypes.ServerError,
                e,
                {
                    'relationship id': id,
                }
            );
            throw e;
        }
    }

    async updateRelationship(relationship: IRelationship): Promise<void> {
        const relationshipMappingToEntity = {
            'msfsi_Contactto@odata.bind': '/contacts(' + relationship.contactTo.contactId + ')',
            msfsi_relationshiptype: relationship.relationshipType,
        };
        try {
            await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'updateRelationship',
                'Started updating relationship.',
                'Successfully updated relationship.',
                {
                    relationship,
                },
                () => this.context.webAPI.updateRecord('msfsi_relationship', relationship.id, relationshipMappingToEntity)
            );
        } catch (e) {
            this.loggerService.logError(
                PcfRelationshipFetcher.name,
                'updateRelationship',
                'Failed to update relationship.',
                FSIErrorTypes.ServerError,
                e,
                {
                    relationship,
                }
            );
            throw e;
        }
    }

    async getMainCustomerDetails(): Promise<IAbbreviatedContact> {
        const contactId = this.context.parameters?.contactId?.raw;
        if (!contactId) {
            this.loggerService.logError(PcfRelationshipFetcher.name, 'getMainCustomerDetails', 'Contact id is null or empty.', FSIErrorTypes.ServerError);
            return Promise.reject();
        }
        try {
            const result = await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'getMainCustomerDetails',
                'Started fetching main customer.',
                'Successfully fetched main customer.',
                {
                    contactId,
                },
                () => this.getContact(contactId, ['fullname']) //await this.context.webAPI.retrieveRecord("contact", contactId, "?$select=address1_composite,fullname,annualincome");
            );
            return {
                contactId: contactId,
                fullName: result.fullname,
            };
        } catch (e) {
            this.loggerService.logError(
                PcfRelationshipFetcher.name,
                'getMainCustomerDetails',
                'Failed to fetch main customer.',
                FSIErrorTypes.ServerError,
                e,
                {
                    contactId,
                }
            );
            return Promise.reject();
        }
    }

    getRelationshipTypesMap = async (): Promise<Map<number, string>> => await this.getPicklistMap('msfsi_relationship', 'msfsi_relationshiptype');

    async getRelevantContacts(name: string): Promise<IAbbreviatedContact[]> {
        const fetchXml = [
            `<fetch top="50">`,
            `<entity name="contact">`,
            `<attribute name="contactid"/>`,
            `<attribute name="fullname"/>`,
            `<filter>`,
            `<condition attribute="fullname" operator="like" value="%${name}%"/>`,
            `</filter>`,
            `</entity>`,
            `</fetch>`,
        ].join('');
        const encodedFetchXml = encodeURIComponent(fetchXml);
        try {
            const contacts: any = await this.ExecuteAndLog(
                PcfRelationshipFetcher.name,
                'getRelevantContacts',
                'Started fetching relevant contacts.',
                'Successfully fetched relevant contacts.',
                undefined,
                () => this.context.webAPI.retrieveMultipleRecords('contact', `?fetchXml=${encodedFetchXml}`)
            );
            const contactsToReturn: IAbbreviatedContact[] = [];
            contacts.entities.forEach(contact => {
                contactsToReturn.push({
                    contactId: contact['contactid'],
                    fullName: contact['fullname'],
                });
            });
            return contactsToReturn;
        } catch (e) {
            this.loggerService.logError(
                PcfRelationshipFetcher.name,
                'getRelevantContacts',
                'Failed to fetch relevant contacts.',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }
}
export default PcfRelationshipFetcher;
