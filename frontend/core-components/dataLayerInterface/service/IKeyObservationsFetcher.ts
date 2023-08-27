import { CIEntitiesError } from '../entity/CIEntitiesError/CIEntitiesError';
import { CIPrediction } from '../entity/CIPrediction/CIPrediction';
import { CISegment } from '../entity/CISegment/CISegment';
import { ArtifactMapping } from '../entity/KeyObservations';

export interface IKeyObservationsFetcher {
    getSegments(contactId: string): Promise<CISegment[] | undefined>;
    getPrediction(contactId: string): Promise<CIPrediction | CIEntitiesError | undefined>;
    getSupportedArtifacts(): Promise<ArtifactMapping[]>;
}
