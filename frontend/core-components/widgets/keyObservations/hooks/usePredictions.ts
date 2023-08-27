import { useQuery } from 'react-query';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import { CIEntitiesError } from '../../../dataLayerInterface/entity/CIEntitiesError';
import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';
import { useIsArtifactSupported } from './useIsArtifactSupported';

export const usePredictions = (fetcher: IKeyObservationsFetcher, enabled: boolean, contactId: string | null) => {
    const { isArtifactSupported, isFetchArtifactError, isLoadingArtifact } = useIsArtifactSupported(
        fetcher,
        true,
        ArtifactType.Model,
        InternalArtifactName.Churn
    );

    const { data, isError, isFetched, isLoading } = useQuery(
        ['cutomer-summary-predictions', contactId],
        () => fetcher.getPrediction(contactId || ''),
        {
            enabled: !!(contactId && enabled && isArtifactSupported),
        }
    );

    const prediction = isError ? CIEntitiesError.ERROR : enabled && isArtifactSupported ? data : undefined;
    const isLoadingPrediction = enabled && (isLoading || !isFetched);

    return {
        prediction,
        isLoading: isLoadingArtifact || (isArtifactSupported && isLoadingPrediction),
        isFetchError: isFetchArtifactError || (isArtifactSupported && isError),
        isPredictionSupported: isArtifactSupported,
    };
};
