import { useQuery } from 'react-query';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';

export const useIsArtifactSupported = (
    fetcher: IKeyObservationsFetcher,
    enabled: boolean,
    artifactType: ArtifactType,
    internalArtifactName?: InternalArtifactName
) => {
    const { data, isError, isFetched, isLoading } = useQuery('supported-key-observations', () => fetcher.getSupportedArtifacts(), {
        enabled: enabled,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const isLoadingArtifact = enabled && (isLoading || !isFetched);
    const isArtifactSupported =
        isFetched && enabled
            ? data?.some(
                  artifact =>
                      artifact.artifactType === artifactType && (!internalArtifactName || artifact.internalArtifactName == internalArtifactName)
              )
            : undefined;

    return {
        isArtifactSupported: !!isArtifactSupported,
        isLoadingArtifact,
        isFetchArtifactError: isError,
    };
};
