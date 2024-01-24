import { IGroupFetcher } from '@fsi/banking/interfaces/Groups/IGroupFetcher';
import { sleep } from '@fsi/core-components/dist/utilities/TimeUtils';
import { IGroupContact } from '@fsi/banking/interfaces/Groups/IGroupContact';
import { IGroup } from '@fsi/banking/interfaces/Groups/IGroup';
import { IGroupMember } from '@fsi/banking/interfaces/Groups/IGroupMember';
import { IGroupFinancialHolding } from '@fsi/banking/interfaces/Groups/IGroupFinancialHolding';
import ICustomerFH from '@fsi/banking/interfaces/FHEntity/CustomerFH';
import { FHMetadata } from '@fsi/banking/interfaces/FHEntity/FHMetadata';
import { fhRolesValues } from '@fsi/banking/constants/FHValueMaps';
import { createOrUpdateFHFields } from '../../financial-holding/FHDataMappers';
import {
    mockedGroupsContact,
    mockedGroup1MembersFH,
    mockedContactGroups,
    mockedGroupMembers,
    mockedRelevantContacts,
    mockedGroupTypes,
    mockedGroupMemberTypes,
    mockedFinancialHoldingCategoryTypes,
    mockedFinancialHoldingTypesTypes,
    requestMetadata,
} from '@fsi/banking/interfaces/Groups/mocks/GroupsMockData';
import { MockFHFetcher } from '@fsi/banking/constants/MockFHFetcher';
import { IFHFetcher } from '@fsi/banking/interfaces/IFHFetcher';

export class MockGroupsFetcher implements IGroupFetcher {
    private fhFetcher: IFHFetcher;

    constructor() {
        this.fhFetcher = new MockFHFetcher();
    }

    async getMainCustomerDetails(): Promise<IGroupContact> {
        return {
            id: mockedGroupsContact.contactid,
            name: mockedGroupsContact.fullname,
            address: mockedGroupsContact.address1_composite,
            income: mockedGroupsContact.annualincome,
        };
    }

    async addNewGroup(group: IGroup, members: IGroupMember[]): Promise<IGroup> {
        await sleep(1500);
        group.members.forEach(m => {
            m.id = Date.now().toString();
            if (m.customer.id === group.primaryMember) group.primaryMember = m.id;
        });
        const groupRecordUpdated = { id: `groupId_${group.name}` };
        return { ...group, id: groupRecordUpdated.id };
    }

    async updateGroup(oldGroup: IGroup, updatedGroup: IGroup, members: IGroupMember[]): Promise<IGroup> {
        await sleep(1500);
        updatedGroup.members.forEach(m => {
            if (m.id === m.customer.id) m.id = Date.now().toString();
            if (m.customer.id === updatedGroup.primaryMember) updatedGroup.primaryMember = m.id;
        });
        updatedGroup.financialHoldings = await this.getGroupFinancialHoldings(updatedGroup.id);
        return updatedGroup;
    }

    async deleteGroup(group: IGroup): Promise<boolean> {
        await sleep(1500);
        return true;
    }

    getGroupTypesMap = async (): Promise<Map<number, string>> => mockedGroupTypes;

    getGroupMemberTypesMap = async (): Promise<Map<number, string>> => mockedGroupMemberTypes;

    getFinancialHoldingCategoryTypesMap = async (): Promise<Map<number, string>> => mockedFinancialHoldingCategoryTypes;

    getFinancialHoldingTypeTypesMap = async (): Promise<Map<number, string>> => mockedFinancialHoldingTypesTypes;

    async getRelevantContacts(name: string): Promise<IGroupContact[]> {
        const contacts = mockedRelevantContacts;
        const contactsToReturn: IGroupContact[] = [];
        contacts.entities.forEach(contact => {
            contactsToReturn.push({
                id: contact['contactid'],
                name: contact['fullname'],
                address: contact['address1_composite'],
                income: contact['annualincome'] || 0,
            });
        });
        return contactsToReturn;
    }

    async getMemberOwnerFinancialHoldings(membes: IGroupMember[]): Promise<IGroupFinancialHolding[]> {
        await sleep(1500);

        const mockReturns = this.getFinancialHoldings(mockedGroup1MembersFH);
        return mockReturns;
    }

    async getContactGroups(contactId: string, onlyPrimary = false) {
        await sleep(1500);
        const groupsMap: Map<string, IGroup> = new Map<string, IGroup>();
        const promises: Promise<any[] | undefined>[] = [];
        for (const group of mockedContactGroups) {
            const groupId = group['G.msfsi_groupid'];
            const groupObj: IGroup = {
                id: groupId,
                primaryMember: group['G.msfsi_primarymember'],
                name: group['G.msfsi_name'],
                type: group['G.msfsi_type'],
                members: [],
                financialHoldings: undefined,
                creationDate: new Date(group['G.createdon']),
                version: 0,
            };
            groupsMap.set(groupId, groupObj);
            const membersPromise = this.getGroupMembers(groupId)
                .then(members => (groupObj.members = [...members]))
                .catch(err => (groupObj.members = []));
            const holdingsPromise = this.getGroupFinancialHoldings(groupId)
                .then(holdings => (groupObj.financialHoldings = [...holdings]))
                .catch(err => (groupObj.financialHoldings = undefined));
            promises.push(membersPromise, holdingsPromise);
        }
        await Promise.all(promises);
        return { groupsArray: Array.from(groupsMap.values()), metadata: requestMetadata };
    }

    private async getGroupMembers(groupId: string) {
        return mockedGroupMembers.map(member => {
            return {
                id: member['msfsi_groupmemberid'],
                role: member['msfsi_role'],
                IsPrimaryGroup: member['msfsi_isprimarygroup'],
                customer: {
                    id: member['C.contactid'],
                    name: member['C.fullname'],
                    address: member['C.address1_composite'],
                    income: member['C.annualincome'] || 0,
                },
            };
        });
    }

    private async getGroupFinancialHoldings(groupId: string) {
        return this.getFinancialHoldings(mockedGroup1MembersFH);
    }

    private getFinancialHoldings(entities: any, isGroupHolding = true) {
        const ghMap: Map<string, IGroupFinancialHolding> = new Map();
        for (const fh of entities) {
            const fhField = createOrUpdateFHFields(fh, ghMap);
            const { id } = fhField;
            const val = ghMap.get(id) || {
                ...fhField,
                groupHoldingId: isGroupHolding ? fh['msfsi_groupfinancialholdingid'] : Date.now().toString(),
                owners: Array<ICustomerFH>(),
                indicator: [],
            };
            if (!ghMap.has(id)) ghMap.set(id, val);

            const ownerId = fh['CFH.msfsi_customerid'];
            if (!val.owners.some(owner => owner.contact.contactId === ownerId)) {
                const owner: ICustomerFH = {
                    contact: {
                        contactId: ownerId,
                        fullName: fh['CFH.msfsi_customerid@OData.Community.Display.V1.FormattedValue'],
                    },
                    role: fhRolesValues.owner,
                };
                val.owners.push(owner);
            }
        }
        return Array.from(ghMap.values());
    }

    async fetchFHMetadata(): Promise<FHMetadata> {
        return this.fhFetcher.fetchFHMetadata();
    }

    public async getAccessInfo() {
        return { write: true, read: true, delete: true, create: true };
    }
}

export default MockGroupsFetcher;
