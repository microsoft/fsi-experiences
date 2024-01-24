import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { IDocumentDetailsFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { IDocumentRequest, IDocumentsMetadata } from '@fsi/document-intelligence/interfaces';
import { parsePipelineMessage, parseSingleDocument } from './DocumentIntelligence.parser';
import { DOCUMENT_TABLES, PIPELINE_MESSAGE_FIELD_NAMES } from './DocumentIntelligence.const';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { getDocumentRequestQuery } from './DocumentIntelligence.query';
import { DocumentIntelligenceBaseFetcher } from './DocumentIntelligenceBase.fetcher';

export class DocumentIntelligenceDetails extends DocumentIntelligenceBaseFetcher implements IDocumentDetailsFetcher {
    public regardingEntity: string;
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }
    public async getSingleDocument(id: string): Promise<IDocumentRequest> {
        const encodedFetchXml = encodeURIComponent(getDocumentRequestQuery(id));
        const { entities } = await this.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.DOCUMENT_REQUEST, `?fetchXml=${encodedFetchXml}`);

        if (!entities[0]) {
            throw new Error('Document not found');
        }
        return parseSingleDocument(entities[0]);
    }

    async getDocumentsMetadata(): Promise<IDocumentsMetadata> {
        try {
            const [{ entities }, [regardingMetadata]] = await this.ExecuteAndLog(
                DocumentIntelligenceDetails.name,
                this.getDocumentsMetadata.name,
                'Getting documents metadata',
                'Successfully fetched documents metadata',
                undefined,
                () => {
                    const messages = this.webAPI.retrieveMultipleRecords(
                        DOCUMENT_TABLES.PIPELINE_MESSAGE,
                        `?$select=${Object.values(PIPELINE_MESSAGE_FIELD_NAMES).join()}`
                    );
                    const metadata = this.regardingEntity ? this.utils.getEntitiesMetadata({ [this.regardingEntity]: [] }) : Promise.resolve([]);
                    return Promise.all([messages, metadata]);
                }
            );
            return {
                pipelineMessages: entities.map(e => parsePipelineMessage(e)),
                regardingEntityName: regardingMetadata?.DisplayName,
            };
        } catch (e) {
            this.loggerService.logError(
                DocumentIntelligenceDetails.name,
                this.getDocumentsMetadata.name,
                'An error accrued while fetching documents metadata',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }
}
