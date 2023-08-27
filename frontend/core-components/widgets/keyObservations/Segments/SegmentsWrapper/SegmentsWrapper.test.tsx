import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { SegmentsWrapper as SegmentsComp } from './SegmentsWrapper';
import { CISegment } from '../../../../dataLayerInterface/entity/CISegment';
import { IKeyObservationsFetcher } from '../../../../dataLayerInterface/service/IKeyObservationsFetcher';
import FSIProviderWrapper from '../../../../utilities/tests/FSIProviderWrapper';
import commonStrings from '../../../../assets/strings/common/common.1033.json';
import { testingQueryClient } from '../../../../utilities/tests/ProviderWrapper';
import { KEY_OBSERVATIONS_FLAGS } from '../../../../constants/features';
import { ArtifactMapping } from '../../../../dataLayerInterface/entity/KeyObservations';
import { InternalArtifactName, ArtifactType } from '../../../../constants/KeyObservations';

const SegmentsWrapper = FSIProviderWrapper(SegmentsComp);
const mockSegments: CISegment[] = [{ segmentName: 'New Customer' }, { segmentName: 'Affluent Customer' }];
const mockArtifacts: ArtifactMapping[] = [{ artifactType: ArtifactType.Segment, internalArtifactName: InternalArtifactName.Affluent }];
describe('Key SegmentsWrapper', () => {
    const contactId = 'test-contact-id';
    let fetcher: IKeyObservationsFetcher;
    beforeEach(() => {
        testingQueryClient.clear();
        fetcher = {
            getSegments: () => Promise.resolve(mockSegments),
            getPrediction: () => Promise.resolve(undefined),
            getSupportedArtifacts: () => Promise.resolve(mockArtifacts),
        };
    });

    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should not show segments until loaded', async () => {
        fetcher.getSegments = jest.fn().mockResolvedValue(mockSegments);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue(mockArtifacts);
        const { queryByText, queryByTestId, getByTestId } = render(<SegmentsWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByTestId('key-segments-widget')).toBeNull();
        expect(queryByText(commonStrings.LOADING)).toBeNull();
        await waitFor(() => expect(getByTestId('key-segments-widget')).toBeInTheDocument());
    });

    it('Should not show segments when artifact not supported', async () => {
        testingQueryClient.clear();
        fetcher.getSegments = jest.fn().mockResolvedValue(undefined);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue([]);
        const { queryByText, queryByTestId } = render(<SegmentsWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByTestId('key-segments-widget')).toBeNull();
        expect(queryByText(commonStrings.LOADING)).toBeNull();
    });

    it('Should show loading after artifacts are fetched until segments are fetched', async () => {
        testingQueryClient.clear();
        fetcher.getSegments = jest.fn().mockResolvedValue(mockSegments);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue(mockArtifacts);
        const { queryByText, queryByTestId, getByTestId } = render(<SegmentsWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByTestId('key-segments-widget')).toBeNull();
        await waitFor(() => expect(queryByText(commonStrings.LOADING)).toBeInTheDocument());
        await waitFor(() => expect(getByTestId('key-segments-widget')).toBeInTheDocument());
    });

    it('Should not show segments when getting undefined', async () => {
        fetcher.getSegments = jest.fn().mockResolvedValue(undefined);
        const { queryByTestId } = render(<SegmentsWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByTestId('key-segments-widget')).toBeNull();
    });

    it('Should render without churn and segments when turned off', async () => {
        fetcher.getSegments = jest.fn();
        const SegmentsWrapper = FSIProviderWrapper(SegmentsComp, {
            config: {
                flags: {
                    [KEY_OBSERVATIONS_FLAGS.SHOW_SEGMENTS]: false,
                },
            },
        });
        const { queryByTestId } = render(<SegmentsWrapper fetcher={fetcher} contactId={contactId} />);
        expect(fetcher.getSegments).not.toHaveBeenCalled();
        expect(queryByTestId('key-segments-widget')).toBeNull();
    });
});
