import ICustomerFH from '../../interfaces/FHEntity/CustomerFH';

export const customerFHMock: ICustomerFH[] = [
    { contact: { fullName: 'Elijah Wood', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b2' }, role: 104800002 },
    { contact: { fullName: 'Ian McKellen', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b3' }, role: 104800001 },
    { contact: { fullName: 'Liv Tyler', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b4' }, role: 104800000 },
    { contact: { fullName: 'Viggo Mortensen', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b5' }, role: 104800000 },
    { contact: { fullName: 'Orlando Bloom', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b6' }, role: 104800002 },
    { contact: { fullName: 'Andy Serkis', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b7' }, role: 104800001 },
];

const ownersCustomerFHMock: ICustomerFH[] = [
    { contact: { fullName: 'Liv Tyler', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b4' }, role: 104800000 },
    { contact: { fullName: 'Viggo Mortensen', contactId: '301f09ed-e034-4452-ac7c-0d76e98457b5' }, role: 104800000 },
];

export const fhOtherCustomersOwnMock: Map<string, ICustomerFH[]> = new Map().set('c257fe4c-0949-eb11-a813-000d3a3b7031', ownersCustomerFHMock);
