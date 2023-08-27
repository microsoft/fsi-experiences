import React, { FC, useMemo } from 'react';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { Text } from '@fluentui/react/lib/components/Text';
import { Stack } from '@fluentui/react/lib/components/Stack';
import Indicator from '../Indicator/Indicator';
import type { IAIScoreProps } from './AIScore.interface';
import {
    mainAIScoreStackTokens,
    scoreValueTokens,
    scoreValueLabelStyles,
    ofTotalLabelStyles,
    scoreRangeStackTokens,
    scoreRangeLabelStyles,
} from './AIScore.style';
import ExplainabilityBox from '../ExplainabilityBox/ExplainabilityBox';

const scoreTitleStyles = { root: { zIndex: 1 } };
export const AIScore: FC<IAIScoreProps> = (props: IAIScoreProps) => {
    const {
        scoreInfo: { score, color, text, moreInfo },
        scoreTitle,
        ofTotalText,
    } = props;

    const indicatorTooltip = useMemo(
        () => ({
            content: moreInfo,
            directionalHint: DirectionalHint.rightCenter,
        }),
        [moreInfo]
    );

    return (
        <Stack horizontalAlign="start" tokens={mainAIScoreStackTokens}>
            <Text data-testid="ai-score-title" styles={scoreTitleStyles}>
                {scoreTitle}
            </Text>
            <Stack horizontal verticalAlign="baseline" tokens={scoreValueTokens}>
                <Stack horizontal verticalAlign="baseline" data-testid="ai-score-value">
                    <Text styles={scoreValueLabelStyles}>{score}</Text>
                    <Text styles={ofTotalLabelStyles}>{ofTotalText}</Text>
                </Stack>
                <Stack horizontal verticalAlign="center" tokens={scoreRangeStackTokens} data-testid="ai-score-range">
                    <ExplainabilityBox color={color} visibleText={text} textStyles={scoreRangeLabelStyles} />
                    {moreInfo && <Indicator tooltipProps={indicatorTooltip} size={12} iconName="info" />}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default AIScore;
