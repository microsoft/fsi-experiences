import React from 'react';
import { render, within } from '@testing-library/react';
import AIScore from './AIScore';
import { IAIScoreInfo } from './AIScore.interface';
import { IIndicatorProps } from '../Indicator/Indicator.interface';
import { IExplainabilityBoxProps } from '../ExplainabilityBox';

jest.mock('../Indicator/Indicator', () => (params: IIndicatorProps) => (
    <>
        <div>{params.iconName}</div>
        <div>{params.tooltipProps?.content}</div>
    </>
));
jest.mock('../ExplainabilityBox/ExplainabilityBox', () => (params: IExplainabilityBoxProps) => (
    <>
        <div>{params.color}</div>
        <div>{params.visibleText}</div>
    </>
));

describe('AIScore', () => {
    const scoreInfo: IAIScoreInfo = {
        color: 'red',
        moreInfo: 'more info more info more info, more info more info',
        score: 21,
        text: 'High',
    };
    const scoreTitle = 'Score';
    const ofTotalText = 'of 100';

    it('should render AI score title correctly', () => {
        const { getByTestId } = render(<AIScore scoreInfo={scoreInfo} ofTotalText={ofTotalText} scoreTitle={scoreTitle} />);

        const titleContainer = getByTestId('ai-score-title');
        expect(titleContainer).toBeVisible();
        expect(within(titleContainer).getByText(scoreTitle)).toBeVisible();
    });

    it('should render AI score value correctly', () => {
        const { getByTestId } = render(<AIScore scoreInfo={scoreInfo} ofTotalText={ofTotalText} scoreTitle={scoreTitle} />);

        const valueContainer = getByTestId('ai-score-value');
        expect(valueContainer).toBeVisible();
        expect(within(valueContainer).getByText(scoreInfo.score)).toBeVisible();
        expect(within(valueContainer).getByText(ofTotalText)).toBeVisible();
    });

    it('should render AI score range correctly', () => {
        const { getByTestId } = render(<AIScore scoreInfo={scoreInfo} ofTotalText={ofTotalText} scoreTitle={scoreTitle} />);

        const rangeContainer = getByTestId('ai-score-range');
        expect(rangeContainer).toBeVisible();
        expect(within(rangeContainer).getByText(scoreInfo.text)).toBeVisible();
        expect(within(rangeContainer).getByText(scoreInfo.color)).toBeVisible();
        expect(within(rangeContainer).getByText(scoreInfo.moreInfo as string)).toBeVisible();
        expect(within(rangeContainer).getByText('info')).toBeVisible();
    });

    it('should render AI score range without more info', () => {
        const testScoreInfo = {
            ...scoreInfo,
            moreInfo: undefined,
        };
        const { getByTestId } = render(<AIScore scoreInfo={testScoreInfo} ofTotalText={ofTotalText} scoreTitle={scoreTitle} />);

        const rangeContainer = getByTestId('ai-score-range');
        expect(rangeContainer).toBeVisible();
        expect(within(rangeContainer).queryByText('info')).toBeNull();
    });
});
