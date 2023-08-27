import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { PredictionWrapper as PredictionComp } from './PredictionWrapper';
import { IKeyObservationsFetcher } from '../../../../dataLayerInterface/service/IKeyObservationsFetcher';
import FSIProviderWrapper from '../../../../utilities/tests/FSIProviderWrapper';
import commonStrings from '../../../../assets/strings/common/common.1033.json';
import { testingQueryClient } from '../../../../utilities/tests/ProviderWrapper';
import { KEY_OBSERVATIONS_FLAGS } from '../../../../constants/features';
import { CIPrediction } from '../../../../dataLayerInterface/entity/CIPrediction/CIPrediction';
import { ArtifactMapping } from '../../../../dataLayerInterface/entity/KeyObservations/ArtifactMapping';
import { InternalArtifactName, ArtifactType } from '../../../../constants/KeyObservations';

const PredictionWrapper = FSIProviderWrapper(PredictionComp);
const mockArtifacts: ArtifactMapping[] = [{ artifactType: ArtifactType.Model, internalArtifactName: InternalArtifactName.Churn }];
const mockChurn: CIPrediction = {
    label: 'Medium risk',
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
describe('Key Prediction', () => {
    const contactId = 'test-contact-id';
    let fetcher: IKeyObservationsFetcher;
    beforeEach(() => {
        fetcher = {
            getPrediction: () => Promise.resolve(mockChurn),
            getSegments: () => Promise.resolve([]),
            getSupportedArtifacts: () => Promise.resolve(mockArtifacts),
        };
        testingQueryClient.clear();
    });

    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should not show prediction until loaded', async () => {
        fetcher.getPrediction = jest.fn().mockResolvedValue(mockChurn);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue(mockArtifacts);
        const { queryByText, queryByTestId, getByTestId } = render(<PredictionWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByText(commonStrings.LOADING)).toBeNull();
        await waitFor(() => expect(getByTestId('key-prediction-widget')).toBeInTheDocument());
    });

    it('Should show empty state for prediction when getting undefined but is turned on', async () => {
        fetcher.getPrediction = jest.fn().mockResolvedValue(undefined);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue(mockArtifacts);
        const { queryByTestId } = render(<PredictionWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByTestId('prediction-value')).toBeNull();
    });

    it('Should show empty state when artifact is supporrted but churn is missing', async () => {
        fetcher.getPrediction = jest.fn().mockResolvedValue(undefined);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue(mockArtifacts);
        const { queryByTestId, getByTestId } = render(<PredictionWrapper fetcher={fetcher} contactId={contactId} />);
        await waitFor(() => expect(getByTestId('key-prediction-widget')).toBeInTheDocument());
        expect(queryByTestId('prediction-value')).toBeNull();
    });

    it('Should not show prediction when artifact is not supported', async () => {
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue([]);
        const { queryByTestId } = render(<PredictionWrapper fetcher={fetcher} contactId={contactId} />);
        await waitFor(() => expect(queryByTestId('key-prediction-widget')).toBeNull());
    });

    it('Should show loading after artifacts are fetched until segments are fetched', async () => {
        fetcher.getPrediction = jest.fn().mockResolvedValue(mockChurn);
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue(mockArtifacts);
        const { queryByText, queryByTestId, getByTestId } = render(<PredictionWrapper fetcher={fetcher} contactId={contactId} />);
        expect(queryByTestId('key-prediction-widget')).toBeNull();
        await waitFor(() => expect(queryByText(commonStrings.LOADING)).toBeInTheDocument());
        await waitFor(() => expect(getByTestId('key-prediction-widget')).toBeInTheDocument());
    });

    it('Should render without prediction when turned off', async () => {
        fetcher.getPrediction = jest.fn();
        const PredictionWrapper = FSIProviderWrapper(PredictionComp, {
            config: {
                flags: {
                    [KEY_OBSERVATIONS_FLAGS.SHOW_CHURN_SCORE]: false,
                },
            },
        });
        const { queryByTestId } = render(<PredictionWrapper fetcher={fetcher} contactId={contactId} />);
        expect(fetcher.getPrediction).not.toHaveBeenCalled();
        expect(queryByTestId('key-prediction-widget')).toBeNull();
    });
});
