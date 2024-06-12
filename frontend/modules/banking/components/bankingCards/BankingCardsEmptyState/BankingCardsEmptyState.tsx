import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Image } from '@fluentui/react/lib/Image';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { stackTokens, stackItemStyles, textStyle } from './BankingCardsEmptyState.style';

export interface BankingCardsEmptyStateProps {
    text: string;
}

const BankingCardsEmptyState: FC<BankingCardsEmptyStateProps> = props => {
    return (
        <Stack tokens={stackTokens} styles={stackItemStyles} verticalAlign="center" horizontalAlign="center" data-testid={`credit-cards-empty-state`}>
            <Stack.Item align="center">
                <Image alt="" src={IMAGE_SRC.emptyState48} style={{ maxWidth: '48px' }} />
            </Stack.Item>
            <Stack.Item align="center">
                <div style={textStyle}>{props.text}</div>
            </Stack.Item>
        </Stack>
    );
};

export default BankingCardsEmptyState;
