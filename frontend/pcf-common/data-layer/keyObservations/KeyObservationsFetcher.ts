import { CommonPCFContext } from '../../common-props';
import loggerService from '../../services/LoggerService';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry/ILoggerService';
import { CIEntitiesError } from '@fsi/core-components/dist/dataLayerInterface/entity/CIEntitiesError/CIEntitiesError';
import { IKeyObservationsFetcher } from '@fsi/core-components/dist/dataLayerInterface/service/IKeyObservationsFetcher';
import { CISegment } from '@fsi/core-components/dist/dataLayerInterface/entity/CISegment';
import { buildSegmentQuery, buildPredictionQuery } from './KeyObservationsQuery';
import {
    CIPrediction,
    CIPredictionFactor,
    CIPredictionThreshold,
} from '@fsi/core-components/dist/dataLayerInterface/entity/CIPrediction/CIPrediction';
import { PCFBaseExecuteWebAPI } from '../base/PCFBaseExecuteWebAPI';
import { InternalArtifactName } from '@fsi/core-components/constants/KeyObservations';
import { ArtifactMapping } from '@fsi/core-components/dataLayerInterface/entity/KeyObservations';

const CHURN_NUM_OF_EXPLAIN_FACTORS = 11;
const CHURN_EXPLAIN_FIELD_PREFIX = 'CHURN_EXPLAIN_FIELD';

export class KeyObservationsFetcher extends PCFBaseExecuteWebAPI implements IKeyObservationsFetcher {
    private predictionThreshold: CIPredictionThreshold[];
    public constructor(context: CommonPCFContext) {
        super(context);
        this.predictionThreshold = [];
    }

    async getSupportedArtifacts(): Promise<ArtifactMapping[]> {
        const action = this.createActionWithoutParams('msfsi_RetrieveSupportedArtifacts');
        try {
            const response = await this.ExecuteAndLog(
                KeyObservationsFetcher.name,
                'getSupportedArtifacts',
                'Calling retrieve artifacts custom api.',
                'Successfully executed retrieve artifacts custom api.',
                { action },
                () => this.execute(action)
            );

            return response.value.map(artifact => {
                return {
                    artifactType: artifact['msfsi_artifacttype'],
                    internalArtifactName: artifact['msfsi_fsiartifactname'],
                };
            });
        } catch (e: any) {
            loggerService.logError(
                KeyObservationsFetcher.name,
                'getSupportedArtifacts',
                'An error occured while executing retrieve artifacts custom api.',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    async getSegments(contactId: string): Promise<CISegment[] | undefined> {
        try {
            const segmentsForContact = await this.ExecuteAndLog(
                KeyObservationsFetcher.name,
                'getSegments',
                'Started getting segments.',
                'Successfully got segments.',
                { contactId },
                () => this.context.webAPI.retrieveMultipleRecords('msfsi_cisegment', `?fetchXml=${buildSegmentQuery(contactId)}`)
            );

            const segmentsEntities = segmentsForContact.entities;

            if (!segmentsEntities) {
                loggerService.logError(
                    KeyObservationsFetcher.name,
                    'getSegments',
                    'Segments are unavailable.',
                    FSIErrorTypes.InvalidParam,
                    undefined,
                    {
                        contactId,
                    }
                );
                return undefined;
            }

            return segmentsEntities
                .map(entity => {
                    return { segmentName: entity['msfsi_artifact@OData.Community.Display.V1.FormattedValue'] };
                })
                .filter(s => s.segmentName);
        } catch (e) {
            loggerService.logError(KeyObservationsFetcher.name, 'getSegments', 'Error getting segments.', FSIErrorTypes.ServerError, e, {
                contactId,
            });
            throw e;
        }
    }

    //TODO - should make general when we know how the data for a general prediction looks like
    async getPredictionConfig(): Promise<CIPredictionThreshold[]> {
        if (this.predictionThreshold?.length > 0) {
            return this.predictionThreshold;
        }

        try {
            const config = await this.context.webAPI.retrieveMultipleRecords(
                'msfsi_churnlevelsconfig',
                `?fetchXml=<fetch>
                    <entity name="msfsi_churnlevelsconfig" >
                        <attribute name="msfsi_thresholdlevel" />
                        <attribute name="msfsi_value" />
                    </entity>
                </fetch>`
            );

            config.entities.forEach(value => {
                this.predictionThreshold.push({
                    level: value.msfsi_thresholdlevel,
                    threshold: parseFloat(value.msfsi_value),
                    label: value['msfsi_thresholdlevel@OData.Community.Display.V1.FormattedValue'],
                });
            });

            this.predictionThreshold.sort((a, b) => a.threshold - b.threshold);
        } catch (err) {
            //we do not throw here
            loggerService.logInfo(KeyObservationsFetcher.name, 'getPredictionConfig', 'Unavailable to get churn config.', { error: err });
        }

        return this.predictionThreshold;
    }

    private getPredictionFromStr(score: number, predictionConfig): CIPredictionThreshold | undefined {
        let lastThresholdPass;

        for (let index = 0; index < predictionConfig.length; index++) {
            const element = predictionConfig[index];

            if (score >= element.threshold) {
                lastThresholdPass = element;
            }
        }

        return lastThresholdPass;
    }

    private getCIPredictionFactors(predictionEntity = {}, explainFactorsNumber: number, explainFactorsPrefix: string): CIPredictionFactor[] {
        const factors: CIPredictionFactor[] = [];

        for (let i = 1; i <= explainFactorsNumber; i++) {
            const value = parseFloat(predictionEntity['msfsi_expfeature' + i]);
            if (!isNaN(value)) {
                factors.push({
                    value,
                    fieldName: `${explainFactorsPrefix}${i}`,
                });
            }
        }

        return factors;
    }

    //TODO - once we support general prediction we should receive the artifact sub type and publisher as parameters
    async getPrediction(contactId: string): Promise<CIPrediction | CIEntitiesError> {
        try {
            const [modelArr, predictionConfig] = await this.ExecuteAndLog(
                KeyObservationsFetcher.name,
                'getChurn',
                'Started getting churn.',
                'Successfully got churn.',
                { contactId },
                () =>
                    Promise.all([
                        this.context.webAPI.retrieveMultipleRecords(
                            'msfsi_ciprediction',
                            `?fetchXml=${buildPredictionQuery(contactId, CHURN_NUM_OF_EXPLAIN_FACTORS)}`
                        ),
                        this.getPredictionConfig(),
                    ])
            );

            const predictionEntity = modelArr.entities.find(model => model.msfsi_artifact === InternalArtifactName.Churn);
            const isInternalModel = predictionEntity?.msfsi_publisher === 'Microsoft';
            const score = parseFloat(predictionEntity?.msfsi_result) * 100;
            const threshold = this.getPredictionFromStr(score, predictionConfig);

            if (!threshold) {
                loggerService.logError(
                    KeyObservationsFetcher.name,
                    'getprediction',
                    'prediction is unavailable.',
                    FSIErrorTypes.InvalidParam,
                    undefined,
                    {
                        contactId,
                    }
                );
                return CIEntitiesError.UNAVAILABLE;
            }

            return {
                ...threshold,
                factors: this.getCIPredictionFactors(predictionEntity, CHURN_NUM_OF_EXPLAIN_FACTORS, CHURN_EXPLAIN_FIELD_PREFIX),
                score: Math.round(score),
                isExternal: !isInternalModel,
            };
        } catch (e) {
            loggerService.logError(KeyObservationsFetcher.name, 'getprediction', 'Error getting prediction.', FSIErrorTypes.ServerError, e, {
                contactId,
            });
            throw e;
        }
    }
}
