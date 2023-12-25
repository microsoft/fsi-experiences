import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { IGroupFetcher } from '../../../interfaces/Groups/IGroupFetcher';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { toPickListMap } from '../../../utilities';

const emptyPromiseFunction = () => {
    return Promise.reject(new Error());
};

export const emptyGroupsFetcher: IGroupFetcher = {
    getMainCustomerDetails() {
        return Promise.reject(new Error());
    },
    addNewGroup(group, members) {
        return Promise.reject(new Error());
    },
    updateGroup(oldGroup, updatedGroup, members) {
        return Promise.reject(new Error());
    },
    deleteGroup(group) {
        return Promise.reject(new Error());
    },
    getRelevantContacts(name) {
        return Promise.reject(new Error());
    },
    getMemberOwnerFinancialHoldings(members) {
        return Promise.reject(new Error());
    },
    getContactGroups(onlyPrimary) {
        return Promise.reject(new Error());
    },
    getGroupTypesMap: emptyPromiseFunction,
    getGroupMemberTypesMap: emptyPromiseFunction,
    getFinancialHoldingCategoryTypesMap: emptyPromiseFunction,
    getFinancialHoldingTypeTypesMap: emptyPromiseFunction,
    fetchFHMetadata: () => Promise.resolve(FHMetadataMock),
};
const testMock = getFullMock().groupsArray[0];
const member1 = testMock.members[0];
const fhCategoryMap = toPickListMap(FHMetadataMock.categories.optionSet);

const fhCategoryTypes = () => {
    return Promise.resolve(fhCategoryMap);
};

export const FhCategoryMap = fhCategoryMap;

export const mockFetcherWithCustomer: IGroupFetcher = {
    getMainCustomerDetails() {
        return Promise.resolve(member1.customer);
    },
    addNewGroup(group, members) {
        return Promise.reject(new Error());
    },
    updateGroup(oldGroup, updatedGroup, members) {
        return Promise.reject(new Error());
    },
    deleteGroup(group) {
        return Promise.reject(new Error());
    },
    getRelevantContacts(name) {
        return Promise.reject(new Error());
    },
    getMemberOwnerFinancialHoldings(members) {
        return Promise.reject(new Error());
    },
    getContactGroups(onlyPrimary) {
        return Promise.resolve(getFullMock());
    },
    getGroupTypesMap: emptyPromiseFunction,
    getGroupMemberTypesMap: emptyPromiseFunction,
    getFinancialHoldingCategoryTypesMap: fhCategoryTypes,
    getFinancialHoldingTypeTypesMap: emptyPromiseFunction,
    fetchFHMetadata: () => Promise.reject(),
};
