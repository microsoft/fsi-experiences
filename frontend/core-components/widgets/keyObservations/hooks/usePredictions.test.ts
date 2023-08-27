import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '../../../utilities/tests/ProviderWrapper';
import { usePredictions } from './usePredictions';
import { CIEntitiesError } from '../../../dataLayerInterface/entity/CIEntitiesError/CIEntitiesError';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import { ArtifactMapping } from '../../../dataLayerInterface/entity/KeyObservations/ArtifactMapping';

const mockChurn = { label: 'Low risk', score: 20, level: 104800000, threshold: 0, factors: [] };
const mockArtifacts: ArtifactMapping[] = [{ artifactType: ArtifactType.Model, internalArtifactName: InternalArtifactName.Churn }];

const fetcher = {
    getPrediction: jest.fn().mockResolvedValue(mockChurn),
    getSegments: jest.fn(),
    getSupportedArtifacts: jest.fn().mockResolvedValue(mockArtifacts),
};

const errorFetcher = {
    ...fetcher,
    getPrediction: jest.fn().mockResolvedValue(CIEntitiesError.ERROR),
};

const contactId = 'contactId';
describe('usePredictions tests', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher.getPrediction.mockClear();
        errorFetcher.getPrediction.mockClear();
    });

    it('Should call to getChurn when enabled and return valid result', async () => {
        const { result } = renderHook(() => usePredictions(fetcher, true, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getPrediction).toHaveBeenCalledWith(contactId);

        expect(result.current.prediction).toEqual(mockChurn);
    });

    it('Should not call getChurn when not enabled', async () => {
        const { result } = renderHook(() => usePredictions(fetcher, false, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getPrediction).not.toHaveBeenCalled();

        expect(result.current.prediction).toEqual(undefined);
    });

    it('Should no call getChurn when no contact id', async () => {
        const { result } = renderHook(() => usePredictions(fetcher, true, null), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getPrediction).not.toHaveBeenCalled();

        expect(result.current.prediction).toEqual(undefined);
    });

    it('Should return error when getChurn is throwing', async () => {
        const { result } = renderHook(() => usePredictions(errorFetcher, true, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(errorFetcher.getPrediction).toHaveBeenCalledWith(contactId);
        expect(result.current.prediction).toEqual(CIEntitiesError.ERROR);
    });

    it('Should not call getChurn when artifact is not supported', async () => {
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue([]);
        const { result } = renderHook(() => usePredictions(fetcher, true, contactId), { wrapper: QueryClientWrapper });
        await waitFor(() => !result.current.isLoading);

        expect(fetcher.getPrediction).not.toHaveBeenCalled();

        expect(result.current.prediction).toEqual(undefined);
    });
});
