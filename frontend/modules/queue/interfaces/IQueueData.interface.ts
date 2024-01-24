import { IQueueStatus } from './IQueueStatus.interface';

export interface IQueueData {
    id: string;
    objectId: string;
    stepId: string;
    primaryCustomer?: string;
    itemName?: string;
    itemText?: string;
    status?: IQueueStatus;
    date?: Date;
    workedBy?: string;
}
