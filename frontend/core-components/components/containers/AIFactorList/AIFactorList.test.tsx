import React from 'react';
import { render } from '@testing-library/react';
import AIFactorList from './AIFactorList';
import { IAIFactorListProps } from './AIFactorList.interface';
import { IAIFactorProps } from '../../atoms/AIFactor/AIFactor.interface';

const aiFactoCompMock = jest.fn();
jest.mock('../../atoms/AIFactor/AIFactor', () => (params: IAIFactorProps) => {
    aiFactoCompMock(params);
    return <span data-testid={params.factorInfo.id} />;
});

jest.mock('../../atoms/InfoCallout/InfoCallout', () => props => <div data-testid="top-factors-info-callout">{props.children}</div>);

describe('AIFactorList', () => {
    const defaultProps: IAIFactorListProps = {
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
                {
                    displayName: 'Factor #2',
                    factor: -0.25,
                    id: 'factor-2',
                },
                {
                    displayName: 'Factor #3',
                    factor: 0.22,
                    id: 'factor-3',
                },
            ],
            text: 'Three primary factors influencing this customer’s churn risk',
            moreInfo: 'More info about top 3 factors',
        },
    };

    beforeEach(() => {
        aiFactoCompMock.mockReset();
    });

    it('should render AI Factor list correctly', () => {
        const { getByText, getByTestId } = render(<AIFactorList {...defaultProps} />);

        expect(getByText(defaultProps.factorsInfo.text)).toBeVisible();
        expect(getByText(defaultProps.factorsInfo.moreInfo as string)).toBeVisible();
        expect(getByTestId('top-factors-info-callout')).toBeVisible();
        expect(getByText(defaultProps.negativeLabel)).toBeVisible();
        expect(getByText(defaultProps.positiveLabel)).toBeVisible();

        defaultProps.factorsInfo.factors.forEach((factor, i) => {
            expect(aiFactoCompMock).toHaveBeenNthCalledWith(i + 1, {
                factorInfo: factor,
                lowIsGood: defaultProps.lowIsGood,
                negativeLabel: defaultProps.negativeLabel,
                positiveLabel: defaultProps.positiveLabel,
            });
        });
    });

    it('should render Factor list without more info', () => {
        const testProps: IAIFactorListProps = {
            ...defaultProps,
            factorsInfo: {
                ...defaultProps.factorsInfo,
                moreInfo: undefined,
            },
        };
        const { queryByTestId } = render(<AIFactorList {...testProps} />);
        expect(queryByTestId('top-factors-info-callout')).toBeNull();
    });
});
