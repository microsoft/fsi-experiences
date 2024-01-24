export const relationshipsRelevantContacts = {
    entities: [
        {
            contactId: 'id1',
            address1_composite: 'Tel Aviv',
            fullname: 'Ronaldo',
            annualincome: 2345,
        },
        {
            contactId: 'id2',
            address1_composite: 'Herzelia',
            fullname: 'Messi',
            annualincome: 500000,
        },
    ],
};

export const MainCustomer = {
    fullname: 'Roni Milner',
    id: '123',
};

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
    [104800012, 'Principal'],
    [104800013, 'Power of Attorney'],
]);

export const contactRelationships = {
    entities: [
        {
            'ContactFrom.fullname': 'Roni Milner',
            'ContactTo.fullname': 'Ronaldo',
            msfsi_relationshipid: '1',
            msfsi_relationshiptype: 104800002,
            _msfsi_contactfrom_value: '123',
            _msfsi_contactto_value: 'id1',
        },
        {
            'ContactFrom.fullname': 'Roni Milner',
            'ContactTo.fullname': 'Ronaldo',
            msfsi_relationshipid: '2',
            msfsi_relationshiptype: 104800000,
            _msfsi_contactfrom_value: '123',
            _msfsi_contactto_value: 'id1',
        },
    ],
};
