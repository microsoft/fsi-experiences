import { IGroupMember } from '../../../interfaces/Groups/IGroupMember';
import { IGroup } from '../../../interfaces/Groups/IGroup';
import { groupsReducer } from './GroupsReducer';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import cloneDeep from 'lodash/cloneDeep';

describe('Group reducer', () => {
    const fullMock = getFullMock();

    it("action doesn't exists - should return the groups", () => {
        const action = {
            type: 'mock',
        };

        const res = groupsReducer(fullMock.groupsArray, action);
        expect(res).toEqual(fullMock.groupsArray);
    });

    it("action init - return the payload's groups", () => {
        const action = {
            type: 'INIT_GROUPS',
            payload: {
                groups: fullMock.groupsArray,
            },
        };

        const res = groupsReducer([], action);
        expect(res).toEqual(fullMock.groupsArray);
    });

    it("action add - return the payload's groups", () => {
        const currMock = getFullMock();
        const currGroups = [currMock.groupsArray[0]];
        const otherMember = currMock.groupsArray[0].members[0];
        otherMember.IsPrimaryGroup = true;

        const action = {
            type: 'ADD_GROUP',
            payload: {
                group: currMock.groupsArray[1],
                otherMembers: [{ ...otherMember, IsPrimaryGroup: false }],
            },
        };

        const res = groupsReducer(currGroups, action);
        expect(res.length).toEqual(2);
        expect(res[0].members[0].IsPrimaryGroup).toBeFalsy();
    });

    it("action add without setting primary - return the payload's groups", () => {
        const currMock = getFullMock();
        const currGroups = [currMock.groupsArray[0]];
        const otherMember = currMock.groupsArray[0].members[0];
        otherMember.IsPrimaryGroup = true;

        const action = {
            type: 'ADD_GROUP',
            payload: {
                group: currMock.groupsArray[1],
                otherMembers: [],
            },
        };

        const res = groupsReducer(currGroups, action);
        expect(res.length).toEqual(2);
        expect(res[1].id).toEqual(currMock.groupsArray[1].id);
        expect(res[0].members[0].IsPrimaryGroup).toBeTruthy();
    });

    it('action add - member groups not found but add complete', () => {
        const currMock = getFullMock();
        const currGroups = [currMock.groupsArray[0]];
        const otherMember = { id: 'mock' };

        const action = {
            type: 'ADD_GROUP',
            payload: {
                group: currMock.groupsArray[1],
                otherMembers: [{ ...otherMember }],
            },
        };

        const res = groupsReducer(currGroups, action);
        expect(res.length).toEqual(2);
    });

    it('action update - return the updated groups', () => {
        const newName = 'mock';
        const newField = 121212;
        const currMock = getFullMock();
        const currGroups = [currMock.groupsArray[0]];
        const updateGroup = cloneDeep(currGroups[0]) as IGroup;
        currGroups[0].name = 'before';
        updateGroup.name = newName;
        updateGroup.type = newField;

        const action = {
            type: 'UPDATE_GROUP',
            payload: {
                group: updateGroup,
                otherMembers: [],
            },
        };

        const res = groupsReducer(currGroups, action);
        expect(res[0].name).toEqual(newName);
        expect(res[0].type).toEqual(newField);
    });

    it('action update - update the other members to not be primary', () => {
        const currMock = getFullMock();
        const currGroups = [currMock.groupsArray[0]];
        const otherMember = currMock.groupsArray[0].members[1];
        otherMember.IsPrimaryGroup = true;

        const action = {
            type: 'UPDATE_GROUP',
            payload: {
                group: currGroups,
                otherMembers: [{ ...otherMember, IsPrimaryGroup: false }],
            },
        };

        const res = groupsReducer(currGroups, action);
        expect(res[0].members[1].IsPrimaryGroup).toBeFalsy();
    });

    it('action delete - return the remaining groups', () => {
        const currMock = getFullMock();

        const action = {
            type: 'DELETE_GROUP',
            payload: {
                groupId: currMock.groupsArray[1].id,
            },
        };

        const res = groupsReducer(currMock.groupsArray, action);
        expect(res.length).toEqual(1);
        expect(res[0].id).toEqual(currMock.groupsArray[0].id);
    });

    it('action delete - return the remaining groups 2', () => {
        const currMock = getFullMock();
        const mockGroupMember: IGroupMember = {
            id: 'mock',
            role: 1,
            IsPrimaryGroup: false,
            customer: {
                id: 'mock',
                name: 'mock',
                address: 'mock',
                income: 1,
            },
        };
        currMock.groupsArray[0].members = [mockGroupMember];

        const action = {
            type: 'DELETE_GROUP',
            payload: {
                groupId: currMock.groupsArray[1].id,
                newPrimaryGroup: { id: currMock.groupsArray[0].id, members: [] },
            },
        };

        const res = groupsReducer(currMock.groupsArray, action);
        expect(res[0].members.length).toEqual(0);
    });
});
