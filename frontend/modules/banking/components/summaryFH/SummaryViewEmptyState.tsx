import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { Image } from '@fluentui/react/lib/Image';
import { FontSizes } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export interface PivotElements {
    text: string;
    image?: string;
}

const SummaryViewEmptyState: FC<PivotElements> = props => {
    const stackTokens = {
        childrenGap: 10,
        padding: 10,
    };

    const stackItemStyles = {
        root: {
            width: '100%',
            height: '279px',
        },
    };

    return (
        <Stack
            tokens={stackTokens}
            styles={stackItemStyles}
            verticalAlign="center"
            horizontalAlign="center"
            data-testid={`summary-empty-state-${props.text}`}
        >
            <Stack.Item align="center">
                <Image alt="" src={props.image || IMAGE_SRC.emptyState100} style={{ maxWidth: '100px' }} />
            </Stack.Item>
            <Stack.Item align="center">
                <div style={{ color: COLORS.primaryTagText, fontSize: FontSizes.size16 }}>{props.text}</div>
            </Stack.Item>
        </Stack>
    );
};

export default SummaryViewEmptyState;
