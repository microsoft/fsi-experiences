import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import { CIEntitiesError } from '../../entity/CIEntitiesError/CIEntitiesError';
import { CIPrediction } from '../../entity/CIPrediction/CIPrediction';
import { CISegment } from '../../entity/CISegment/CISegment';
import { ArtifactMapping } from '../../entity/KeyObservations';
import { IKeyObservationsFetcher } from '../IKeyObservationsFetcher';

export class MockKeyObservationsFetcher implements IKeyObservationsFetcher {
    async getSupportedArtifacts(): Promise<ArtifactMapping[]> {
        return [
            { artifactType: ArtifactType.Model, internalArtifactName: InternalArtifactName.Churn },
            { artifactType: ArtifactType.Segment, internalArtifactName: InternalArtifactName.Affluent },
        ];
    }

    async getSegments(contactId: string): Promise<CISegment[] | undefined> {
        return [{ segmentName: 'New Customer' }, { segmentName: 'Affluent Customer' }];
    }

    async getPrediction(contactId: string): Promise<CIPrediction | CIEntitiesError | undefined> {
        return {
            label: 'Medium',
            level: 104800001,
            threshold: 0,
            score: 68,
            factors: [
                {
                    value: 8.9,
                    fieldName: 'CHURN_EXPLAIN_FIELD8',
                },
                {
                    value: -7.8,
                    fieldName: 'CHURN_EXPLAIN_FIELD7',
                },
                {
                    value: 6.7,
                    fieldName: 'CHURN_EXPLAIN_FIELD6',
                },
                {
                    value: 5.6,
                    fieldName: 'CHURN_EXPLAIN_FIELD5',
                },
                {
                    value: 4.5,
                    fieldName: 'CHURN_EXPLAIN_FIELD4',
                },
                {
                    value: 3.4,
                    fieldName: 'CHURN_EXPLAIN_FIELD3',
                },
                {
                    value: -2.3,
                    fieldName: 'CHURN_EXPLAIN_FIELD2',
                },
                {
                    value: 2,
                    fieldName: 'CHURN_EXPLAIN_FIELD11',
                },
                {
                    value: 1.9,
                    fieldName: 'CHURN_EXPLAIN_FIELD9',
                },
                {
                    value: 1.2,
                    fieldName: 'CHURN_EXPLAIN_FIELD1',
                },
                {
                    value: 1.1,
                    fieldName: 'CHURN_EXPLAIN_FIELD10',
                },
            ],
        };
    }
}

export default MockKeyObservationsFetcher;
