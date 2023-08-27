import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import PredictoinTag, { learnMoreLink } from './PredictionTag';
import { IPredictionRiskProps } from './PredictionTag.interface';
import { CIPrediction } from '../../../../dataLayerInterface/entity/CIPrediction/CIPrediction';
import commonStrings from '../../../../assets/strings/common/common.1033.json';
import churnStrings from '../../../../assets/strings/AIChurnExplainability/AIChurnExplainability.1033.json';
import predicationStrings from '../../../../assets/strings/KeyObservations/KeyObservations.1033.json';
import { IAIExplainabilityProps } from '../../../../components';
import { COLORS } from '../../../../constants';
import { CIEntitiesError } from '../../../../dataLayerInterface/entity/CIEntitiesError';

const aiExplainabilityCompMock = jest.fn();
jest.mock('../../../../components/containers/AIExplainability/AIExplainability', () => (params: IAIExplainabilityProps) => {
    aiExplainabilityCompMock(params);
    return <span data-testid="mocked-ai-explainability" />;
});

describe('PredictoinTag', () => {
    const defaultProps: IPredictionRiskProps = {
        prediction: { label: 'Low risk', score: 20, level: 104800000, threshold: 0, factors: [] },
        isPredictionSupported: true,
    };

    beforeEach(() => {
        aiExplainabilityCompMock.mockReset();
    });

    it('Should render Low risk properly', () => {
        const { getByTestId } = render(<PredictoinTag {...defaultProps} />);

        const a = getByTestId('box-stack-wrapper');
        expect(getByTestId('box-stack-wrapper')).toHaveStyle({ background: COLORS.artifactGreen });
    });

    it('Should render Medium risk properly', () => {
        const { getByTestId } = render(
            <PredictoinTag {...defaultProps} prediction={{ label: 'Medium risk', level: 104800001, score: 50, threshold: 0, factors: [] }} />
        );

        expect(getByTestId('box-stack-wrapper')).toHaveStyle({ background: COLORS.artifactYellow });
    });

    it('Should render High risk properly', () => {
        const { getByTestId } = render(
            <PredictoinTag {...defaultProps} prediction={{ label: 'High risk', score: 20, level: 104800002, threshold: 0, factors: [] }} />
        );

        expect(getByTestId('box-stack-wrapper')).toHaveStyle({ background: COLORS.artifactRed });
    });

    it('Should render unavailable churn score state', () => {
        const { getByText, queryByTestId } = render(<PredictoinTag {...defaultProps} prediction={CIEntitiesError.UNAVAILABLE} />);

        expect(getByText(predicationStrings.KEY_PREDICTION_EMPTY)).toBeVisible();
        expect(queryByTestId('info-callout-icon')).toBeInTheDocument();
    });

    it('Should render empty state when model not supported', () => {
        const { queryByText, queryByTestId } = render(<PredictoinTag {...defaultProps} isPredictionSupported={false} />);

        expect(queryByText(predicationStrings.KEY_PREDICTION_EMPTY)).toBeNull();
        expect(queryByTestId('box-stack-wrapper')).toBeNull();
        expect(queryByText(commonStrings.ERROR_STATE_TITLE)).toBeNull();
    });

    it('Should render empty state when response is undefined', () => {
        const { queryByText, queryByTestId } = render(<PredictoinTag {...defaultProps} prediction={undefined} />);

        expect(queryByText(predicationStrings.KEY_PREDICTION_EMPTY)).toBeNull();
        expect(queryByTestId('box-stack-wrapper')).toBeNull();
        expect(queryByText(commonStrings.ERROR_STATE_TITLE)).toBeNull();
    });

    it('Should not render explainability icon for external ci model', () => {
        const churnPrediction = defaultProps.prediction as CIPrediction;
        const testProps: IPredictionRiskProps = {
            ...defaultProps,
            prediction: {
                ...churnPrediction,
                isExternal: true,
            },
        };
        const { getByTestId, queryByTestId } = render(<PredictoinTag {...testProps} />);

        expect(getByTestId('box-stack-wrapper')).toBeVisible();
        expect(queryByTestId('info-callout-icon')).toBeNull();
    });

    it('Should render explainabilty', () => {
        const churnPrediction = defaultProps.prediction as CIPrediction;
        const testProps: IPredictionRiskProps = {
            ...defaultProps,
            prediction: {
                ...churnPrediction,
                factors: [
                    { fieldName: 'CHURN_EXPLAIN_FIELD3', value: 1.421 },
                    { fieldName: 'TEST2', value: 0.67 },
                    { fieldName: 'TEST3', value: -0.17 },
                    { fieldName: 'TEST4', value: 0.4 },
                    { fieldName: 'TEST5', value: -0.754 },
                    { fieldName: 'TEST6', value: -0.11 },
                ],
            },
        };
        const { getByTestId } = render(<PredictoinTag {...testProps} />);

        expect(getByTestId('info-callout-icon')).toBeVisible();

        fireEvent.click(getByTestId('info-callout-icon'));

        waitFor(() => expect(getByTestId('mocked-ai-explainability')).toBeVisible());
        expect(aiExplainabilityCompMock).toHaveBeenCalledWith<IAIExplainabilityProps[]>({
            factorsInfo: expect.objectContaining({
                factors: [
                    { displayName: churnStrings.CHURN_EXPLAIN_FIELD3, id: 'CHURN_EXPLAIN_FIELD3', factor: 1.421 },
                    { displayName: 'TEST5', id: 'TEST5', factor: -0.754 },
                    { displayName: 'TEST2', id: 'TEST2', factor: 0.67 },
                ],
                text: churnStrings.CHURN_TOP_FACTORS,
            }),
            modelTitle: churnStrings.CHURN_RISK_SCORE,
            negativeLabel: churnStrings.NEGATIVE_FACTOR_LEGEND,
            positiveLabel: churnStrings.POSITIVE_FACTOR_LEGEND,
            scoreInfo: {
                color: COLORS.artifactGreen,
                score: churnPrediction.score,
                text: churnPrediction.label,
            },
            lowIsGood: true,
            learnMoreLink,
            learnMoreAdditionalText: churnStrings.CHURN_LINK_MORE_INFO,
        });
    });
});
