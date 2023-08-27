import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { FontIcon } from '@fluentui/react/lib/components/Icon';
import { Text } from '@fluentui/react/lib/components/Text';
import AIFactor from '../../atoms/AIFactor/AIFactor';
import { aiFactorDisplayNameStyles, getAIFactorIconClass } from '../../atoms/AIFactor/AIFactor.style';
import type { IAIFactorListProps } from './AIFactorList.interface';
import {
    aiFactorListStackTokens,
    aiFactorListLabelStyles,
    aiFactorInnerListStackTokens,
    aiFactorListLegendStackTokens,
    aiTopFactorCalloutStyles,
} from './AIFactorList.style';
import { useTranslation } from '../../../context/hooks/useTranslation';
import InfoCallout from '../../atoms/InfoCallout/InfoCallout';

export const AIFactorList: FC<IAIFactorListProps> = (props: IAIFactorListProps) => {
    const {
        factorsInfo: { factors, moreInfo, text },
        lowIsGood,
        negativeLabel,
        positiveLabel,
    } = props;

    const translate = useTranslation();

    return (
        <Stack tokens={aiFactorListStackTokens}>
            <Stack horizontal verticalAlign="center" data-testid="ai-score-range">
                <Text styles={aiFactorListLabelStyles}>{text}</Text>
                {moreInfo && (
                    <InfoCallout iconAriaLabel={translate('ARIA_LABEL_INFO')} calloutStyles={aiTopFactorCalloutStyles}>
                        {moreInfo}
                    </InfoCallout>
                )}
            </Stack>
            <Stack role="list" tokens={aiFactorInnerListStackTokens}>
                {factors.map(factor => (
                    <AIFactor positiveLabel={positiveLabel} negativeLabel={negativeLabel} lowIsGood={lowIsGood} factorInfo={factor} key={factor.id} />
                ))}
            </Stack>
            <Stack aria-hidden horizontal tokens={aiFactorListLegendStackTokens}>
                <Stack horizontal verticalAlign="center">
                    <FontIcon iconName="UP" className={getAIFactorIconClass(1, 12, lowIsGood)} />
                    <Text styles={aiFactorDisplayNameStyles}>{positiveLabel}</Text>
                </Stack>
                <Stack horizontal verticalAlign="center">
                    <FontIcon iconName="Down" className={getAIFactorIconClass(-1, 12, lowIsGood)} />
                    <Text styles={aiFactorDisplayNameStyles}>{negativeLabel}</Text>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default AIFactorList;
