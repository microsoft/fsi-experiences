import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '../../../utilities/tests/ProviderWrapper';
import { useSegments } from './useSegments';
import { CISegment } from '../../../dataLayerInterface/entity/CISegment';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import { ArtifactMapping } from '../../../dataLayerInterface/entity/KeyObservations/ArtifactMapping';

const segments: CISegment[] = [{ segmentName: 'New Customer' }, { segmentName: 'Affluent Customer' }];
const mockArtifacts: ArtifactMapping[] = [{ artifactType: ArtifactType.Segment, internalArtifactName: InternalArtifactName.Affluent }];

const fetcher = {
    getPrediction: jest.fn(),
    getSegments: jest.fn().mockResolvedValue(segments),
    getSupportedArtifacts: jest.fn().mockResolvedValue(mockArtifacts),
};

const errorFetcher = {
    ...fetcher,
    getSegments: jest.fn().mockRejectedValue('Error'),
    isSegmentsSupported: jest.fn().mockRejectedValue('Error'),
};

const contactId = 'contactId';
describe('useFHData tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.getSegments.mockClear();
        errorFetcher.getSegments.mockClear();
    });

    it('Should call to getSegments and return valid result', async () => {
        const { result } = renderHook(() => useSegments(fetcher, true, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getSegments).toHaveBeenCalledWith(contactId);

        expect(result.current.segments).toEqual(segments);
    });

    it('Should not call getSegments when no contact id', async () => {
        const { result } = renderHook(() => useSegments(fetcher, true, null), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getSegments).not.toHaveBeenCalled();

        expect(result.current.segments).toEqual(undefined);
    });

    it('Should return error when getSegments is throwing', async () => {
        const { result } = renderHook(() => useSegments(errorFetcher, true, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(errorFetcher.getSegments).toHaveBeenCalledWith(contactId);
        expect(result.current.segments).toEqual(undefined);
        expect(result.current.isFetchError).toEqual(true);
    });

    it('Should not call getSegments when not enabled', async () => {
        const { result } = renderHook(() => useSegments(fetcher, false, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getSegments).not.toHaveBeenCalled();

        expect(result.current.segments).toEqual(undefined);
    });

    it('Should not call getSegments when artifact not supported', async () => {
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue([]);
        const { result } = renderHook(() => useSegments(fetcher, true, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getSegments).not.toHaveBeenCalled();

        expect(result.current.segments).toEqual(undefined);
    });
});
