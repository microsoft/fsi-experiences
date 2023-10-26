import React, { createContext, FC, useEffect, useMemo, useReducer, useState } from 'react';
import { groupsReducer } from '../reducers/GroupsReducer';
import { IGroup, IGroupMember, IGroupContact, IGroupFinancialHolding } from '../../../interfaces/Groups';
import { IGroupFetcher } from '../../../interfaces/Groups/IGroupFetcher';
import { GroupErrorEnum } from '../GroupErrorEnum';
import orderBy from 'lodash/orderBy';
import { GroupsTypes } from '@fsi/core-components/dist/dataLayerInterface';
import { toPickListMap } from '../../../utilities/EntityMetadata';
import isNil from 'lodash/isNil';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { FINANCIAL_HOLDINGS_FLAGS } from '../../../constants/features/financialHoldings';
import useContactAccessInfo from '@fsi/core-components/dist/hooks/useContactAccessInfo';
import { getFinancialHoldingsIndicators } from '../../../hooks/financialHoldings/useFHIndicator';
import { useFHMetadata } from '../../../hooks/financialHoldings/useFHMetadata';
import { statusCodesForHiddenElements } from '../../FHHiddenMessageBar/FHHiddenMessageBar';
import { FHMetadata } from '../../../interfaces/FHEntity/FHMetadata';

export const initialGroupState: IGroup = {
    id: 'newId',
    primaryMember: 'newPrimaryId',
    name: '',
    type: 0,
    members: Array<IGroupMember>(),
    financialHoldings: Array<IGroupFinancialHolding>(),
    fhRequestMetadata: undefined,
    creationDate: new Date(),
    version: 0,
};

export const initialFHPickLists = {
    fhCategoryTypes: new Map<number, string>(),
    fhTypeTypes: new Map<number, string>(),
    roles: new Map<number, string>(),
};

export const GroupsContext = createContext({
    loadingState: { isLoading: false, msg: '' },
    initialized: false,
    errorState: GroupErrorEnum.NONE,
    defaultGroup: initialGroupState,
    selectedGroup: initialGroupState,
    setSelectedGroup: (group: IGroup) => {},
    groups: Array<IGroup>(),
    mainCustomer: {} as IGroupContact,
    addGroup: /* istanbul ignore next */ (group: IGroup) => Promise.resolve<IGroup | undefined>(undefined),
    deleteGroup: /* istanbul ignore next */ (group: IGroup) => Promise.resolve<boolean>(false),
    updateGroup: /* istanbul ignore next */ (oldGroup: IGroup, updatedGroup: IGroup) => Promise.resolve<IGroup | undefined>(undefined),
    getContacts: /* istanbul ignore next */ (name: string) => Promise.resolve<IGroupContact[]>([]),
    getMemberFinancialHoldings: /* istanbul ignore next */ (members: IGroupMember[], groupId: string) =>
        Promise.resolve<IGroupFinancialHolding[]>([]),
    pickLists: {
        groupTypes: new Map<number, string>(),
        groupMemberTypes: new Map<number, string>(),
    },
    fhPickLists: initialFHPickLists,
    fhMetadata: undefined as FHMetadata | undefined,
    readonly: undefined as boolean | undefined,
});

export const addIndicatorsToGroupsFinancialHolding = (groups: IGroup[], fhMetadata?: FHMetadata, disabledFinancialInsights?: boolean): IGroup[] => {
    return groups?.map(g => {
        const groupWithIndicators = {
            ...g,
        };
        if (g.financialHoldings && fhMetadata) {
            groupWithIndicators.financialHoldings = g.financialHoldings.map(item => {
                return {
                    ...item,
                    indicator: getFinancialHoldingsIndicators(item, fhMetadata, disabledFinancialInsights),
                };
            });
        }
        return groupWithIndicators;
    });
};

const GroupsContextProvider: FC<{ fetcher: IGroupFetcher; contactId: string }> = ({ fetcher, contactId, children }) => {
    const { postMessage } = useBrowserCommunication(`groups-listener-${contactId}`);
    const { data } = useContactAccessInfo({ entityId: contactId, fetcher });
    const enabledFinancialInsights = useIsFeatureEnabled(FINANCIAL_HOLDINGS_FLAGS.SHOW_FINANCIAL_INSIGHTS);
    const [initialized, setInitialized] = useState(false);
    const [loadingState, setLoadingState] = useState<{ isLoading: boolean; msg: string }>({ isLoading: true, msg: 'Groups are loading' });
    const [errorState, setErrorState] = useState<GroupErrorEnum>(GroupErrorEnum.NONE);
    const [defaultGroup, setDefaultGroup] = useState<IGroup>(initialGroupState);
    const [groups, dispatch] = useReducer(groupsReducer, []);
    const [groupsReadonly, setGroupsReadonly] = useState<boolean>(false);
    const [pickLists, setPicklists] = useState({
        groupTypes: new Map<number, string>(),
        groupMemberTypes: new Map<number, string>(),
    });

    const [mainCustomer, setMainCustomer] = useState<IGroupContact>({} as any);

    const [selectedGroup, setSelectedGroup] = useState<IGroup>(initialGroupState);

    const { data: fhMetadata } = useFHMetadata(() => fetcher.fetchFHMetadata());

    const sortedGroups = useMemo(() => {
        const groupsMainCustomerMap = new Map();
        const groupsWithIndicators = addIndicatorsToGroupsFinancialHolding(groups, fhMetadata, !enabledFinancialInsights);
        if (isNil(groupsWithIndicators)) return [];

        groupsWithIndicators.forEach(g => {
            const customerMember = g.members.find(m => m.customer.id === mainCustomer.id);
            groupsMainCustomerMap.set(g.id, customerMember);
        });

        return [...groupsWithIndicators].sort((a: IGroup, b: IGroup) => {
            const firstCustomerMember = groupsMainCustomerMap.get(a.id);
            const secondCustomerMember = groupsMainCustomerMap.get(b.id);

            const firstMemberIsPrimary = +(firstCustomerMember?.IsPrimaryGroup || false);
            const secondMemberIsPrimary = +(secondCustomerMember?.IsPrimaryGroup || false);
            return firstMemberIsPrimary === secondMemberIsPrimary
                ? a.creationDate.getTime() - b.creationDate.getTime()
                : secondMemberIsPrimary - firstMemberIsPrimary;
        });
    }, [groups, mainCustomer, fhMetadata, enabledFinancialInsights]);

    useEffect(() => {
        const type = pickLists.groupTypes.keys().next().value;
        setDefaultGroup({
            id: '',
            primaryMember: mainCustomer.id,
            name: '',
            type: type,
            members: [
                {
                    id: mainCustomer.id,
                    role: 0,
                    IsPrimaryGroup: !sortedGroups?.some(
                        (g: IGroup) => g.type === type && g.members.some(m => m.customer.id === mainCustomer.id && m.IsPrimaryGroup)
                    ),
                    customer: mainCustomer,
                },
            ],
            financialHoldings: [],
            creationDate: new Date(),
            version: 0,
        });
    }, [mainCustomer, sortedGroups, pickLists]);

    useEffect(() => {
        initMainCustomer();
        initPicklists();
        initGroups();
    }, []);

    const initMainCustomer = async () => {
        const customer = await fetcher.getMainCustomerDetails(contactId);
        setMainCustomer(customer);
    };

    const initPicklists = async () => {
        const promises: Promise<any>[] = [fetcher.getGroupTypesMap(), fetcher.getGroupMemberTypesMap()];
        const results = await Promise.all(promises);
        const groupTypes = results[0];
        const groupMemberTypes = results[1];
        setPicklists({ groupTypes, groupMemberTypes });
    };

    const fhPickLists = useMemo(() => {
        if (!fhMetadata) {
            return initialFHPickLists;
        }
        return {
            fhCategoryTypes: toPickListMap(fhMetadata.categories.optionSet),
            fhTypeTypes: toPickListMap(fhMetadata.types.optionSet),
            roles: toPickListMap(fhMetadata.role.optionSet),
        };
    }, [fhMetadata]);

    const initGroups = async () => {
        try {
            const res = await fetcher.getContactGroups(contactId, false);
            dispatch({ type: 'INIT_GROUPS', payload: { groups: res.groupsArray } });
            setErrorState(GroupErrorEnum.NONE);
            setGroupsReadonly(Object.values(res.metadata || {}).some(entityMetadata => statusCodesForHiddenElements.has(entityMetadata)));
            setInitialized(true);
        } catch (err: any) {
            if (err.error !== GroupErrorEnum.GROUPS_GET) {
                dispatch({ type: 'INIT_GROUPS', payload: { groups: err.groups } });
            }
            setErrorState(err.error);
        } finally {
            setLoadingState({ isLoading: false, msg: '' });
        }
    };

    const addGroup = async (newGroup: IGroup): Promise<IGroup> => {
        setLoadingState({ isLoading: true, msg: 'Adding group' });
        const updateMembers: IGroupMember[] = [];
        const groupTypes = groups.filter((g: IGroup) => g.type === newGroup.type);
        const customerMember = newGroup.members.find(gm => gm.customer.id === mainCustomer.id);
        if (customerMember?.IsPrimaryGroup) {
            for (const g of groupTypes) {
                const mem = g.members.find((m: IGroupMember) => m.customer.id === mainCustomer.id);
                if (mem && mem.id !== customerMember.id) {
                    updateMembers.push({ ...mem, IsPrimaryGroup: false });
                }
            }
        }
        try {
            const res = await fetcher.addNewGroup(newGroup, updateMembers);
            /* istanbul ignore next */
            if (!res.creationDate) {
                res.creationDate = new Date();
            }
            const dispatchData = { type: 'ADD_GROUP', payload: { group: res, otherMembers: updateMembers } };
            postMessage(dispatchData);
            dispatch(dispatchData);
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(GroupErrorEnum.NONE);
            setSelectedGroup(res);
            return res;
        } catch (err: any) {
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(err.groupError);
            throw err;
        }
    };

    const deleteGroup = async (group: IGroup): Promise<boolean> => {
        setLoadingState({ isLoading: true, msg: 'Deleting group' });
        const newPrimaryGroup = getNextPrimaryGroup(group);
        try {
            const res = await fetcher.deleteGroup(group);
            const dispatchData = { type: 'DELETE_GROUP', payload: { groupId: group.id, newPrimaryGroup } };
            dispatch(dispatchData);
            postMessage(dispatchData);
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(GroupErrorEnum.NONE);
            return res;
        } catch (err: any) {
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(err.groupError);
            throw err;
        }
    };

    const updateGroup = async (oldGroup: IGroup, updatedGroup: IGroup): Promise<IGroup> => {
        setLoadingState({ isLoading: true, msg: 'Updating group' });
        const updateMembers: IGroupMember[] = [];
        const groupTypes = groups.filter((g: IGroup) => g.type === updatedGroup.type);
        const customerMember = updatedGroup.members.find(gm => gm.customer.id === mainCustomer.id);
        if (customerMember?.IsPrimaryGroup) {
            for (const g of groupTypes) {
                const mem = g.members.find((m: IGroupMember) => m.customer.id === mainCustomer.id);
                if (mem && mem.id !== customerMember.id) {
                    updateMembers.push({ ...mem, IsPrimaryGroup: false });
                }
            }
        }
        try {
            const res = await fetcher.updateGroup(oldGroup, updatedGroup, updateMembers);
            const dispatchData = { type: 'UPDATE_GROUP', payload: { group: res, otherMembers: updateMembers } };
            postMessage(dispatchData);
            dispatch(dispatchData);
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(GroupErrorEnum.NONE);
            setSelectedGroup(res);
            return res;
        } catch (err: any) {
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(err.groupError);
            throw err;
        }
    };

    const getNextPrimaryGroup = (group: IGroup) => {
        const customerMember = group.members.find(gm => gm.customer.id === mainCustomer.id);
        if (customerMember?.IsPrimaryGroup) {
            return getNewPrimaryGroup(group.id);
        }
        return undefined;
    };

    const getNewPrimaryGroup = (deletedGroupId: string) => {
        const sortedByDate = orderBy(
            groups.filter(g => g.id !== deletedGroupId && g.type === GroupsTypes.household),
            ['creationDate']
        );
        if (sortedByDate?.length !== 0) {
            const customerMember = sortedByDate[0].members.find(gm => gm.customer.id === mainCustomer.id);
            if (customerMember) {
                customerMember.IsPrimaryGroup = true;
            }
            return sortedByDate[0];
        }
        return undefined;
    };

    const getContacts = async (name: string): Promise<IGroupContact[]> => await fetcher.getRelevantContacts(name);

    const getMemberFinancialHoldings = async (members: IGroupMember[], groupId: string): Promise<IGroupFinancialHolding[]> =>
        await fetcher.getMemberOwnerFinancialHoldings(members, groupId);

    return (
        <GroupsContext.Provider
            value={{
                initialized,
                loadingState,
                errorState,
                defaultGroup,
                selectedGroup,
                setSelectedGroup,
                pickLists,
                fhPickLists,
                groups: sortedGroups || [],
                mainCustomer,
                addGroup,
                deleteGroup,
                updateGroup,
                getContacts,
                fhMetadata,
                getMemberFinancialHoldings,
                readonly: !data?.write || groupsReadonly,
            }}
        >
            {children}
        </GroupsContext.Provider>
    );
};

export default GroupsContextProvider;
