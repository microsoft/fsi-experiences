import { IFinancialGoalsFetcher, ILifeEventsFetcher } from './ILifeEventsFetcher';
import { EVENTS_TYPES } from '../constants/LifeEvent.consts';
import { LifeEvent } from './LifeEvent';
import { IFinancialGoal } from '../goals/interfaces/FinancialGoal.interface';

export interface DialogConfig {
    initialValue: Partial<LifeEvent | IFinancialGoal>;
    enableEdit?: boolean;
}

export interface IEventTypes {
    event: LifeEvent;
    type: EVENTS_TYPES;
}

export enum CURDOperationType {
    Create = 'Create',
    Update = 'Update',
    Delete = 'Delete',
}

export interface ErrorDialogProps {
    operationError?: CURDOperationType;
    retryFunc?: () => Promise<string | void>;
}

export interface OperationDataProps {
    name: string;
    eventId: string;
    enumType: CURDOperationType;
    executeOperation: () => Promise<string | void>;
}
export interface ILifeEventContextProviderProps {
    fetcher: ILifeEventsFetcher | IFinancialGoalsFetcher;
    contactId: string;
}
