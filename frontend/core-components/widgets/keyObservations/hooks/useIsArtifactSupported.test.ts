import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '../../../utilities/tests/ProviderWrapper';
import { ArtifactMapping } from '../../../dataLayerInterface/entity/KeyObservations';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import { useIsArtifactSupported } from './useIsArtifactSupported';

const mockArtifacts: ArtifactMapping[] = [
    { artifactType: ArtifactType.Model, internalArtifactName: InternalArtifactName.Churn },
    { artifactType: ArtifactType.Segment, internalArtifactName: InternalArtifactName.Affluent },
];

const fetcher = {
    getPrediction: jest.fn(),
    getSegments: jest.fn(),
    getSupportedArtifacts: jest.fn().mockResolvedValue(mockArtifacts),
};

const errorFetcher = {
    ...fetcher,
    getSupportedArtifacts: jest.fn().mockRejectedValue('Error'),
};

describe('useIsArtifactSupported tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.getSupportedArtifacts.mockClear();
        errorFetcher.getSupportedArtifacts.mockClear();
    });

    it('Should call getSupportedArtifact with type filter - return true', async () => {
        const { result } = renderHook(() => useIsArtifactSupported(fetcher, true, ArtifactType.Segment), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoadingArtifact);

        expect(fetcher.getSupportedArtifacts).toHaveBeenCalled();

        expect(result.current.isArtifactSupported).toBeTruthy();
    });

    it('Should call getSupportedArtifact with type and internal name filters - return true', async () => {
        const { result } = renderHook(() => useIsArtifactSupported(fetcher, true, ArtifactType.Model, InternalArtifactName.Churn), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoadingArtifact);

        expect(fetcher.getSupportedArtifacts).toHaveBeenCalled();

        expect(result.current.isArtifactSupported).toBeTruthy();
    });

    it('Should call to getSupportedArtifact when artifacts doesnt exist - return false', async () => {
        const notSupportedType = 104800004;
        const { result } = renderHook(() => useIsArtifactSupported(fetcher, true, notSupportedType), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoadingArtifact);

        expect(fetcher.getSupportedArtifacts).toHaveBeenCalled();

        expect(result.current.isArtifactSupported).toBeFalsy();
    });

    it('Should not call getSupportedArtifacts when not enabled', async () => {
        const { result } = renderHook(() => useIsArtifactSupported(fetcher, false, ArtifactType.Segment), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoadingArtifact);

        expect(fetcher.getSupportedArtifacts).not.toHaveBeenCalled();

        expect(result.current.isArtifactSupported).toBeFalsy();
    });

    it('Should return error when getSupportedArtifacts is throwing', async () => {
        const { result } = renderHook(() => useIsArtifactSupported(errorFetcher, true, ArtifactType.Segment), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isArtifactSupported);

        expect(errorFetcher.getSupportedArtifacts).toHaveBeenCalled();
        expect(result.current.isFetchArtifactError).toBeTruthy();
    });
});
