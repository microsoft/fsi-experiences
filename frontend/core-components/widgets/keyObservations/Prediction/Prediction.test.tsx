import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';
import commonStrings from '../../../assets/strings/common/common.1033.json';
import customerSnapshotControlStrings from '../../../assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';
import { QueryClientWrapper, testingQueryClient } from '../../../utilities/tests/ProviderWrapper';
import { CIPrediction } from '../../../dataLayerInterface/entity/CIPrediction/CIPrediction';
import Prediction from './Prediction';
import { ArtifactMapping } from '../../../dataLayerInterface/entity/KeyObservations/ArtifactMapping';
import { InternalArtifactName, ArtifactType } from '../../../constants/KeyObservations';

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
const contactId = 'test-contact-id';
const fetcher: IKeyObservationsFetcher = {
    getSegments: () => Promise.resolve(undefined),
    getPrediction: () => Promise.resolve(mockChurn),
    getSupportedArtifacts: () => Promise.resolve(mockArtifacts),
};

describe('Key Prediction - Prediction', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should show widget and call getPrediction', async () => {
        fetcher.getPrediction = jest.fn();
        const { queryByText, getByText, getByTestId } = render(<Prediction fetcher={fetcher} contactId={contactId} />, {
            wrapper: QueryClientWrapper,
        });

        expect(getByTestId('key-prediction-widget')).toBeVisible();
        expect(getByText(commonStrings.LOADING)).toBeVisible();
        await waitForElementToBeRemoved(queryByText(commonStrings.LOADING));
        expect(fetcher.getPrediction).toHaveBeenCalledTimes(1);
    });

    it('Should show error state', async () => {
        fetcher.getPrediction = jest.fn().mockRejectedValue('mock error');
        const { getByText, queryByTestId, queryByText } = render(<Prediction fetcher={fetcher} contactId={contactId} />, {
            wrapper: QueryClientWrapper,
        });
        await waitForElementToBeRemoved(queryByText(commonStrings.LOADING));
        expect(fetcher.getPrediction).toHaveBeenCalledTimes(1);
        expect(queryByTestId('error-state')).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should show empty state when artifact is not supported', async () => {
        fetcher.getSupportedArtifacts = jest.fn().mockResolvedValue([]);
        const { getByText, queryByTestId, queryByText } = render(<Prediction fetcher={fetcher} contactId={contactId} />, {
            wrapper: QueryClientWrapper,
        });
        await waitForElementToBeRemoved(queryByText(commonStrings.LOADING));
        expect(queryByTestId('empty-state')).toBeVisible();
        expect(getByText(customerSnapshotControlStrings.INVALID_CONFIGURATION)).toBeVisible();
    });
});
