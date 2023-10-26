import { PCFBaseFetcher } from '@fsi/pcf-common/data-layer/base/PCFBaseFetcher';
import {
    ILifeEventsConfigTable,
    ICategoryConfig,
    ILifeEventConfigurations,
    ILifeEventCategoryMap,
    ILifeEventTypeMap,
} from '@fsi/milestones/interfaces/Configuration';
import { LifeEvent, LifeEventByCategory } from '@fsi/milestones/interfaces/LifeEvent';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import {
    ExternalLifeEvents,
    LIFE_EVENT_CATEGORY_CONFIG_TABLE,
    LIFE_EVENT_CONFIGURATIONS_TABLE,
    LIFE_EVENT_TABLE_NAME,
} from './PCFLifeEventConstants';
import { JoinedCategoryConfigTypes, parseLifeEventJoinedConfigEntity, parseLifeEventEntity, parseLifeEventConfigEntity } from './PCFLifeEventsParser';
import { getCategoryConfigQuery, getLifeEventsQuery } from './PCFLifeEventsQuery';
import { ILifeEventsFetcher } from '@fsi/milestones/interfaces/ILifeEventsFetcher';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';

export class PCFLifeEventsFetcher extends PCFBaseFetcher implements ILifeEventsFetcher {
    public constructor(context: CommonPCFContext, protected loggerService :ILoggerService) {
        super(context, loggerService);
    }

    public async fetchLifeEvents(contactId: string, configuration: ILifeEventConfigurations): Promise<LifeEventByCategory> {
        if (!contactId) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'fetchLifeEvents', 'Contact id is null or empty.', FSIErrorTypes.InvalidParam);
            return {};
        }

        try {
            const [contactLifeEvents, lifeEvents] = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'fetchLifeEvents',
                'Started fetching life events.',
                'Successfully fetched life events.',
                {
                    contactId,
                    configuration,
                },
                () => Promise.all([this.fetchContactDetails(contactId), this.fetchLifeEventsForContactId(contactId)])
            );

            this.attachExternalLifeEvents(contactLifeEvents, configuration, lifeEvents);
            return lifeEvents;
        } catch (e) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'fetchLifeEvents', 'Failed to fetch life events.', FSIErrorTypes.ServerError, e, {
                contactId,
                configuration,
            });
            throw e;
        }
    }

    private async fetchLifeEventsForContactId(contactId: string): Promise<LifeEventByCategory> {
        const lifeEventCategories: { [categoryCode: string]: LifeEvent[] } = {};

        try {
            const result: any = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'fetchLifeEventsForContactId',
                'Started fetching life events for contact.',
                'Successfully fetched life events for contact.',
                {
                    contactId,
                },
                () => this.webAPI.retrieveMultipleRecords(LIFE_EVENT_TABLE_NAME, '?fetchXml=' + getLifeEventsQuery(contactId))
            );

            for (let i = 0; i < result.entities.length; i++) {
                const lifeEvent = parseLifeEventEntity(result.entities[i]);
                const lifeEvents = lifeEventCategories[lifeEvent.categoryCode] || [];

                lifeEvents.push(lifeEvent);
                lifeEventCategories[lifeEvent.categoryCode] = lifeEvents;
            }

            return lifeEventCategories;
        } catch (e) {
            this.loggerService.logError(
                PCFLifeEventsFetcher.name,
                'fetchLifeEventsForContactId',
                'Failed to fetch life events for contact.',
                FSIErrorTypes.ServerError,
                e,
                {
                    contactId,
                }
            );
            throw e;
        }
    }

    async fetchContactDetails(contactId: string): Promise<ExternalLifeEvents> {
        let birthDate: Date | null = null;
        let education: number | null = null;

        try {
            const result = await this.getContact(contactId, ['birthdate', 'educationcode']);

            if (result && result['birthdate']) {
                birthDate = new Date(result['birthdate']);
            }
            // todo get string
            education = result && +result['educationcode'];
        } catch (error) {
            this.loggerService.logError(
                PCFLifeEventsFetcher.name,
                'fetchContactDetails',
                'Failed to fetch contact details.',
                FSIErrorTypes.ServerError,
                error,
                {
                    contactId,
                }
            );
        }

        return {
            birthDate,
            education,
        };
    }

    attachExternalLifeEvents(externalEvents: ExternalLifeEvents, config: ILifeEventConfigurations, lifeEvents: LifeEventByCategory) {
        const { birthDate } = externalEvents;

        const { birthdayCategoryCode, birthdayTypeCode } = config;
        if (birthDate) {
            const birthdayLifeEvent: LifeEvent = {
                id: '',
                created_on: birthDate,
                title: '',
                date: birthDate,
                categoryCode: birthdayCategoryCode,
                typeCode: birthdayTypeCode,
                isExternal: true,
            };
            if (!lifeEvents[birthdayCategoryCode]) {
                lifeEvents[birthdayCategoryCode] = [];
            }
            lifeEvents[birthdayCategoryCode].push(birthdayLifeEvent);
        }
    }

    async fetchLifeEventById(id: string): Promise<LifeEvent> {
        try {
            const result = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'fetchLifeEventById',
                'Started fetching life event.',
                'Successfully fetched life event.',
                {
                    'LifeEvent id': id,
                },
                () => this.webAPI.retrieveRecord(LIFE_EVENT_TABLE_NAME, id)
            );

            return parseLifeEventEntity(result);
        } catch (e) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'fetchLifeEventById', 'Failed to fetch life event.', FSIErrorTypes.ServerError, e, {
                'LifeEvent id': id,
            });
            throw e;
        }
    }

    async addLifeEvent(contactId: string, lifeEvent: LifeEvent): Promise<string> {
        if (!contactId) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'addLifeEvent', 'Contact id is null or empty.', FSIErrorTypes.InvalidParam);
            return '';
        }
        try {
            const lifeEventMappingToEntity = {
                msfsi_lifemomenttitle: lifeEvent.title,
                msfsi_lifemomentdate: lifeEvent.date,
                msfsi_lifemomentcategory: lifeEvent.categoryCode,
                msfsi_lifemomenttype: lifeEvent.typeCode,
                msfsi_modifiedon: lifeEvent.modified_on,
                msfsi_name: lifeEvent.title,
                'msfsi_Contact@odata.bind': '/contacts(' + contactId + ')',
            };
            const result: any = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'addLifeEvent',
                'Started adding life event.',
                'Successfully added life event.',
                {
                    lifeEvent,
                },
                () => this.webAPI.createRecord(LIFE_EVENT_TABLE_NAME, lifeEventMappingToEntity)
            );

            // TODO check typing
            return result.id as unknown as string;
        } catch (e) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'addLifeEvent', 'Failed to add life event.', FSIErrorTypes.ServerError, e, {
                contactId,
                lifeEvent,
            });
            throw e;
        }
    }

    async editLifeEvent(lifeEvent: LifeEvent): Promise<void> {
        try {
            const lifeEventMappingToEntity = {
                msfsi_lifemomenttitle: lifeEvent.title,
                msfsi_lifemomentdate: lifeEvent.date || null,
                msfsi_lifemomentcategory: lifeEvent.categoryCode,
                msfsi_lifemomenttype: lifeEvent.typeCode,
                msfsi_name: lifeEvent.title,
                msfsi_modifiedon: lifeEvent.modified_on,
            };

            await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'editLifeEvent',
                'Started editing life event.',
                'Successfully edited life event.',
                {
                    lifeEvent,
                },
                () => this.webAPI.updateRecord(LIFE_EVENT_TABLE_NAME, lifeEvent.id, lifeEventMappingToEntity)
            );
        } catch (e) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'editLifeEvent', 'Failed to edit life event.', FSIErrorTypes.ServerError, e, {
                lifeEvent,
            });
            throw e;
        }
    }

    async deleteLifeEvent(id: string): Promise<void> {
        try {
            await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'deleteLifeEvent',
                'Started deleting life event.',
                'Successfully deleted life event.',
                {
                    'LifeEvent id': id,
                },
                () => this.webAPI.deleteRecord(LIFE_EVENT_TABLE_NAME, id)
            );
        } catch (e) {
            this.loggerService.logError(PCFLifeEventsFetcher.name, 'deleteLifeEvent', 'Failed to delete life event.', FSIErrorTypes.ServerError, e, {
                'LifeEvent id': id,
            });
            throw e;
        }
    }

    async fetchConfigurations(): Promise<ILifeEventConfigurations> {
        let result: ILifeEventConfigurations = {} as ILifeEventConfigurations;
        ``;
        try {
            const [configTable, [categoryConfig, categoriesMap]] = await this.ExecuteAndLog(
                PCFLifeEventsFetcher.name,
                'fetchConfigurations',
                'Started fetching life event cofiguration.',
                'Successfully fetched life event cofiguration.',
                undefined,
                () => Promise.all([this.fetchConfigTable(), this.fetchCategoryTypeConfigurations()])
            );

            result = {
                ...configTable,
                categoryConfig,
                categoriesMap,
            };

            return result;
        } catch (e) {
            this.loggerService.logError(
                PCFLifeEventsFetcher.name,
                'fetchConfigurations',
                'Failed to fetch life event configurations.',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    private async fetchConfigTable(): Promise<ILifeEventsConfigTable> {
        const result = await this.webAPI.retrieveMultipleRecords(LIFE_EVENT_CONFIGURATIONS_TABLE);

        return parseLifeEventConfigEntity(result.entities[0]);
    }

    private async fetchCategoryTypeConfigurations(): Promise<[ICategoryConfig[], ILifeEventCategoryMap]> {
        const [result, lifeEventChoices] = await Promise.all([
            this.webAPI.retrieveMultipleRecords(LIFE_EVENT_CATEGORY_CONFIG_TABLE, '?fetchXml=' + getCategoryConfigQuery()),
            this.getEntityChoices('msfsi_lifemoment', ['msfsi_lifemomentcategory', 'msfsi_lifemomenttype']),
        ]);

        const lifeEventCategoryChoices = lifeEventChoices['msfsi_lifemomentcategory'];
        const lifeEventTypeChoices = lifeEventChoices['msfsi_lifemomenttype'];

        const joinedCategoryType: JoinedCategoryConfigTypes[] = result.entities.map(entity => parseLifeEventJoinedConfigEntity(entity));

        const typesForCategoryMap = joinedCategoryType.reduce<ILifeEventTypeMap>((typesMap, joinedItem) => {
            const { categoryCode, typeCode, typeName, typeDisplayOrder } = joinedItem;

            if (!typesMap[categoryCode]) {
                typesMap[categoryCode] = [];
            }

            typesMap[categoryCode]?.push({
                typeCode,
                typeName: lifeEventTypeChoices[typeCode] || typeName,
                displayOrder: typeDisplayOrder,
            });
            return typesMap;
        }, {});

        // group types in category
        const categoryMap = joinedCategoryType.reduce<ILifeEventCategoryMap>((categoryMap, joinedItem) => {
            const { categoryCode, icon, displayOrder, name } = joinedItem;

            if (!categoryMap[categoryCode]) {
                categoryMap[categoryCode] = {
                    categoryCode,
                    icon,
                    displayOrder,
                    name: lifeEventCategoryChoices[categoryCode] || name,
                    types: typesForCategoryMap[categoryCode],
                };
            }

            return categoryMap;
        }, {});

        return [Object.keys(categoryMap).map(key => categoryMap[key]), categoryMap];
    }
}
