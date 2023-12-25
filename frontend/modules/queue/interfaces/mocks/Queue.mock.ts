import { QUEUE_STATUS } from '../../constants/Queue.const';
import { IQueueData } from '../IQueueData.interface';

export const mockBPFName = 'bpf';

export const queueGroupsMock = {
    '1': { name: 'group 1', order: 0 },
    '2': { name: 'group 2', order: 1 },
};

export const queueItemsMock: IQueueData[] = [
    {
        id: '1',
        objectId: '1',
        stepId: '1',
        primaryCustomer: 'Pablo Diego José Francisco Exotic',
        itemName: '#3457841516975463417',
        status: { type: QUEUE_STATUS.APPROVED, text: QUEUE_STATUS.APPROVED },
        itemText: 'Secured loan',
        date: new Date(2022, 5, 26),
        workedBy: 'Mark Diego José Copperfield',
    },
    {
        id: '2',
        objectId: '2',
        stepId: '1',
        primaryCustomer: 'Carole Baskin Mark',
        itemName: '#6599196',
        status: { type: QUEUE_STATUS.REJECTED, text: 'Custom text for the status test' },
        itemText: 'Mortgage',
        date: new Date(1990, 2, 15),
        workedBy: 'José Diego Ramirez Sanchez',
    },
    {
        id: '3',
        objectId: '3',
        stepId: '1',
        primaryCustomer: 'Uriah Heep',
        itemName: '#489631',
        status: { type: QUEUE_STATUS.PENDING, text: QUEUE_STATUS.PENDING },
        itemText: 'Conventional Mortgage and Adjustable-Rate Mortgage',
        date: new Date(2009, 1, 9),
        workedBy: 'Charles John Huffam Dickens',
    },
    {
        id: '4',
        objectId: '4',
        stepId: '1',
        primaryCustomer: "Alfred D'Orsay Tennyson Dickens",
        itemName: '#987',
        itemText: 'Loan',
        date: new Date(1859, 4, 8),
        workedBy: 'Catherine Elizabeth Macready Perugini',
    },
    {
        id: '5',
        objectId: '5',
        stepId: '1',
        primaryCustomer: 'Elizabeth Macbeth',
        itemName: '#67426',
        status: { type: QUEUE_STATUS.APPROVED, text: QUEUE_STATUS.APPROVED },
        itemText: 'Unsecured Loan',
        date: new Date(1859, 4, 8),
        workedBy: 'Aldous Huxley',
    },
    {
        id: '6',
        objectId: '6',
        stepId: '2',
        primaryCustomer: 'Microsoft Inc.',
        itemName: '#3679413',
        status: { type: QUEUE_STATUS.REJECTED, text: QUEUE_STATUS.REJECTED },
        itemText: 'Adjustable-Rate Mortgage',
        date: new Date(1979, 5, 10),
        workedBy: 'Satya Narayana Nadella',
    },
    {
        id: '7',
        objectId: '7',
        stepId: '2',
        primaryCustomer: 'Amazon LTD.',
        itemName: '#08960049',
    },
    {
        id: '8',
        objectId: '8',
        stepId: '2',
        primaryCustomer: 'Google Enterprise Corporation',
        itemName: '#65785125',
        status: { type: QUEUE_STATUS.PENDING, text: QUEUE_STATUS.PENDING },
        itemText: 'Jumbo Loan',
        workedBy: 'Sundararajan Pichai',
    },
];
