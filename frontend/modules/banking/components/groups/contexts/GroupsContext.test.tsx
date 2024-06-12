/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import GroupsContextProviderTest, { addIndicatorsToGroupsFinancialHolding } from './GroupsContext';
import GroupsContextChildMock, { MOCKED_GROUP_CONTEXT_TEXT } from './GroupsContextChild.mock';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { GroupErrorEnum } from '../GroupErrorEnum';
import cloneDeep from 'lodash/cloneDeep';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import * as groupContext from './GroupsContext';
import { toPickListMap } from '../../../utilities/EntityMetadata';
import { mockFetcherWithCustomer } from '../../../interfaces/Groups/mocks/MockGroupFetcher';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';

const GroupsContextProvider = ProviderWrapper(GroupsContextProviderTest);
describe('test group context', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should render group context', async () => {
        const currContext: { [key: string]: any } = {};
        const { findByText } = render(
            <GroupsContextProvider {...params}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value).not.toBeNull();
    });

    it('should return the main customer', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, getMainCustomerDetails: jest.fn().mockResolvedValue(fullMock.groupsArray[0].members[0]) };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.mainCustomer).toEqual(fullMock.groupsArray[0].members[0]);
    });

    it('should return the picklists', async () => {
        const currContext: { [key: string]: any } = {};
        const mockGroupTypeMap = new Map<number, string>([[1, '1']]);
        const mockGroupMemberTypeMap = new Map<number, string>([[2, '2']]);
        const currFetcher = {
            ...mockFetcher,
            getGroupTypesMap: jest.fn().mockResolvedValue(mockGroupTypeMap),
            getGroupMemberTypesMap: jest.fn().mockResolvedValue(mockGroupMemberTypeMap),
            fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        const pickLists = currContext.value.pickLists;
        const fhPickLists = currContext.value.fhPickLists;
        expect(pickLists.groupTypes).toEqual(mockGroupTypeMap);
        expect(pickLists.groupMemberTypes).toEqual(mockGroupMemberTypeMap);
        expect(fhPickLists.fhCategoryTypes).toEqual(toPickListMap(FHMetadataMock.categories.optionSet));
        expect(fhPickLists.fhTypeTypes).toEqual(toPickListMap(FHMetadataMock.types.optionSet));
        expect(fhPickLists.roles).toEqual(toPickListMap(FHMetadataMock.role.optionSet));
    });

    it('should return the groups from init', async () => {
        const currContext: { [key: string]: any } = {};
        const addIndicatorSpy = jest.spyOn(groupContext, 'addIndicatorsToGroupsFinancialHolding');

        const { findByText } = render(
            <GroupsContextProvider {...params}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();

        expect(currContext.value.groups).toEqual(fullMock.groupsArray);
        expect(addIndicatorSpy).toHaveBeenCalledWith(fullMock.groupsArray, undefined, false);
    });

    it('should set error when init group fail - not group fail', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockRejectedValue({ error: GroupErrorEnum.NONE, groups: [fullMock.groupsArray[1]] }),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual([fullMock.groupsArray[1]]);
        expect(currContext.value.errorState).toEqual(GroupErrorEnum.NONE);
    });

    it('should set error when init group fail - group fail', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockRejectedValue({ error: GroupErrorEnum.GROUPS_GET, groups: [fullMock.groupsArray[1]] }),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).not.toEqual([fullMock.groupsArray[1]]);
        expect(currContext.value.errorState).toEqual(GroupErrorEnum.GROUPS_GET);
    });

    it('run addGroup', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue({ groupsArray: [fullMock.groupsArray[0]], metadata: fullMock.metadata }),
            addNewGroup: jest.fn().mockResolvedValue(fullMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual([fullMock.groupsArray[0]]);
        const groupToAdd = { ...fullMock.groupsArray[1] };
        groupToAdd.members = [];
        await act(async () => await currContext.value.addGroup(groupToAdd));
        expect(currFetcher.addNewGroup).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run addGroup - not new primary', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue({ groupsArray: [fullMock.groupsArray[0]], metadata: fullMock.metadata }),
            addNewGroup: jest.fn().mockResolvedValue(fullMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual([fullMock.groupsArray[0]]);
        const groupToAdd = getFullMock().groupsArray[1];
        groupToAdd.members[0].IsPrimaryGroup = false;
        await act(async () => await currContext.value.addGroup(groupToAdd));
        expect(currFetcher.addNewGroup).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run addGroup - new primary', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue({ groupsArray: [fullMock.groupsArray[1]], metadata: fullMock.metadata }),
            addNewGroup: jest.fn().mockResolvedValue(fullMock.groupsArray[0]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual([fullMock.groupsArray[1]]);
        const groupToAdd = getFullMock().groupsArray[0];
        groupToAdd.type = 104800001;
        groupToAdd.members[0].id = 'mock1';
        await act(async () => await currContext.value.addGroup(groupToAdd));
        expect(currFetcher.addNewGroup).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toBeFalsy();
        expect(currFetcher.addNewGroup.mock.calls[0][1]).toHaveLength(1);
    });

    it('run addGroup cause exception', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue({ groupsArray: [fullMock.groupsArray[0]], metadata: fullMock.metadata }),
            addNewGroup: jest.fn().mockRejectedValue({ groupError: GroupErrorEnum.GROUPS_ADD }),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual([fullMock.groupsArray[0]]);
        const groupToAdd = { ...fullMock.groupsArray[1] };
        groupToAdd.members = [];
        try {
            await act(async () => await currContext.value.addGroup(groupToAdd));
        } catch (err) {
            await waitFor(() => expect(currFetcher.addNewGroup).toHaveBeenCalledTimes(1));
            expect(currContext.value.errorState).toEqual(GroupErrorEnum.GROUPS_ADD);
        }
    });

    it('run deleteGroup', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getFullMock();
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(currMock),
            deleteGroup: jest.fn().mockResolvedValue(currMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(currMock.groupsArray);
        const groupToDelete = currMock.groupsArray[0];
        await act(async () => await currContext.value.deleteGroup(groupToDelete));
        expect(currFetcher.deleteGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.deleteGroup.mock.calls[0][0]).toEqual(groupToDelete);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run deleteGroup - not main customer', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getFullMock();
        const currFetcher = {
            ...mockFetcher,
            getMainCustomerDetails: jest.fn().mockResolvedValue(currMock.groupsArray[0].members[1].customer),
            getContactGroups: jest.fn().mockResolvedValue(currMock),
            deleteGroup: jest.fn().mockResolvedValue(currMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(currMock.groupsArray);
        const groupToDelete = currMock.groupsArray[0];
        await act(async () => await currContext.value.deleteGroup(groupToDelete));
        expect(currFetcher.deleteGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.deleteGroup.mock.calls[0][0]).toEqual(groupToDelete);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run deleteGroup - not customer member', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getFullMock();
        const currFetcher = {
            ...mockFetcher,
            getMainCustomerDetails: jest.fn().mockResolvedValue(currMock.groupsArray[0].members[1]),
            getContactGroups: jest.fn().mockResolvedValue(currMock),
            deleteGroup: jest.fn().mockResolvedValue(currMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(currMock.groupsArray);
        const groupToDelete = currMock.groupsArray[0];
        await act(async () => await currContext.value.deleteGroup(groupToDelete));
        expect(currFetcher.deleteGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.deleteGroup.mock.calls[0][0]).toEqual(groupToDelete);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run deleteGroup - empty sorted date', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getFullMock();
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue({ groupsArray: [currMock.groupsArray[1]], metadata: currMock.metadata }),
            deleteGroup: jest.fn().mockResolvedValue(currMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual([currMock.groupsArray[1]]);
        const groupToDelete = currMock.groupsArray[1];
        await act(async () => await currContext.value.deleteGroup(groupToDelete));
        expect(currFetcher.deleteGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.deleteGroup.mock.calls[0][0]).toEqual(groupToDelete);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run deleteGroup - throw exception', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getFullMock();
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(currMock),
            deleteGroup: jest.fn().mockRejectedValue({ groupError: GroupErrorEnum.GROUPS_DELETE }),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(currMock.groupsArray);
        const groupToDelete = currMock.groupsArray[0];
        try {
            await act(async () => await currContext.value.deleteGroup(groupToDelete));
        } catch (err) {
            // Empty catch statement
        }

        expect(currFetcher.deleteGroup).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toEqual(GroupErrorEnum.GROUPS_DELETE);
    });

    it('run updateGroup', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getFullMock();
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(currMock),
            updateGroup: jest.fn().mockResolvedValue(currMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(currMock.groupsArray);
        const groupToDelete = currMock.groupsArray[0];
        await act(async () => await act(async () => await currContext.value.deleteGroup(groupToDelete)));
        expect(currFetcher.deleteGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.deleteGroup.mock.calls[0][0]).toEqual(groupToDelete);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run updateGroup 2', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(fullMock),
            updateGroup: jest.fn().mockResolvedValue(fullMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(fullMock.groupsArray);
        const groupToUpdate = { ...fullMock.groupsArray[1] };
        groupToUpdate.type = 1;
        await act(async () => await currContext.value.updateGroup(fullMock[1], groupToUpdate));
        expect(currFetcher.updateGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.updateGroup.mock.calls[0][2]).toHaveLength(0);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run updateGroup - not new primary', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(fullMock),
            updateGroup: jest.fn().mockResolvedValue(fullMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(fullMock.groupsArray);
        const groupToUpdate = getFullMock().groupsArray[1];
        groupToUpdate.members[0].IsPrimaryGroup = false;
        await act(async () => await currContext.value.updateGroup(fullMock.groupsArray[1], groupToUpdate));
        expect(currFetcher.updateGroup).toHaveBeenCalledTimes(1);
        expect(currFetcher.updateGroup.mock.calls[0][2]).toHaveLength(0);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run updateGroup - new primary', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(fullMock),
            updateGroup: jest.fn().mockResolvedValue(fullMock.groupsArray[1]),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(fullMock.groupsArray);
        const groupToUpdate = getFullMock().groupsArray[0];
        groupToUpdate.type = 104800001;
        groupToUpdate.members[0].id = 'mock1';
        await act(async () => await currContext.value.updateGroup(fullMock.groupsArray[0], groupToUpdate));
        expect(currFetcher.updateGroup).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toBeFalsy();
        expect(currFetcher.updateGroup.mock.calls[0][2]).toHaveLength(1);
    });

    it('run updateGroup cause exception', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(fullMock),
            updateGroup: jest.fn().mockRejectedValue({ groupError: GroupErrorEnum.GROUPS_UPDATE }),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.groups).toEqual(fullMock.groupsArray);
        const groupToUpdate = { ...fullMock.groupsArray[1] };
        try {
            await act(async () => await currContext.value.updateGroup(groupToUpdate, groupToUpdate));
        } catch (err) {
            await waitFor(() => expect(currFetcher.updateGroup).toHaveBeenCalledTimes(1));
            expect(currContext.value.errorState).toEqual(GroupErrorEnum.GROUPS_UPDATE);
        }
    });

    it('run getContacts', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, getContactGroups: jest.fn().mockResolvedValue(fullMock), getRelevantContacts: jest.fn() };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        currFetcher.getRelevantContacts.mockReset();
        currContext.value.getContacts();
        expect(currFetcher.getRelevantContacts).toHaveBeenCalledTimes(1);
    });

    it('run getMemberFinancialHoldings', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, getContactGroups: jest.fn().mockResolvedValue(fullMock), getMemberOwnerFinancialHoldings: jest.fn() };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );

        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();
        currFetcher.getMemberOwnerFinancialHoldings.mockReset();
        currContext.value.getMemberFinancialHoldings();
        expect(currFetcher.getMemberOwnerFinancialHoldings).toHaveBeenCalledTimes(1);
    });

    it('sort check - firstCustomerMember undef - second group is first', async () => {
        const currContext: { [key: string]: any } = {};
        const fullMock = getFullMock();
        const mockedGroups = fullMock.groupsArray;
        const group = mockedGroups[0];
        const selectedGroupMember = group.members[0];

        changeCustomerId(group, selectedGroupMember.customer.id);
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(fullMock),
            getMainCustomerDetails: jest.fn().mockResolvedValue(selectedGroupMember.customer),
        };

        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );
        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();

        expect(currContext.value.groups[0].id).toEqual(mockedGroups[1].id);
        expect(currContext.value.groups[1].id).toEqual(mockedGroups[0].id);
    });

    it('sort check - secondCustomerMember undef - first group is first', async () => {
        const currContext: { [key: string]: any } = {};
        const fullMock = getFullMock();
        const mockedGroups = fullMock.groupsArray;
        const group = mockedGroups[1];
        const selectedGroupMember = group.members[0];

        changeCustomerId(group, selectedGroupMember.customer.id);
        const currFetcher = {
            ...mockFetcher,
            getContactGroups: jest.fn().mockResolvedValue(fullMock),
            getMainCustomerDetails: jest.fn().mockResolvedValue(selectedGroupMember.customer),
        };

        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );
        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();

        expect(currContext.value.groups[0].id).toEqual(mockedGroups[0].id);
        expect(currContext.value.groups[1].id).toEqual(mockedGroups[1].id);
    });

    it('sort check - first group creation date after the second - second group is first', async () => {
        const currContext: { [key: string]: any } = {};
        const fullMock = getFullMock();
        const mockedGroups = fullMock.groupsArray;
        mockedGroups[0].creationDate = new Date('2020');
        mockedGroups[1].creationDate = new Date('2019');
        const currFetcher = { ...mockFetcher, getContactGroups: jest.fn().mockResolvedValue(fullMock) };

        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );
        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();

        expect(currContext.value.groups[0].id).toEqual(mockedGroups[1].id);
        expect(currContext.value.groups[1].id).toEqual(mockedGroups[0].id);
    });

    it('sort check - first group creation date before the second - first group is first', async () => {
        const currContext: { [key: string]: any } = {};
        const mockedGroups = getFullMock().groupsArray;
        mockedGroups[0].creationDate = new Date('2019');
        mockedGroups[1].creationDate = new Date('20120');
        const currFetcher = { ...mockFetcher, getContactGroups: jest.fn().mockResolvedValue(getFullMock()) };

        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <GroupsContextProvider {...currParams}>
                <GroupsContextChildMock context={currContext} />
            </GroupsContextProvider>
        );
        expect(await findByText(MOCKED_GROUP_CONTEXT_TEXT)).toBeVisible();

        expect(currContext.value.groups[0].id).toEqual(mockedGroups[0].id);
        expect(currContext.value.groups[1].id).toEqual(mockedGroups[1].id);
    });

    it('should add indicators to existing groups financial holdings', async () => {
        const mockedGroups = getFullMock().groupsArray;
        delete mockedGroups[0].financialHoldings;

        const groupsWithIndicators = addIndicatorsToGroupsFinancialHolding(mockedGroups, FHMetadataMock);

        groupsWithIndicators.forEach(g => {
            if (g.financialHoldings) {
                g.financialHoldings.forEach(fh => expect(fh.indicator).toBeDefined());
            }
        });
    });

    it('should not add indicators in case no metadata', async () => {
        const mockedGroups = getFullMock().groupsArray;
        const groupsWithIndicators = addIndicatorsToGroupsFinancialHolding(mockedGroups);
        groupsWithIndicators.forEach(g => g.financialHoldings!.forEach(fh => expect(fh.indicator).toEqual([])));
    });

    const changeCustomerId = (group, id) => {
        group.members.forEach((member, idx) => {
            if (member.customer.id === id) {
                group.members[idx] = cloneDeep(group.members[idx]);
                group.members[idx].customer.id = `${member.customer.id}xx`;
            }
        });
    };

    const mockFetcher = {
        ...mockFetcherWithCustomer,
        addNewGroup: jest.fn(),
        updateGroup: jest.fn(),
        deleteGroup: jest.fn(),
        getRelevantContacts: jest.fn(),
        getMemberOwnerFinancialHoldings: jest.fn(),
        getGroupTypesMap: jest.fn().mockResolvedValue(new Map<number, string>()),
        getGroupMemberTypesMap: jest.fn().mockResolvedValue(new Map<number, string>()),
        getFinancialHoldingTypeTypesMap: jest.fn().mockResolvedValue(new Map<number, string>()),
    };
    const fullMock = getFullMock();

    const params = {
        fetcher: mockFetcher,
        providers: {},
    };
});
