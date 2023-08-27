import React, { FC } from 'react';
import { FontIcon } from '@fluentui/react/lib/components/Icon';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { Text } from '@fluentui/react/lib/components/Text';
import type { IAIFactorProps } from './AIFactor.interface';
import { aiFactorStackTokens, aiFactorValueStyles, aiFactorDisplayNameStyles, getAIFactorIconClass } from './AIFactor.style';
import { toRate } from '../../../utilities/CalcUtils';

export const AIFactor: FC<IAIFactorProps> = (props: IAIFactorProps) => {
    const {
        factorInfo: { displayName, factor },
        showFactorRate,
        lowIsGood,
        negativeLabel,
        positiveLabel,
    } = props;

    const className = getAIFactorIconClass(factor, 14, lowIsGood);
    return (
        <Stack role="listitem" horizontal verticalAlign="center" tokens={aiFactorStackTokens}>
            <FontIcon
                data-testid="ai-factor-icon"
                iconName={factor < 0 ? 'Down' : 'Up'}
                aria-label={factor < 0 ? negativeLabel : positiveLabel}
                className={className}
            />
            {showFactorRate && <Text styles={aiFactorValueStyles}>{toRate(Math.abs(factor))}</Text>}
            <Text styles={aiFactorDisplayNameStyles}> {displayName}</Text>
        </Stack>
    );
};

export default AIFactor;
