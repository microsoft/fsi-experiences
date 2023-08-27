import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import Segments from './Segments';
import { CISegment } from '../../../dataLayerInterface/entity/CISegment';
import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';
import commonStrings from '../../../assets/strings/common/common.1033.json';
import { QueryClientWrapper, testingQueryClient } from '../../../utilities/tests/ProviderWrapper';
import { ArtifactMapping } from '../../../dataLayerInterface/entity/KeyObservations/ArtifactMapping';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';
import customerSnapshotControlStrings from '../../../assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';

const mockSegments: CISegment[] = [{ segmentName: 'New Customer' }, { segmentName: 'Affluent Customer' }];
const mockArtifacts: ArtifactMapping[] = [{ artifactType: ArtifactType.Segment, internalArtifactName: InternalArtifactName.Affluent }];
const contactId = 'test-contact-id';
const fetcher: IKeyObservationsFetcher = {
    getSegments: () => Promise.resolve(mockSegments),
    getPrediction: () => Promise.resolve(undefined),
    getSupportedArtifacts: () => Promise.resolve(mockArtifacts),
};

describe('Key Segments - Segments', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should show widget and call getSegments', async () => {
        fetcher.getSegments = jest.fn();
        const { queryByText, getByText, getByTestId } = render(<Segments fetcher={fetcher} contactId={contactId} />, { wrapper: QueryClientWrapper });

        expect(getByTestId('key-segments-widget')).toBeVisible();
        expect(getByText(commonStrings.LOADING)).toBeVisible();
        await waitForElementToBeRemoved(queryByText(commonStrings.LOADING));
        expect(fetcher.getSegments).toHaveBeenCalledTimes(1);
    });

    it('Should show custom header text', async () => {
        fetcher.getSegments = jest.fn();
        const { getByText } = render(<Segments fetcher={fetcher} contactId={contactId} headerText="TEST" />, {
            wrapper: QueryClientWrapper,
        });

        expect(getByText('TEST')).toBeVisible();
    });

    it('Should show error state', async () => {
        fetcher.getSegments = jest.fn().mockRejectedValue('mock error');
        const { getByText, queryByTestId, queryByText } = render(<Segments fetcher={fetcher} contactId={contactId} />, {
            wrapper: QueryClientWrapper,
        });
        await waitForElementToBeRemoved(queryByText(commonStrings.LOADING));
        expect(fetcher.getSegments).toHaveBeenCalledTimes(1);
        expect(queryByTestId('error-state')).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should show empty state when artifact is not supported', async () => {
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue([]);
        const { getByText, queryByTestId, queryByText } = render(<Segments fetcher={fetcher} contactId={contactId} />, {
            wrapper: QueryClientWrapper,
        });
        await waitForElementToBeRemoved(queryByText(commonStrings.LOADING));
        expect(queryByTestId('empty-state')).toBeVisible();
        expect(getByText(customerSnapshotControlStrings.INVALID_CONFIGURATION)).toBeVisible();
    });
});
