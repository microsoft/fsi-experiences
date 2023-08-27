import React, { FC } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import type { IExplainabilityBoxProps } from './ExplainabilityBox.interface';
import { boxStylesWithColor, explainabilityMargin, stackTokens, visibleTextMarginStyles, visibleTextStyles } from './ExplainabilityBox.style';
import { Text } from '@fluentui/react/lib/components/Text';

export const ExplainabilityBox: FC<IExplainabilityBoxProps> = props => {
    const { color, visibleText, showExplainability, textStyles, children } = props;

    return (
        <Stack verticalAlign="center" horizontal styles={boxStylesWithColor(color)} tokens={stackTokens} data-testid={'box-stack-wrapper'}>
            <Stack.Item styles={visibleTextMarginStyles(showExplainability)}>
                <Text styles={textStyles || visibleTextStyles} data-testid={'visible-text'}>
                    {visibleText}
                </Text>
            </Stack.Item>
            {showExplainability && (
                <Stack.Item styles={explainabilityMargin} data-testid={'explainability-section'}>
                    {children}
                </Stack.Item>
            )}
        </Stack>
    );
};

export default ExplainabilityBox;
