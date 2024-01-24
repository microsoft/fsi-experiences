export const GroupsTypes = {
    household: 104800000,
    customGroup: 104800001,
};

export const RolesTypes = {
    //household
    104800000: new Set([104800000, 104800001, 104800002, 104800003, 104800004]),
    //custom group
    104800001: new Set([104800005]),
};

export const defaultRolesTypes = RolesTypes[104800001];

export const MemberRolesTypes = {
    Blank: 0,
};

export const GroupIconType = {
    104800000: 'Home',
    104800001: 'Group',
};

export const defaultGroupIconType = GroupIconType[104800001];

export const VISITOR_NAMES = {
    indicator: 'indicator',
};

export const defaultFontFamily = 'Segoe UI';
