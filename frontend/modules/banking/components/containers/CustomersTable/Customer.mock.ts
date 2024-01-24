import ICustomerFH from '../../../interfaces/FHEntity/CustomerFH';

export const getCustomersMock = (): ICustomerFH[] => {
    const list: ICustomerFH[] = createCustomerList();
    const rtVal: ICustomerFH[] = [];

    for (let index = 0; index < 1; index++) {
        list.forEach(value => rtVal.push(value));
    }

    return rtVal;
};

const createCustomerList = (): ICustomerFH[] => {
    return [
        { contact: { fullName: 'Krystle Carrington', contactId: '123' }, role: 104800000 },
        { contact: { fullName: 'Amy Winehouse', contactId: '444' }, role: 104800003 },
        { contact: { fullName: 'Bill Gates', contactId: '999' }, role: 104800004 },
        { contact: { fullName: 'Peter Thiel', contactId: '124' }, role: 104800005 },
    ];
};
