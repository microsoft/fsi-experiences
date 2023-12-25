import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { IDocumentsFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import {
    IDocumentRequest,
    IAddDocumentRequestData,
    IDocumentDefinition,
    DocumentStatus,
    IDocumentsMetadata,
} from '@fsi/document-intelligence/interfaces';
import { IDocumentRegarding } from '@fsi/document-intelligence/interfaces/IDocumentRegarding';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { parseDocumentDefinition, parseDocumentRecords, parsePipelineMessage, parseRegardingRecords } from './DocumentIntelligence.parser';
import {
    DOC_REQUEST_FIELD_NAMES,
    DOCUMENT_TABLES,
    DOC_DEFINITION_FIELD_NAMES,
    DOC_PIPELINE_FIELD_NAMES,
    PIPELINE_MESSAGE_FIELD_NAMES,
    REGARDING_DATASET_ALIASES,
} from './DocumentIntelligence.const';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { getDocumentDefinitionQuery } from './DocumentIntelligence.query';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { DocumentIntelligenceBaseFetcher } from './DocumentIntelligenceBase.fetcher';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';

export interface IRecordsLoadingEvent {
    isLoading: boolean;
    error?: any;
    sortedRecordIds: string[];
    records: {
        [id: string]: any;
    };
}

const DOCUMENTS_PAGE_SIZE = 250;
const REGARDING_PAGE_SIZE = 1000;
export interface EntityMetadataWithRelationship extends EntityMetadata {
    OneToManyRelationships?: any;
    [key: string]: any;
}
export class DocumentIntelligenceFetcher extends DocumentIntelligenceBaseFetcher implements IDocumentsFetcher {
    private documents: any;
    private regardingList: any;

    public regardingEntity: string;
    private documentsLoadingSubject = new Subject<IRecordsLoadingEvent>();
    private regardingsLoadingSubject = new ReplaySubject<IRecordsLoadingEvent>(1);
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
        this.setupDocumentsDataset(context);
    }

    async getRelatedTablesMetaData(): Promise<{
        contextMetadata: EntityMetadataWithRelationship;
        regardingMetadata: EntityMetadataWithRelationship;
        documentMetadata: EntityMetadataWithRelationship;
    }> {
        const regardingTable = this.regardingList.getTargetEntityType();
        const contextTable = this.context.mode.contextInfo.entityTypeName;

        const [contextMetadata, regardingMetadata, documentMetadata] = await this.utils.getEntitiesMetadata({
            [contextTable]: [],
            [regardingTable]: [],
            [DOCUMENT_TABLES.DOCUMENT_REQUEST]: [],
        });

        return {
            contextMetadata,
            regardingMetadata,
            documentMetadata: contextTable === DOCUMENT_TABLES.DOCUMENT_REQUEST ? contextMetadata : documentMetadata,
        };
    }

    async isContextInactive(contextId: string): Promise<boolean> {
        const contextTable = this.context.mode.contextInfo.entityTypeName;
        if (!contextId || !contextTable) {
            return false;
        }
        try {
            const contextRecord = await this.webAPI.retrieveRecord(contextTable, contextId, '?$select=statecode');
            return contextRecord['statecode'] === 1;
        } catch (e) {
            return false;
        }
    }

    async getDocuments(contextId: string, search?: string): Promise<IDocumentRequest[]> {
        try {
            this.filterDocumentsBySearch(search?.trim());
            return this.refreshDataSet();
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceFetcher.name,
                this.getDocuments.name,
                'An error occurred while refreshing documents data-set',
                FSIErrorTypes.ServerError,
                e,
                { contextId }
            );
            throw e;
        }
    }

    async getDocumentsMetadata(): Promise<IDocumentsMetadata> {
        try {
            const [{ entities }, { contextMetadata, regardingMetadata, documentMetadata }] = await this.ExecuteAndLog(
                DocumentIntelligenceFetcher.name,
                this.getDocumentsMetadata.name,
                'Getting documents metadata',
                'Successfully fetched documents metadata',
                undefined,
                () => {
                    const metadata = this.getRelatedTablesMetaData();
                    const messages = this.webAPI.retrieveMultipleRecords(
                        DOCUMENT_TABLES.PIPELINE_MESSAGE,
                        `?$select=${Object.values(PIPELINE_MESSAGE_FIELD_NAMES).join()}`
                    );

                    return Promise.all([messages, metadata]);
                }
            );
            return {
                pipelineMessages: entities.map(e => parsePipelineMessage(e)),
                contextEntityName: contextMetadata.DisplayName,
                contextEntitySetName: contextMetadata.EntitySetName,
                contextRelationshipName: contextMetadata.OneToManyRelationships?.getByFilter(
                    rl => rl.ReferencingEntity === DOCUMENT_TABLES.DOCUMENT_REQUEST && rl.ReferencingAttribute === DOC_REQUEST_FIELD_NAMES.CONTEXT
                )[0]?.ReferencingEntityNavigationPropertyName,
                regardingEntityName: regardingMetadata.DisplayName,
                regardingRelationshipName: regardingMetadata.OneToManyRelationships?.getByFilter(
                    rl => rl.ReferencingEntity === DOCUMENT_TABLES.DOCUMENT_REQUEST && rl.ReferencingAttribute === DOC_REQUEST_FIELD_NAMES.REGARDING
                )[0]?.ReferencingEntityNavigationPropertyName,
                regardingEntitySetName: regardingMetadata.EntitySetName,
                documentEntityName: documentMetadata.DisplayName,
            };
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceFetcher.name,
                this.getDocumentsMetadata.name,
                'An error occurred while fetching documents metadata',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    async createDocumentRequest(data: IAddDocumentRequestData): Promise<{ id: string }> {
        try {
            const regardingTable = this.regardingList.getTargetEntityType();
            const contextTable = this.context.page.entityTypeName;
            const polyContextFieldName = data.contextRelationshipName || `${DOC_REQUEST_FIELD_NAMES.CONTEXT}_${contextTable}`;
            const polyRegardingFieldName = data.regardingRelationshipName || `${DOC_REQUEST_FIELD_NAMES.REGARDING}_${regardingTable}`;
            const documentRequest = {
                [DOC_REQUEST_FIELD_NAMES.NAME]: `${data.definition.name} - ${data.regarding.name}`,
                [`${DOC_REQUEST_FIELD_NAMES.DEFINITION}@odata.bind`]: `/msfsi_documentdefinitions(${data.definition.id})`,
                [DOC_REQUEST_FIELD_NAMES.STATE]: DocumentStatus.MissingFile,
                [DOC_REQUEST_FIELD_NAMES.STATE_DATE]: new Date(),
                [`${polyRegardingFieldName}@odata.bind`]: `/${data.regardingEntitySetName}(${data.regarding.id})`,
            };
            if (data.contextId) {
                documentRequest[`${polyContextFieldName}@odata.bind`] = `/${data.contextEntitySetName}(${data.contextId})`;
            }
            if (data.descriptionEntity) {
                documentRequest[`${DOC_REQUEST_FIELD_NAMES.DESCRIPTION}`] = data.descriptionEntity;
            }
            const { id } = await this.webAPI.createRecord(DOCUMENT_TABLES.DOCUMENT_REQUEST, documentRequest);
            return { id };
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceFetcher.name,
                'createDocumentRequest',
                'An error occurred while creating new document request',
                FSIErrorTypes.ServerError,
                e
            );

            throw e;
        }
    }

    async getContextRegardingEntities(contextId: string): Promise<IDocumentRegarding[]> {
        return new Promise<IDocumentRegarding[]>((resolve, reject) => {
            this.regardingList.refresh();
            const subscription = this.regardingsLoadingSubject.subscribe(result => {
                if (result.error) {
                    reject(result.error);
                    subscription.unsubscribe();
                }
                if (!result.isLoading) {
                    try {
                        resolve(parseRegardingRecords(result.sortedRecordIds, result.records));
                    } catch (e) {
                        this.loggerService.logError(
                            DocumentIntelligenceFetcher.name,
                            'getContextRegarding',
                            'An error occurred while getting document context regardingList',
                            FSIErrorTypes.ServerError,
                            e,
                            { contextId }
                        );
                        reject(e);
                    }
                    subscription.unsubscribe();
                }
            });
        });
    }

    async getDocumentDefinitions(): Promise<IDocumentDefinition[]> {
        try {
            const encodedFetchXml = encodeURIComponent(getDocumentDefinitionQuery(this.context.parameters.businessContext?.raw));
            const result = await this.context.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.DOC_DEFINITION, `?fetchXml=${encodedFetchXml}`);

            return result.entities.map(entity => parseDocumentDefinition(entity));
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceFetcher.name,
                'getDocumentDefinitions',
                'An error occurred getting document file',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    async openNewDocumentForm(formId: string): Promise<string | undefined> {
        return this.context.navigation
            .openForm({
                entityName: DOCUMENT_TABLES.DOCUMENT_REQUEST,
                formId,
                useQuickCreateForm: true,
            })
            .then(res => res?.savedEntityReference?.[0]?.id);
    }

    public setupDocumentsDataset(context: CommonPCFContext): void {
        //refresh the dataset instances
        this.documents = context.parameters.documents;
        this.regardingList = context.parameters.regardingList;
        const contextId = extractEntityId(context.parameters.contextId);
        this.regardingEntity = this.regardingList.getTargetEntityType();

        Object.values(DOC_REQUEST_FIELD_NAMES).forEach(column => this.addColumn(column));

        this.addColumn(DOC_DEFINITION_FIELD_NAMES.NAME, { name: DOCUMENT_TABLES.DOC_DEFINITION });
        this.addColumn(DOC_DEFINITION_FIELD_NAMES.TYPE, { name: DOCUMENT_TABLES.DOC_DEFINITION });
        this.addColumn(DOC_DEFINITION_FIELD_NAMES.HAS_AUTOMATED_FLOW, { name: DOCUMENT_TABLES.DOC_DEFINITION });

        Object.values(DOC_PIPELINE_FIELD_NAMES).forEach(field =>
            this.addColumn(field, { name: DOCUMENT_TABLES.DOC_PIPELINE, to: DOC_REQUEST_FIELD_NAMES.PIPELINE })
        );
        this.documents.paging.setPageSize(DOCUMENTS_PAGE_SIZE);
        this.regardingList.paging.setPageSize(REGARDING_PAGE_SIZE);

        const regardingContextColumn = this.regardingList.columns.find(c => c.alias === REGARDING_DATASET_ALIASES.CONTEXT);
        if (regardingContextColumn && contextId) {
            this.regardingList.filtering.setFilter({
                conditions: [
                    {
                        attributeName: regardingContextColumn.name,
                        conditionOperator: 0,
                        value: contextId,
                    },
                ],
                filterOperator: 0,
            });
        }
    }

    public updateDocLoadingState(loadingState: IRecordsLoadingEvent): void {
        this.documentsLoadingSubject.next(loadingState);
    }

    public updateRegardingLoadingState(loadingState: IRecordsLoadingEvent): void {
        if (!loadingState.isLoading) {
            this.regardingsLoadingSubject.next(loadingState);
        }
    }

    private addColumn(name: string, link?: { name: string; to?: string }): void {
        if (link) {
            this.documents.linking.addLinkedEntity({
                alias: link.name,
                from: link.name + 'id',
                to: link.to || link.name,
                linkType: 'outer',
                name: link.name,
            });
        }
        if (this.documents.addColumn) {
            this.documents.addColumn(name, link?.name);
        }
    }

    private async refreshDataSet(): Promise<IDocumentRequest[]> {
        return new Promise<IDocumentRequest[]>((resolve, reject) => {
            this.documents.refresh();
            const subscription = combineLatest([this.documentsLoadingSubject, this.regardingsLoadingSubject], (document, regarding) => ({
                document,
                regarding,
            })).subscribe(({ document, regarding }) => {
                if (document.error) {
                    reject(document.error);
                    subscription.unsubscribe();
                }
                if (!document.isLoading) {
                    try {
                        resolve(parseDocumentRecords(document.sortedRecordIds, document.records, regarding.records));
                    } catch (e) {
                        reject(e);
                    }
                    subscription.unsubscribe();
                }
            });
        });
    }

    private filterDocumentsBySearch = (search?: string): void => {
        search
            ? this.documents.filtering.setFilter({
                  conditions: [
                      {
                          attributeName: `${DOC_REQUEST_FIELD_NAMES.REGARDING}name`,
                          conditionOperator: 6,
                          value: `%${search}%`,
                      },
                      {
                          attributeName: `${DOC_REQUEST_FIELD_NAMES.DESCRIPTION}`,
                          conditionOperator: 6,
                          value: `%${search}%`,
                      },
                      {
                          attributeName: `${DOC_REQUEST_FIELD_NAMES.DEFINITION}name`,
                          conditionOperator: 6,
                          value: `%${search}%`,
                      },
                  ],
                  filterOperator: 1,
              })
            : this.documents.filtering.clearFilter();
    };
}
