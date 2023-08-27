import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Image } from '@fluentui/react/lib/Image';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export interface BankingCardsEmptyStateProps {
    text: string;
}

const BankingCardsEmptyState: FC<BankingCardsEmptyStateProps> = props => {
    const stackTokens = {
        childrenGap: 10,
        padding: 10,
    };

    const stackItemStyles = {
        root: {
            width: '100%',
            height: '100px',
        },
    };
    const textStyle: React.CSSProperties = {
        color: COLORS.primaryTagText,
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold as number,
    };

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
