import { FHMetadata } from '../FHEntity/FHMetadata';
import { IGroup } from './IGroup';
import { IGroupContact } from './IGroupContact';
import { IGroupFinancialHolding } from './IGroupFinancialHolding';
import { IGroupMember } from './IGroupMember';
import { IGroupResponse } from './IGroupResponse';

export interface IGroupFetcher {
    getMainCustomerDetails(contactId: string): Promise<IGroupContact>;
    addNewGroup(group: IGroup, members: IGroupMember[]): Promise<IGroup>;
    updateGroup(oldGroup: IGroup, updatedGroup: IGroup, members: IGroupMember[]): Promise<IGroup>;
    deleteGroup(group: IGroup): Promise<boolean>;
    getRelevantContacts(name: string): Promise<IGroupContact[]>;
    getMemberOwnerFinancialHoldings(members: IGroupMember[], groupId: string): Promise<IGroupFinancialHolding[]>;
    getContactGroups(contactId: string, onlyPrimary: boolean): Promise<IGroupResponse>;
    getGroupTypesMap: () => Promise<Map<number, string>>;
    getGroupMemberTypesMap: () => Promise<Map<number, string>>;
    getFinancialHoldingCategoryTypesMap: () => Promise<Map<number, string>>;
    getFinancialHoldingTypeTypesMap: () => Promise<Map<number, string>>;
    fetchFHMetadata(): Promise<FHMetadata>;
}
