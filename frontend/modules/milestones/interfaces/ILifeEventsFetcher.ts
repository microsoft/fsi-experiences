import { IFinancialGoal } from '../goals/interfaces/FinancialGoal.interface';
import { ILifeEventConfigurations } from './Configuration';
import { LifeEvent, LifeEventByCategory } from './LifeEvent';

export interface ILifeEventsFetcher {
    fetchLifeEvents(contactId: string, configuration: ILifeEventConfigurations): Promise<LifeEventByCategory>;
    fetchLifeEventById(id: string): Promise<LifeEvent>;
    addLifeEvent(contactId: string, lifeEvent: LifeEvent): Promise<string>;
    editLifeEvent(lifeEvent: LifeEvent): Promise<void>;
    deleteLifeEvent(id: string): Promise<void>;
    fetchConfigurations(): Promise<ILifeEventConfigurations>;
}

export interface IFinancialGoalsFetcher extends ILifeEventsFetcher {
    addFinancialGoal(contactId: string, financialGoal: IFinancialGoal): Promise<string>;
    deleteFinancialGoal(id: string): Promise<void>;
    editFinancialGoal(financialGoal: IFinancialGoal): Promise<void>;
}
