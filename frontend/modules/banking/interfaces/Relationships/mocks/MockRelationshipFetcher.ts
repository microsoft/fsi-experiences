import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import { IRelationshipFetcher } from '../../../interfaces/Relationships/IRelationshipFetcher';
import { getRelationshipsMock } from '../../../interfaces/Relationships/mocks/IRelationship.mock';

const emptyPromiseFunction = () => {
    return Promise.reject(new Error());
};

export const emptyRelationshipsFetcher: IRelationshipFetcher = {
    getMainCustomerDetails() {
        return Promise.reject(new Error());
    },
    getRelevantContacts(name) {
        return Promise.reject(new Error());
    },
    getCustomerRelationships() {
        return Promise.reject(new Error());
    },
    fetchRelationshipById(relationshipId: string) {
        return Promise.reject(new Error());
    },
    addRelationship(relationship: IRelationship) {
        return Promise.reject(new Error());
    },
    deleteRelationship(id: string) {
        return Promise.reject(new Error());
    },
    updateRelationship(relationship: IRelationship) {
        return Promise.reject(new Error());
    },
    getRelationshipTypesMap: emptyPromiseFunction,
};
const testMock = getRelationshipsMock()[0];
const member1 = testMock.contactFrom;

export const mockFetcherWithCustomer: IRelationshipFetcher = {
    getMainCustomerDetails() {
        return Promise.resolve(member1);
    },
    getRelevantContacts(name) {
        return Promise.reject(new Error());
    },
    getCustomerRelationships() {
        return Promise.resolve(getRelationshipsMock());
    },
    fetchRelationshipById(relationshipId: string) {
        return Promise.resolve(getRelationshipsMock()[0]);
    },
    addRelationship(relationship: IRelationship) {
        return Promise.reject(new Error());
    },
    deleteRelationship(id: string) {
        return Promise.reject(new Error());
    },
    updateRelationship(relationship: IRelationship) {
        return Promise.reject(new Error());
    },
    getRelationshipTypesMap: emptyPromiseFunction,
};
