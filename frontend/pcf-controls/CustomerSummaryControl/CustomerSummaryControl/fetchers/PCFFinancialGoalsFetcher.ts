import { ILifeEventConfigurations } from '@fsi/milestones/interfaces/Configuration';
import { LifeEvent, LifeEventByCategory } from '@fsi/milestones/interfaces/LifeEvent';
import { FINANCIAL_GOAL_TABLE_NAME, LIFE_EVENT_TABLE_NAME } from './PCFLifeEventConstants';
import { parseEventFinancialGoalEntity } from './PCFLifeEventsParser';
import { getLifeEventsFinancialGoalsQuery, getLifeEventsFinancialGoalsQueryByLifeEventId } from './PCFLifeEventsQuery';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { PCFLifeEventsFetcher } from './PCFLifeEventsFetcher';
import { IFinancialGoalsFetcher } from '@fsi/milestones/interfaces/ILifeEventsFetcher';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { IFinancialGoal } from '@fsi/milestones/goals/interfaces/FinancialGoal.interface';

export class PCFFinancialGoalsFetcher extends PCFLifeEventsFetcher implements IFinancialGoalsFetcher {
    public constructor(context: CommonPCFContext, protected loggerService : ILoggerService) {
        super(context, loggerService);
    }

    public async addFinancialGoal(contactId: string, financialGoal: IFinancialGoal): Promise<string> {
        if (!contactId) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'addFinancialGoal', 'Contact id is null or empty.', FSIErrorTypes.InvalidParam);
            return '';
        }
        try {
            const financialGoalMappingToEntity = {
                msfsi_name: financialGoal.targetName,
                msfsi_targetvaluedefault: financialGoal.targetValue,
                msfsi_progressvaluedefault: financialGoal.progressValue,
                msfsi_targetdate: financialGoal.targetDate,
                msfsi_iscompleted: financialGoal.isCompleted || false,
                'msfsi_customer@odata.bind': '/contacts(' + contactId + ')',
                'msfsi_lifeevent@odata.bind': '/msfsi_lifemoments(' + financialGoal.lifeEventId + ')',
            };

            const result: any = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'addFinancialGoalToLifeEvent',
                'Started adding financial goal.',
                'Successfully added financial goal.',
                {
                    financialGoal,
                },
                () => this.webAPI.createRecord(FINANCIAL_GOAL_TABLE_NAME, financialGoalMappingToEntity)
            );

            return result.id as unknown as string;
        } catch (e) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'addFinancialGoal', 'Failed to add financial goal.', FSIErrorTypes.ServerError, e, {
                contactId,
                financialGoal,
            });
            throw e;
        }
    }

    public async editFinancialGoal(financialGoal: IFinancialGoal): Promise<void> {
        try {
            const financialGoalMappingToEntity = {
                msfsi_name: financialGoal.targetName,
                msfsi_targetvaluedefault: financialGoal.targetValue,
                msfsi_progressvaluedefault: financialGoal.progressValue,
                msfsi_targetdate: financialGoal.targetDate,
                msfsi_iscompleted: financialGoal.isCompleted || false,
            };

            await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'editFinancialGoalOfEvent',
                'Started editing financial goal.',
                'Successfully edited financial goal.',
                {
                    financialGoal,
                },
                () => this.webAPI.updateRecord(FINANCIAL_GOAL_TABLE_NAME, financialGoal.id, financialGoalMappingToEntity)
            );
        } catch (e) {
            this.loggerService.logError(
                PCFLifeEventsFetcher.name,
                'editFinancialGoalOfEvent',
                'Failed to edit financial goal.',
                FSIErrorTypes.ServerError,
                e,
                {
                    financialGoal,
                }
            );
            throw e;
        }
    }

    public async fetchLifeEvents(contactId: string, configuration: ILifeEventConfigurations): Promise<LifeEventByCategory> {
        if (!contactId) {
            this.loggerService.logError(PCFFinancialGoalsFetcher.name, 'fetchFinancialGoals', 'Contact id is null or empty.', FSIErrorTypes.InvalidParam);
            return {};
        }
        try {
            const [contactLifeEvents, lifeEvents] = await this.ExecuteAndLog(
                PCFFinancialGoalsFetcher.name,
                'fetchFinancialGoals',
                'Started fetching events and financial goals.',
                'Successfully fetched events and financial goals.',
                {
                    contactId,
                    configuration,
                },
                () => Promise.all([this.fetchContactDetails(contactId), this.fetchLifeEventsOFFinancialGoalsForContactId(contactId)])
            );

            this.attachExternalLifeEvents(contactLifeEvents, configuration, lifeEvents);
            return lifeEvents;
        } catch (e) {
            this.loggerService.logError(
                PCFFinancialGoalsFetcher.name,
                'fetchFinancialGoals',
                'Failed to fetch events and financial goals.',
                FSIErrorTypes.ServerError,
                e,
                {
                    contactId,
                    configuration,
                }
            );
            throw e;
        }
    }

    private async fetchLifeEventsOFFinancialGoalsForContactId(contactId: string): Promise<LifeEventByCategory> {
        try {
            const lifeEventCategories: { [categoryCode: string]: LifeEvent[] } = {};
            const result: any = await this.ExecuteAndLog(
                PCFFinancialGoalsFetcher.name,
                'fetchFinancialGoalsForContactId',
                'Started fetching events and financial goals for contact.',
                'Successfully fetched events and financial goals for contact.',
                {
                    contactId,
                },
                () => this.webAPI.retrieveMultipleRecords(LIFE_EVENT_TABLE_NAME, '?fetchXml=' + getLifeEventsFinancialGoalsQuery(contactId))
            );

            result.entities.forEach(currValue => {
                const lifeEvent = parseEventFinancialGoalEntity(currValue);
                const lifeEvents = lifeEventCategories[lifeEvent.categoryCode] || [];

                lifeEvents.push(lifeEvent);
                lifeEventCategories[lifeEvent.categoryCode] = lifeEvents;
            });
            return lifeEventCategories;
        } catch (e) {
            this.loggerService.logError(
                PCFFinancialGoalsFetcher.name,
                'fetchFinancialGoalsForContactId',
                'Failed to fetch events and financial goals for contact.',
                FSIErrorTypes.ServerError,
                e,
                {
                    contactId,
                }
            );
            throw e;
        }
    }

    public async deleteFinancialGoal(id: string): Promise<void> {
        try {
            await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'deleteFinancialGoal',
                'Started deleting financial goal.',
                'Successfully deleted financial goal.',
                {
                    'FinancialGoal id': id,
                },
                () => this.webAPI.deleteRecord(FINANCIAL_GOAL_TABLE_NAME, id)
            );
        } catch (e) {
            this.loggerService.logError(
                PCFLifeEventsFetcher.name,
                'deleteFinancialGoal',
                'Failed to delete financial goal.',
                FSIErrorTypes.ServerError,
                e,
                {
                    'FinancialGoal id': id,
                }
            );
            throw e;
        }
    }

    public async fetchLifeEventById(id: string): Promise<LifeEvent> {
        try {
            const result = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'fetchFinancialGoalByLifeEventId',
                'Started fetching financial goal by life event id.',
                'Successfully fetched financial goal by life event id.',
                {
                    'LifeEvent id': id,
                },
                () => this.webAPI.retrieveRecord(LIFE_EVENT_TABLE_NAME, '?fetchXml=' + getLifeEventsFinancialGoalsQueryByLifeEventId(id))
            );

            return parseEventFinancialGoalEntity(result);
        } catch (e) {
            this.loggerService.logError(
                PCFLifeEventsFetcher.name,
                'fetchFinancialGoalByLifeEventId',
                'Failed to fetch financial goal by life event id.',
                FSIErrorTypes.ServerError,
                e,
                {
                    'LifeEvent id': id,
                }
            );
            throw e;
        }
    }
}
