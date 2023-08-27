import React from 'react';
import { render } from '@testing-library/react';
import AIExplainability from './AIExplainability';
import { IAIFactorListProps } from '../AIFactorList';
import commonStrings from '../../../assets/strings/common/common.1033.json';
import { IAIScoreProps } from '../../atoms/AIScore';
import { IAIExplainabilityProps } from './AIExplainability.interface';

const aiFactoListCompMock = jest.fn();
jest.mock('../AIFactorList/AIFactorList', () => (params: IAIFactorListProps) => {
    aiFactoListCompMock(params);
    return <span data-testid="mocked-ai-factor-list" />;
});

const aiScoreCompMock = jest.fn();
jest.mock('../../atoms/AIScore/AIScore', () => (params: IAIScoreProps) => {
    aiScoreCompMock(params);
    return <span data-testid="mocked-ai-score" />;
});

describe('AIExplainability', () => {
    const defaultProps: IAIExplainabilityProps = {
        scoreInfo: { color: 'red', score: 21, text: 'High churn risk' },
        modelTitle: 'What is churn risk??',
        learnMoreLink: 'https://google.com',
        learnMoreAdditionalText: 'more link info about specific model',
        lowIsGood: true,
        negativeLabel: 'Negative value legend',
        positiveLabel: 'Positive value legend',
        factorsInfo: {
            factors: [
                {
                    displayName: 'Factor #1',
                    factor: -0.42,
                    id: 'factor-1',
                },
            ],
            text: 'Three primary factors influencing this customer’s churn risk',
            moreInfo: 'factors more info',
        },
    };

    beforeEach(() => {
        aiFactoListCompMock.mockReset();
        aiScoreCompMock.mockReset();
    });

    it('should render AIExplainability 4 main section', () => {
        const { getByText, getByTestId } = render(<AIExplainability {...defaultProps} />);
        // Header
        expect(getByText(defaultProps.modelTitle)).toBeVisible();
        // Score
        expect(getByTestId('mocked-ai-score')).toBeVisible();
        // Factors
        expect(getByTestId('mocked-ai-factor-list')).toBeVisible();
        // link
        expect(getByText(commonStrings.AI_LEARN_MORE)).toBeVisible();
        expect(getByText(commonStrings.AI_LEARN_MORE).closest('a')).toHaveAttribute('href', defaultProps.learnMoreLink);
        expect(getByText(defaultProps.learnMoreAdditionalText!)).toBeVisible();
    });

    it('should not render link when missing', () => {
        const testProps = {
            ...defaultProps,
            learnMoreLink: undefined,
        };
        const { queryByText } = render(<AIExplainability {...testProps} />);
        expect(queryByText(commonStrings.AI_LEARN_MORE)).toBeNull();
        expect(queryByText(defaultProps.learnMoreAdditionalText!)).toBeNull();
    });

    it('should call AI score with the right props', () => {
        render(<AIExplainability {...defaultProps} />);

        expect(aiScoreCompMock).toHaveBeenCalledWith({
            scoreInfo: defaultProps.scoreInfo,
            scoreTitle: commonStrings.SCORE,
            ofTotalText: commonStrings.OF_100,
        });
    });

    it('should call AI Factor List with the right props', () => {
        render(<AIExplainability {...defaultProps} />);

        expect(aiFactoListCompMock).toHaveBeenCalledWith(
            expect.objectContaining({
                factorsInfo: defaultProps.factorsInfo,
                negativeLabel: defaultProps.negativeLabel,
                positiveLabel: defaultProps.positiveLabel,
                lowIsGood: defaultProps.lowIsGood,
            })
        );
    });

    it('should not render factor list', () => {
        const testProps: IAIExplainabilityProps = {
            ...defaultProps,
            factorsInfo: {
                ...defaultProps.factorsInfo,
                factors: [],
            },
        };
        const { queryByTestId, getByTestId, getByText } = render(<AIExplainability {...testProps} />);
        expect(getByTestId('mocked-ai-score')).toBeVisible();
        expect(getByText(commonStrings.AI_LEARN_MORE)).toBeVisible();

        expect(queryByTestId('mocked-ai-factor-list')).toBeNull();
    });
});
