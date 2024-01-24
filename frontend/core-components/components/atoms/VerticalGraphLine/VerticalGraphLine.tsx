import React, { CSSProperties, FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { IVerticalGraphLineProps } from './VerticalGraphLine.interface';
import { graphTagStackTokens, tagStyle } from './VerticalGraphLine.style';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';

const VerticalGraphLine: FC<IVerticalGraphLineProps> = ({ text, background, textColor, height, fontSize, value, showText }) => {
    const currTagStyles = { root: { height: `${height}px`, background: background, color: textColor } };
    const styleSet = mergeStyleSets(tagStyle, currTagStyles);

    return (
        <Stack horizontal styles={styleSet} tokens={graphTagStackTokens} horizontalAlign="start" data-testid="vertical-line-component">
            <Stack.Item grow={100}>
                <div style={{ textAlign: 'left', fontSize: `${fontSize}px` }}>{showText ? text : ''}</div>
            </Stack.Item>
            <Stack.Item grow={1}>
                <div style={{ textAlign: 'right', fontSize: `${fontSize}px` }}>{showText ? value : ''}</div>
            </Stack.Item>
        </Stack>
    );
};
export default VerticalGraphLine;
