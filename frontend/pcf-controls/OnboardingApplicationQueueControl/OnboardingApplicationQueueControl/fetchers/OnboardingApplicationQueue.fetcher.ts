import { CommonPCFContext } from '@fsi/pcf-common/dist/common-props';
import { OnboardingApplicationCommonFetcher } from '@fsi-pcf/onboarding-application-common/OnboardingApplicationCommonFetcher';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import {
    fetchArchivingReasonsPerScenario as fetchArchiveReasonsPerScenario,
    fetchQueueItemApplicationQuery,
    getBpfFormQuery,
    getWorkflowClientDataQuery,
} from './OnboardingApplicationQueue.query';
import { ATTRIBUTES_ALIASES, ENTITY_NAMES } from './OnboardingApplicationQueue.const';
import { parseApplications, parseArchiveReasons } from './OnboardingApplicationQueue.parser';
import { IQueueData } from '@fsi/queue/dist/interfaces/IQueueData.interface';
import { IQueueConfiguration } from '@fsi/queue/dist/interfaces/IQueueConfiguration';
import { IQueueGroup } from '@fsi/queue/dist/interfaces/IQueueGroup.interface';
import { IOnboardingApplicationQueueFetcher } from '@fsi/queue/dist/interfaces/IOnboardingApplicationQueueFetcher';

const convertItemsToInt = item => parseInt(item);

const getQueueConfiguration = ({ context }: { context: CommonPCFContext }): IQueueConfiguration => {
    const approvedStatusIdsString = context.parameters?.approvedStatusIds?.raw?.trim();
    const rejectedStatusIdsString = context.parameters?.rejectedStatusIds?.raw?.trim();
    const pendingStatusIdsString = context.parameters?.pendingStatusIds?.raw?.trim();

    const approvedStatusIds = (approvedStatusIdsString ? approvedStatusIdsString.split(',') : []).map(convertItemsToInt);
    const rejectedStatusIds = (rejectedStatusIdsString ? rejectedStatusIdsString.split(',') : []).map(convertItemsToInt);
    const pendingStatusIds = (pendingStatusIdsString ? pendingStatusIdsString.split(',') : []).map(convertItemsToInt);

    const configuration = {
        approvedStatusIds,
        rejectedStatusIds,
        pendingStatusIds,
    };

    Object.values(configuration).forEach(statuses => {
        if (statuses.includes(NaN)) {
            throw new Error('INVALID_CONFIGURATION');
        }
    });

    return configuration;
};

export class OnboardingApplicationQueueFetcher extends OnboardingApplicationCommonFetcher implements IOnboardingApplicationQueueFetcher {
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    public async fetchItems(steps: IQueueGroup, bpfName: string): Promise<IQueueData[]> {
        try {
            if (!this.context.parameters.applications?.sortedRecordIds.length) {
                return [];
            }
            const configuration = getQueueConfiguration({ context: this.context });

            const itemsQueryFetchXml = fetchQueueItemApplicationQuery(this.context.parameters, bpfName);
            const encodedFetchXml = encodeURIComponent(itemsQueryFetchXml);
            const result = await this.context.webAPI.retrieveMultipleRecords(ENTITY_NAMES.QUEUE_ITEM, `?fetchXml=${encodedFetchXml}`);

            const applicationsResult = parseApplications({ entities: result.entities, configuration }).filter(application => application.stepId);
            applicationsResult?.sort((firstItem, secondItem) => steps[firstItem.stepId].order - steps[secondItem.stepId].order);
            return applicationsResult || [];
        } catch (error) {
            this.loggerService.logError(
                OnboardingApplicationQueueFetcher.name,
                this.fetchItems.name,
                'An error occured fetching queue items.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    public async getSteps(bpfName: string): Promise<IQueueGroup> {
        const formXml = await this.getBPFFormXml(bpfName);
        const keyValueStages = this.buildStagesKeyDescription(formXml);
        const clientDataJson = await this.fetchClientData(bpfName);

        return this.buildBPFStages(clientDataJson, keyValueStages);
    }

    private async fetchClientData(bpfName: string) {
        const clientDataFetchXml = getWorkflowClientDataQuery(bpfName);
        const encodedFetchXml = encodeURIComponent(clientDataFetchXml);
        try {
            const result = await this.context.webAPI.retrieveMultipleRecords('workflow', `?fetchXml=${encodedFetchXml}`);
            const clientDataJson = JSON.parse(result.entities[0]['clientdata']);
            return clientDataJson;
        } catch (error) {
            this.loggerService.logError(
                OnboardingApplicationQueueFetcher.name,
                this.fetchClientData.name,
                'An error occured fetching client data.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    private async getBPFFormXml(bpfName: string) {
        try {
            const results = await this.context.webAPI.retrieveMultipleRecords('systemform', getBpfFormQuery(bpfName));
            return results.entities[0]['formxml'];
        } catch (error) {
            this.loggerService.logError(
                OnboardingApplicationQueueFetcher.name,
                this.getBPFFormXml.name,
                'An error occured fetching BPF form xml.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    private buildStagesKeyDescription(formXml: any) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(formXml, 'application/xml');

        const keyValueStages = {};
        doc.querySelectorAll('tab').forEach(tab => {
            const tabId = tab.getAttribute('id')?.slice(1, -1); //id is {guid} so I remove {}
            /*innerHTML causes XML Parsing Error in Firefox*/
            const labelElement = parser.parseFromString(tab.outerHTML, 'application/xml').querySelector('label');
            const label = labelElement?.getAttribute('description');
            tabId && (keyValueStages[tabId] = label);
        });
        return keyValueStages;
    }

    private buildBPFStages(clientDataJson: any, keyValueStages: {}) {
        const stepToMap = {};
        clientDataJson['steps']['list']
            .filter(item => item.description === this.context.parameters.entityName.raw)
            .map((step, index) => {
                const stepsList = step['steps']['list'];
                const flowStep = stepsList[0];
                const stepId = flowStep['stageId'];
                stepToMap[stepId] = {
                    name: keyValueStages[stepId],
                    order: index,
                };
            });
        return stepToMap;
    }

    public async fetchQueueMetadata() {
        try {
            const entity = this.context.parameters.entityName.raw;
            const status = this.context.parameters.status?.raw;
            const date = this.context.parameters.date?.raw;

            const entities = { [entity]: [status, date] };

            const metadataList: any = await this.ExecuteAndLog(
                OnboardingApplicationQueueFetcher.name,
                'fetchQueueMetadata',
                'Fetching queue metadata.',
                'Successfully fetched queue metadata.',
                undefined,
                () => this.utils.getEntitiesMetadata(entities)
            );

            const entityAttributes = metadataList[0].Attributes;

            const metadata = {
                [ATTRIBUTES_ALIASES.DATE]: { displayName: (entityAttributes.get(date) as any)?.DisplayName },
                [ATTRIBUTES_ALIASES.STATUS]: { displayName: (entityAttributes.get(status) as any)?.DisplayName },
            };

            return metadata;
        } catch (err) {
            this.loggerService.logError(
                OnboardingApplicationQueueFetcher.name,
                'fetchQueueMetadata',
                'Failed fetch queue metadata.',
                FSIErrorTypes.ServerError,
                err
            );
            throw err;
        }
    }

    public async fetchArchiveReasons(): Promise<{ [key: string]: string }> {
        const businessScenario = await this.fetchBusinessScenarioFromAppSettings();
        const archiveReasonsFetchXml = fetchArchiveReasonsPerScenario(businessScenario);
        const encodedFetchXml = encodeURIComponent(archiveReasonsFetchXml);
        try {
            const result = await this.context.webAPI.retrieveMultipleRecords(ENTITY_NAMES.ARCHIVE_REASON, `?fetchXml=${encodedFetchXml}`);
            return parseArchiveReasons(result);
        } catch (error) {
            this.loggerService.logError(
                OnboardingApplicationQueueFetcher.name,
                this.fetchArchiveReasons.name,
                'An error occurred while fetching archive reasons.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    public async archiveApplication(actionName: string, applicationId: string, reasonKey: string, comment?: string | undefined): Promise<void> {
        const request = {
            reason: {
                entityType: ENTITY_NAMES.ARCHIVE_REASON,
                id: reasonKey,
            },
            comment,
            entity: {
                entityType: ENTITY_NAMES.ONBOARDING_APPLICATION,
                id: applicationId,
            },
            getMetadata: () => ({
                boundParameter: 'entity',
                parameterTypes: {
                    entity: {
                        typeName: 'mscrm.msfsi_application',
                        structuralProperty: 5,
                    },
                    reason: {
                        typeName: 'mscrm.msfsi_archivereason',
                        structuralProperty: 5,
                    },
                    comment: {
                        typeName: 'Edm.String',
                        structuralProperty: 1,
                    },
                },
                operationType: 0,
                operationName: actionName,
            }),
        };

        try {
            const result = await this.webAPI.execute(request);
            if (!result.ok) {
                this.loggerService.logError(
                    OnboardingApplicationQueueFetcher.name,
                    'archiveApplication',
                    'Failed to archive application.',
                    FSIErrorTypes.AsyncError,
                    'executed but something went wrong with the result',
                    {
                        entityName: ENTITY_NAMES.ONBOARDING_APPLICATION,
                        applicationId,
                    }
                );
                return Promise.reject('Application archive action execution error');
            }
        } catch (error: any) {
            this.loggerService.logError(
                OnboardingApplicationQueueFetcher.name,
                'archiveApplication',
                'Failed to archive application.',
                FSIErrorTypes.ServerError,
                error,
                {
                    entityName: ENTITY_NAMES.ONBOARDING_APPLICATION,
                    applicationId,
                }
            );
            const errorOptions = {
                message: error.message,
                details: error.raw,
                errorCode: error.errorCode,
            };
            return Promise.reject(errorOptions);
        }
    }
}
