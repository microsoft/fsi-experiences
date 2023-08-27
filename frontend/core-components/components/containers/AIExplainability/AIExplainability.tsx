import React, { FC } from 'react';
import { useTranslation } from '../../../context/hooks/useTranslation';
import { SectionHeader } from '../../atoms';
import AIScore from '../../atoms/AIScore/AIScore';
import Divider from '../../atoms/Divider/Divider';
import AIFactorList from '../AIFactorList/AIFactorList';
import type { IAIExplainabilityProps } from './AIExplainability.interface';
import { Stack, StackItem } from '@fluentui/react/lib/components/Stack';
import { Link } from '@fluentui/react/lib/components/Link';
import { Text } from '@fluentui/react/lib/components/Text';
import {
    aiExplainabilityDividerStyles,
    aiExplainabilityLinkStyles,
    aiExplainabilityTextStyles,
    aiLearnMoreLinkStyles,
} from './AIExplainability.style';

export const AIExplainability: FC<IAIExplainabilityProps> = (props: IAIExplainabilityProps) => {
    const {
        modelTitle,
        learnMoreLink,
        learnMoreAdditionalText,
        scoreInfo,
        factorsInfo: { factors },
    } = props;

    const translate = useTranslation();

    return (
        <Stack>
            <SectionHeader titleString={modelTitle} horizontalAlign="start" />
            <AIScore scoreInfo={scoreInfo} scoreTitle={translate('SCORE')} ofTotalText={translate('OF_100')} />
            {factors.length && (
                <>
                    <Divider styles={aiExplainabilityDividerStyles} />
                    <AIFactorList {...props} />
                </>
            )}
            <Divider styles={aiExplainabilityDividerStyles} />
            {learnMoreLink && (
                <StackItem align="start" styles={aiExplainabilityLinkStyles}>
                    <Link target="_blank" href={learnMoreLink} styles={aiLearnMoreLinkStyles}>
                        {translate('AI_LEARN_MORE')}
                    </Link>
                    &nbsp;<Text styles={aiExplainabilityTextStyles}>{learnMoreAdditionalText}</Text>
                </StackItem>
            )}
        </Stack>
    );
};

export default AIExplainability;
