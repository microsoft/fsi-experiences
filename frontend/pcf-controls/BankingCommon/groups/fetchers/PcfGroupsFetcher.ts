/* eslint-disable no-useless-catch */
import { IGroupMember, IGroup, IGroupFinancialHolding, IGroupContact, IGroupFinancialHoldingData } from '@fsi/banking/interfaces/Groups';
import { IGroupFetcher } from '@fsi/banking/interfaces/Groups/IGroupFetcher';
import { GroupErrorEnum } from '@fsi/banking/components/groups/GroupErrorEnum';
import { GroupsError } from '@fsi/banking/components/groups/GroupsError';
import { FHFetcher } from '../../financial-holding/fetchers/FHFetcher';
import { ICustomerFH } from '@fsi/banking/interfaces/FHEntity/CustomerFH';
import { FHMetadata } from '@fsi/banking/interfaces/FHEntity/FHMetadata';
import { fhOwnerRoles } from '@fsi/banking/constants/FHValueMaps';
import currencyService from '@fsi/pcf-common/services/CurrencyService';
import { getContactFHMainQueryXML } from '@fsi/banking/constants/FHQuery';
import { geFetchInstrumentByGroupXml, getFetchGroupMemberXml } from '../GroupsQuery';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { PCFBaseExecuteWebAPI } from '@fsi/pcf-common/data-layer/base/PCFBaseExecuteWebAPI';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { buildHiddenFinancialHoldings, createFinancialHoldingMap } from '../../financial-holding/FHDataMappers';

export class PcfGroupsFetcher extends PCFBaseExecuteWebAPI implements IGroupFetcher {
    private fhFetcher: FHFetcher;

    constructor(context: any, protected loggerService: ILoggerService) {
        super(context, loggerService);
        this.fhFetcher = new FHFetcher(context, loggerService);
    }

    async getMainCustomerDetails(contactId: string): Promise<IGroupContact> {
        if (!contactId) {
            this.loggerService.logError(PcfGroupsFetcher.name, 'getMainCustomerDetails', 'Contact id is null.', FSIErrorTypes.NullReference);
            return Promise.reject();
        }
        try {
            const result: any = await this.ExecuteAndLog(
                PcfGroupsFetcher.name,
                'getMainCustomerDetails',
                'Started retrieval of contact entity.',
                'Successfully retrieved contact.',
                { contactId: contactId },
                () => this.context.webAPI.retrieveRecord('contact', contactId, '?$select=address1_composite,fullname,annualincome')
            );

            return {
                id: contactId,
                name: result.fullname,
                address: result.address1_composite ? result.address1_composite : '',
                income: result.annualincome || 0,
            };
        } catch (e) {
            this.loggerService.logError(
                PcfGroupsFetcher.name,
                'getMainCustomerDetails',
                'An error occured retrieving contact record.',
                FSIErrorTypes.ServerError,
                e
            );
            return Promise.reject();
        }
    }

    async addNewGroup(group: IGroup, members: IGroupMember[]): Promise<IGroup> {
        const jsonData = {
            group,
            otherMembers: members,
        };
        return await this.handleGroupAction(jsonData, 'msfsi_GroupAdd', GroupErrorEnum.GROUPS_ADD);
    }

    async updateGroup(oldGroup: IGroup, updatedGroup: IGroup, members: IGroupMember[]): Promise<IGroup> {
        const jsonData = {
            oldGroup,
            updatedGroup,
            otherMembers: members,
        };
        return await this.handleGroupAction(jsonData, 'msfsi_GroupUpdate', GroupErrorEnum.GROUPS_UPDATE);
    }

    handleGroupAction = async (jsonData: any, actionName: string, error: GroupErrorEnum) => {
        const action = this.createAction(jsonData, actionName, 'data');
        try {
            const result = await this.ExecuteAndLog(
                PcfGroupsFetcher.name,
                'handleGroupAction',
                'Started executing group action.',
                'Successfully executed group action.',
                { action },
                () => this.getActionResult(action)
            );
            result.creationDate = new Date(result.creationDate);
            const financialHoldings = await this.getGroupFinancialHoldings(result.id);
            result.financialHoldings = financialHoldings.financialHoldingsData;
            result.fhRequestMetadata = financialHoldings.requestMetadata;
            return result;
        } catch (e: any) {
            this.loggerService.logError(
                PcfGroupsFetcher.name,
                'handleGroupAction',
                'An error occured executing group action.',
                FSIErrorTypes.ServerError,
                e
            );
            throw new GroupsError(e.message, error);
        }
    };

    async deleteGroup(group: IGroup): Promise<boolean> {
        const jsonData = {
            group,
        };
        const deleteAction = this.createAction(jsonData, 'msfsi_GroupDelete', 'data');
        try {
            const result = await this.ExecuteAndLog(
                PcfGroupsFetcher.name,
                'deleteGroup',
                'Started deleting group.',
                'Successfully deleted group.',
                { groupId: group.id },
                () => this.getActionResult(deleteAction)
            );
            return result;
        } catch (e: any) {
            this.loggerService.logError(PcfGroupsFetcher.name, 'deleteGroup', 'An error occured deleting group.', FSIErrorTypes.ServerError, e);
            throw new GroupsError(e.message, GroupErrorEnum.GROUPS_DELETE);
        }
    }

    getActionResult = async (action: any) => {
        try {
            const response = await this.execute(action);
            try {
                const res = JSON.parse(response.result);
                return res;
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    };

    getGroupTypesMap = async (): Promise<Map<number, string>> => await this.getPicklistMap('msfsi_group', 'msfsi_type');

    getGroupMemberTypesMap = async (): Promise<Map<number, string>> => await this.getPicklistMap('msfsi_groupmember', 'msfsi_role');

    getFinancialHoldingCategoryTypesMap = async (): Promise<Map<number, string>> =>
        await this.getPicklistMap('msfsi_financialholding', 'msfsi_financialholdingcategory');

    getFinancialHoldingTypeTypesMap = async (): Promise<Map<number, string>> =>
        await this.getPicklistMap('msfsi_financialholding', 'msfsi_financialholdingtype');

    async getRelevantContacts(name: string): Promise<IGroupContact[]> {
        const fetchXml = [
            `<fetch top="50">`,
            `<entity name="contact">`,
            `<attribute name="contactid"/>`,
            `<attribute name="fullname"/>`,
            `<attribute name="address1_composite"/>`,
            `<attribute name="annualincome"/>`,
            `<filter>`,
            `<condition attribute="fullname" operator="like" value="%${name}%"/>`,
            `</filter>`,
            `</entity>`,
            `</fetch>`,
        ].join('');
        const encodedFetchXml = encodeURIComponent(fetchXml);
        try {
            const contacts: any = await this.ExecuteAndLog(
                PcfGroupsFetcher.name,
                'getRelevantContacts',
                'Started fetching relevant contacts.',
                'Successfully fetched relevant contacts group.',
                undefined,
                () => this.context.webAPI.retrieveMultipleRecords('contact', `?fetchXml=${encodedFetchXml}`)
            );
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
        } catch (e) {
            this.loggerService.logError(PcfGroupsFetcher.name, 'getRelevantContacts', 'An error occured fetching contacts.', FSIErrorTypes.ServerError, e);
            throw e;
        }
    }

    async getMemberOwnerFinancialHoldings(members: IGroupMember[], groupId: string): Promise<IGroupFinancialHolding[]> {
        const ids = members.map(member => member.customer.id);
        const existingGroupFilter = groupId
            ? [
                  `<link-entity name='msfsi_groupfinancialholding' from='msfsi_financialholding' to='msfsi_financialholdingid' link-type='outer' alias='GFH'>`,
                  `<filter>`,
                  `<condition attribute="msfsi_group" operator="eq" value="${groupId}"/>`,
                  `</filter>`,
                  `<attribute name='msfsi_groupfinancialholdingid' />`,
                  `</link-entity>`,
              ].join('')
            : '';

        const fetchXml = getContactFHMainQueryXML(ids, existingGroupFilter);

        const encodedFetchXml = encodeURIComponent(fetchXml);
        try {
            const fhs: any = await this.ExecuteAndLog(
                PcfGroupsFetcher.name,
                'getMemberOwnerFinancialHoldings',
                'Started fetching members FH.',
                'Successfully fetched members FH.',
                {
                    ids,
                    groupId,
                },
                () => this.context.webAPI.retrieveMultipleRecords('msfsi_customerfinancialholding', `?fetchXml=${encodedFetchXml}`)
            );

            const fhCategories = await this.getFinancialHoldingCategoryTypesMap();
            const fhEntities = fhs.entities.filter(
                entity => fhOwnerRoles.includes(entity['msfsi_financialholdingrole']) && fhCategories.has(entity['FH.msfsi_financialholdingcategory'])
            );
            const fhMap = createFinancialHoldingMap(fhEntities, [], false);
            return this.addGroupsPropsToFH(
                fhMap as Map<string, IGroupFinancialHolding>,
                fhEntities,
                '_msfsi_customerid_value',
                'msfsi_financialholdingrole'
            );
        } catch (err) {
            this.loggerService.logError(
                PcfGroupsFetcher.name,
                'getMemberOwnerFinancialHoldings',
                'An error occured fetching members FH.',
                FSIErrorTypes.ServerError,
                err,
                {
                    groupId,
                    members: members.map(member => member.id),
                }
            );
            throw err;
        }
    }

    async getContactGroups(contactId: string, onlyPrimary = false) {
        const groupsMap: Map<string, IGroup> = new Map<string, IGroup>();
        let groupsFhMetadata: { [entityName: string]: HttpStatusCode };
        const fetchXml = [
            `<fetch>`,
            `<entity name="contact">`,
            `<filter>`,
            `<condition attribute="contactid" operator="eq" value="${contactId}"/>`,
            `</filter>`,
            `<link-entity name="msfsi_groupmember" from="msfsi_member" to="contactid" alias="GM">`,
            onlyPrimary ? '<filter><condition attribute="msfsi_isprimarygroup" operator="eq" value="true"/></filter>,' : null,
            `<link-entity name="msfsi_group" from="msfsi_groupid" to="msfsi_group" alias="G">`,
            `<attribute name="msfsi_groupid"/>`,
            `<attribute name="msfsi_primarymember"/>`,
            `<attribute name="msfsi_name"/>`,
            `<attribute name="msfsi_type"/>`,
            `<attribute name="createdon"/>`,
            `<attribute name="versionnumber"/>`,
            `</link-entity>`,
            `</link-entity>`,
            `</entity>`,
            `</fetch>`,
        ]
            .filter(s => s)
            .join('');
        const encodedFetchXml = encodeURIComponent(fetchXml);
        try {
            const groupsRes = this.context.webAPI.retrieveMultipleRecords('contact', `?fetchXml=${encodedFetchXml}`);
            const currencyLoaded = currencyService.getCurrencies(this.context);

            const [groups] = await this.ExecuteAndLog(
                PcfGroupsFetcher.name,
                'getContactGroups',
                'Started fetching contact groups.',
                'Successfully fetched contact groups.',
                {
                    contactId,
                    onlyPrimary,
                },
                () => Promise.all([groupsRes, currencyLoaded])
            );

            groupsFhMetadata = (await this.getGroupFinancialHoldings('')).requestMetadata || {};
            const promises: Promise<any | undefined>[] = [];
            for (const group of groups.entities) {
                const groupId = group['G.msfsi_groupid'];
                const groupObj: IGroup = {
                    id: groupId,
                    primaryMember: group['G.msfsi_primarymember'],
                    name: group['G.msfsi_name'],
                    type: group['G.msfsi_type'],
                    members: [],
                    financialHoldings: undefined,
                    fhRequestMetadata: undefined,
                    creationDate: new Date(group['G.createdon']),
                    version: group['G.versionnumber'],
                };
                groupsMap.set(groupId, groupObj);
                const membersPromise = this.getGroupMembers(groupId)
                    .then(members => (groupObj.members = [...members]))
                    .catch(err => (groupObj.members = []));
                const holdingsPromise = this.getGroupFinancialHoldings(groupId)
                    .then(groupFHData => {
                        groupObj.financialHoldings = [...groupFHData.financialHoldingsData];
                        groupObj.fhRequestMetadata = { ...groupFHData.requestMetadata };
                    })
                    .catch(err => (groupObj.financialHoldings = undefined));
                promises.push(membersPromise, holdingsPromise);
            }
            try {
                await this.ExecuteAndLog(
                    PcfGroupsFetcher.name,
                    'getContactGroups',
                    'Started executing FH and members promises.',
                    'Successfully executing FH and members promises.',
                    {
                        'promises length': promises.length,
                    },
                    () => Promise.all(promises)
                );
            } catch (ex) {
                this.loggerService.logError(
                    PcfGroupsFetcher.name,
                    'getContactGroups',
                    'An error occured executing FH and members promises.',
                    FSIErrorTypes.ServerError,
                    ex,
                    { groups: Array.from(groupsMap.values()) }
                );
                throw { groups: Array.from(groupsMap.values()), error: GroupErrorEnum.GROUPS_GET };
            }
        } catch (ex) {
            this.loggerService.logError(
                PcfGroupsFetcher.name,
                'getContactGroups',
                'An error occured getting contact groups.',
                FSIErrorTypes.ServerError,
                ex
            );
            throw { groups: [], error: GroupErrorEnum.GROUPS_GET };
        }

        return { groupsArray: Array.from(groupsMap.values()), metadata: groupsFhMetadata };
    }

    private async getGroupMembers(groupId: string): Promise<IGroupMember[]> {
        const result: any = await this.ExecuteAndLog(
            PcfGroupsFetcher.name,
            'getGroupMembers',
            'Started fetching group members.',
            'Successfully fetched group members.',
            {
                groupId,
            },
            () => this.context.webAPI.retrieveMultipleRecords('msfsi_groupmember', `?fetchXml=${getFetchGroupMemberXml(groupId)}`)
        );
        return result.entities.map(member => {
            return {
                id: member['msfsi_groupmemberid'],
                role: member['msfsi_role'],
                IsPrimaryGroup: member['msfsi_isprimarygroup'],
                customer: {
                    id: member['C.contactid'],
                    name: member['C.fullname'],
                    address: member['C.address1_composite'],
                    income: member['C.annualincome'] || 0,
                    contactImgUrl: member['C.entityimage_url'],
                },
            };
        });
    }

    private async getGroupFinancialHoldings(groupId: string): Promise<IGroupFinancialHoldingData> {
        const hideShowEntities = buildHiddenFinancialHoldings(this.context);
        const action = this.createAction({ groupId: groupId, hideShowEntities }, 'msfsi_GFHfetch', 'data');
        const promises = [
            this.execute(action),
            this.context.webAPI.retrieveMultipleRecords('msfsi_groupfinancialholding', `?fetchXml=${geFetchInstrumentByGroupXml(groupId)}`),
        ];
        const [fhResponse, fiRecords] = await this.ExecuteAndLog(
            PcfGroupsFetcher.name,
            'getGroupFinancialHoldings',
            'Started fetching group FH.',
            'Successfully fetched group FH.',
            {
                groupId,
            },
            () => Promise.all(promises)
        );

        const fhRecords: Map<string, any> = JSON.parse(fhResponse.result);
        const fhEntities = JSON.parse(fhRecords['entities']);
        const fhMap = createFinancialHoldingMap(fhEntities, fiRecords.entities, true);

        return {
            financialHoldingsData: this.addGroupsPropsToFH(
                fhMap as Map<string, IGroupFinancialHolding>,
                fhEntities,
                'CFH.msfsi_customerid',
                'CFH.msfsi_financialholdingrole'
            ),
            requestMetadata: JSON.parse(fhRecords['metadata']),
        };
    }

    private getValueFromEntity(entity: any, fieldName: string): any {
        const attribute = entity.Attributes?.find(att => att.Key === fieldName);
        return entity[fieldName] || (attribute?.Value?.Value === 0 ? 0 : attribute?.Value?.Value || attribute?.Value?.Id || attribute?.Value);
    }

    private addGroupsPropsToFH(
        gfhMap: Map<string, IGroupFinancialHolding>,
        fhEntities: any[],
        customerIdFieldName: string,
        roleFieldName: string
    ): IGroupFinancialHolding[] {
        for (const fh of fhEntities) {
            const groupFH = gfhMap.get(this.getValueFromEntity(fh, 'FH.msfsi_financialholdingid'));
            if (!groupFH) {
                continue;
            }

            if (!groupFH.groupHoldingId) {
                (groupFH.groupHoldingId = this.getValueFromEntity(fh, 'GFH.msfsi_groupfinancialholdingid')), (groupFH.owners = []);
            }

            const ownerId = this.getValueFromEntity(fh, customerIdFieldName);
            const ownerName =
                fh[`${customerIdFieldName}@OData.Community.Display.V1.FormattedValue`] ||
                fh.FormattedValues?.find(att => att.Key === customerIdFieldName).Value;
            if (!groupFH.owners.some(owner => owner.contact.contactId === ownerId)) {
                const owner: ICustomerFH = {
                    contact: {
                        contactId: ownerId,
                        fullName: ownerName,
                    },
                    role: this.getValueFromEntity(fh, roleFieldName),
                };
                groupFH.owners.push(owner);
            }
        }
        return Array.from(gfhMap.values());
    }

    async fetchFHMetadata(): Promise<FHMetadata> {
        return this.fhFetcher.fetchFHMetadata();
    }
}
export default PcfGroupsFetcher;
