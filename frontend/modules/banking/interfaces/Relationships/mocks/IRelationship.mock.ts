import cloneDeep from 'lodash/cloneDeep';
import { IRelationship } from '../IRelationship';

const relationhipsMock: IRelationship[] = [
    {
        id: '1',
        contactFrom: {
            contactId: '123',
            fullName: 'Roni Milner',
        },
        contactTo: {
            contactId: 'id1',
            fullName: 'Ronaldo',
        },
        relationshipType: 104800002,
    },
    {
        id: '2',
        contactFrom: {
            contactId: '123',
            fullName: 'Roni Milner',
        },
        contactTo: {
            contactId: 'id1',
            fullName: 'Ronaldo',
        },
        relationshipType: 104800000,
    },
];

export const relationshipsTypesMap = new Map([
    [104800000, 'Accountant'],
    [104800001, 'Client (accounting)'],
    [104800002, 'Lawyer'],
    [104800003, 'Client (legal)'],
    [104800004, 'Child'],
    [104800005, 'Parent'],
    [104800006, 'Grandchild'],
    [104800007, 'Grandparent'],
    [104800008, 'Spouse'],
    [104800009, 'Ex-Spouse'],
    [104800010, 'Extended Family'],
    [104800011, 'Sibling'],
]);

export const getRelationshipsMock = () => cloneDeep(relationhipsMock);
