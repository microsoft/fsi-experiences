import { IApplicantWithTask } from '../IApplicantWithTask';
import { TaskStatus } from './../../constants/Fields.const';
export const mockApplicants = [
    {
        id: '1',
        name: 'Mona Cane',
        role: 'Primary',
        isPrimary: true,
        task: {
            id: '1',
            name: 'Verify Application',
            status: 1,
            state: TaskStatus.Pending,
            updateStatus: () => Promise.resolve(),
        },
    },
    {
        id: '2',
        name: 'John Smith',
        role: 'Co-signer',
        isPrimary: false,
        task: {
            id: '2',
            name: 'Verify Application',
            status: 1,
            state: TaskStatus.Done,
            updateStatus: () => Promise.resolve(),
        },
    },
    {
        id: '3',
        name: 'John Miler',
        role: 'Co-signer',
        isPrimary: false,
        task: {
            id: '3',
            name: 'Verify Application',
            status: 1,
            state: TaskStatus.Canceled,
            updateStatus: () => Promise.resolve(),
        },
    },
] as IApplicantWithTask[];

export const mockCanceledTasksApplicants = [
    {
        id: '1',
        name: 'Mona Cane',
        role: 'Primary',
        isPrimary: true,
        task: {
            id: '1',
            name: 'Verify Application',
            status: 6,
            state: TaskStatus.Pending,
            updateStatus: () => Promise.resolve(),
        },
    },
];
