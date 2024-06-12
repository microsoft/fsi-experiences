/* istanbul ignore file */
import { getFullMock } from '../../interfaces/Groups/mocks/IGroup.mock';
import cloneDeep from 'lodash/cloneDeep';
import { IGroup, IGroupContact, IGroupFinancialHolding, IGroupMember } from '../../interfaces/Groups';
import { GroupErrorEnum } from './GroupErrorEnum';

const fullMock = getFullMock();
export const myGroup = fullMock.groupsArray[0];

const GroupsContextMock = {
    value: {
        loadingState: { isLoading: false, msg: '' },
        initialized: false,
        errorState: GroupErrorEnum.NONE,
        defaultGroup: myGroup,
        selectedGroup: myGroup,
        setSelectedGroup: (group: IGroup) => {},
        groups: fullMock.groupsArray,
        mainCustomer: { ...myGroup.members[0].customer },
        addGroup: (group: IGroup) => Promise.resolve<IGroup | undefined>(undefined),
        deleteGroup: (group: IGroup) => Promise.resolve<boolean>(false),
        updateGroup: (oldGroup: IGroup, updatedGroup: IGroup) => Promise.resolve<IGroup | undefined>(undefined),
        getContacts: (name: string) => Promise.resolve<IGroupContact[]>([]),
        getMemberFinancialHoldings: (members: IGroupMember[]) => Promise.resolve<IGroupFinancialHolding[]>([]),
        pickLists: {
            groupTypes: new Map<number, string>(),
            groupMemberTypes: new Map<number, string>(),
        },
        fhPickLists: {
            fhCategoryTypes: new Map<number, string>(),
            fhTypeTypes: new Map<number, string>(),
            roles: new Map<number, string>(),
        },
        fhMetadata: undefined,
        readonly: false,
    },
};

const getGroupsContextMock = () => cloneDeep(GroupsContextMock);
export default getGroupsContextMock;
