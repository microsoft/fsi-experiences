import { IGroup, IGroupMember } from '../../../interfaces/Groups';
import set from 'lodash/set';

const getMemberGroup = (groups: IGroup[], memberId: string): IGroupMember | undefined => {
    for (const group of groups) {
        const member = group.members.find(m => m.id === memberId);
        if (member) return member;
    }
    return undefined;
};

const initGroups = (groups: IGroup[], payload: any) => payload.groups;

const addGroups = (groups: IGroup[], payload: any) => {
    payload.otherMembers.forEach((m: IGroupMember) => {
        const member = getMemberGroup(groups, m.id);
        set(member as object, 'IsPrimaryGroup', m.IsPrimaryGroup);
    });
    return [...groups, payload.group];
};

const deleteGroup = (groups: IGroup[], payload: any) => {
    const updatedGroups = groups.filter(g => g.id !== payload.groupId);
    if (payload.newPrimaryGroup) {
        const newPrimaryGroup = updatedGroups.find(g => g.id === payload.newPrimaryGroup.id);
        set(newPrimaryGroup as object, 'members', payload.newPrimaryGroup.members);
    }
    return updatedGroups;
};

const updateGroup = (groups: IGroup[], payload: any) => {
    payload.otherMembers.forEach((m: IGroupMember) => {
        const member = getMemberGroup(groups, m.id);
        set(member as object, 'IsPrimaryGroup', m.IsPrimaryGroup);
    });
    const groupIndexToUpdate = groups.findIndex(g => g.id === payload.group.id);
    if (groupIndexToUpdate > -1) {
        groups.splice(groupIndexToUpdate, 1, { ...payload.group, creationDate: groups[groupIndexToUpdate].creationDate });
    }
    return [...groups];
};

const actionTypeMap = {
    INIT_GROUPS: initGroups,
    ADD_GROUP: addGroups,
    DELETE_GROUP: deleteGroup,
    UPDATE_GROUP: updateGroup,
};

export const groupsReducer = (groups: IGroup[], action: any): IGroup[] =>
    actionTypeMap[action.type] ? actionTypeMap[action.type](groups, action.payload) : groups;
