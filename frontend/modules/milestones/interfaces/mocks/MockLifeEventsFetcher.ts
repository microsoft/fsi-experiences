import { ILifeEventConfigurations } from '../Configuration';
import { IFinancialGoalsFetcher, ILifeEventsFetcher } from '../ILifeEventsFetcher';
import { LifeEvent, LifeEventByCategory } from '../LifeEvent';
import lifeEventsData from '../../interfaces/mocks/LifeEvents.mock';
import { IAccess } from '@fsi/core-components/dist/dataLayerInterface/entity/IAccess';
import { IFinancialGoal } from '../../goals/interfaces/FinancialGoal.interface';
import financialGoalsData from '../../goals/interfaces/mocks/FinancialGoal.mock';
import lifeEventsConfigurations from '../../interfaces/mocks/LifeEventsConfigurations.mock';

export class MockLifeEventsFetcher implements ILifeEventsFetcher {
    async fetchLifeEvents(contactId: string, configuration: ILifeEventConfigurations, categoryCode?: number): Promise<LifeEventByCategory> {
        return lifeEventsData as LifeEventByCategory;
    }
    async fetchLifeEventById(id: string): Promise<LifeEvent> {
        throw new Error('Method not implemented.');
    }
    async addLifeEvent(contactId: string, lifeEvent: LifeEvent): Promise<string> {
        return new Date().getTime().toString();
    }
    async editLifeEvent(lifeEvent: LifeEvent): Promise<void> {
        return;
    }
    async deleteLifeEvent(id: string): Promise<void> {
        return;
    }
    async fetchConfigurations(): Promise<ILifeEventConfigurations> {
        return lifeEventsConfigurations;
    }
    async getAccessInfo(entityId: string): Promise<IAccess> {
        return { write: true, read: true, delete: true, create: true, append: true, appendTo: true };
    }
}

export class MockFinancialGoalFetcher extends MockLifeEventsFetcher implements IFinancialGoalsFetcher {
    async fetchLifeEvents(contactId: string, configuration: ILifeEventConfigurations, categoryCode?: number): Promise<LifeEventByCategory> {
        return financialGoalsData as LifeEventByCategory;
    }
    async addFinancialGoal(contactId: string, financialGoal: IFinancialGoal): Promise<string> {
        return new Date().getTime().toString();
    }
    async deleteFinancialGoal(id: string): Promise<void> {
        return;
    }
    async editFinancialGoal(financialGoal: IFinancialGoal): Promise<void> {
        return;
    }
}
