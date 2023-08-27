import { useQuery } from 'react-query';
import { ArtifactType } from '../../../constants/KeyObservations';
import { CIEntitiesError } from '../../../dataLayerInterface/entity/CIEntitiesError';
import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';
import { useIsArtifactSupported } from './useIsArtifactSupported';

export const useSegments = (fetcher: IKeyObservationsFetcher, enabled: boolean, contactId: string | null) => {
    const { isArtifactSupported, isFetchArtifactError, isLoadingArtifact } = useIsArtifactSupported(fetcher, true, ArtifactType.Segment);
    const { data, isError, isFetched, isLoading } = useQuery(['customer-snapshot-segments', contactId], () => fetcher.getSegments(contactId || ''), {
        enabled: !!(contactId && enabled && isArtifactSupported),
        staleTime: 5000,
    });
    const isLoadingSegments = enabled && (isLoading || !isFetched);
    const segments = isError ? undefined : enabled ? data : undefined;

    return {
        segments: segments,
        isLoading: isLoadingArtifact || (isArtifactSupported && isLoadingSegments),
        isFetchError: isFetchArtifactError || (isArtifactSupported && isError),
        segmentsError: isError ? CIEntitiesError.ERROR : undefined,
        isSegmentSupported: isArtifactSupported,
    };
};
