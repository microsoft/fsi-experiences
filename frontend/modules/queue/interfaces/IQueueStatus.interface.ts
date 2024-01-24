import { QUEUE_STATUS } from '../constants/Queue.const';

type QueueStatusKeys = keyof typeof QUEUE_STATUS;
type QueueStatusValues = typeof QUEUE_STATUS[QueueStatusKeys];

export interface IQueueStatus {
    type: QueueStatusValues;
    text: string;
}
