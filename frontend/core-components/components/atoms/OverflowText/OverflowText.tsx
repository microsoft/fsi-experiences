import React, { FC, useMemo } from 'react';
import type { IOverflowTextProps } from './OverflowText.interface';
import { TooltipHost } from '@fluentui/react/lib/components/Tooltip/TooltipHost';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { overflowTextStyles } from './OverflowText.style';
import { TooltipOverflowMode } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';

export const OverflowText: FC<IOverflowTextProps> = props => {
    const { text, styles, overflowModeSelf, children } = props;
    const hostStyles = useMemo(() => mergeStyleSets(overflowTextStyles, styles), [styles]);
    return (
        <TooltipHost
            overflowMode={overflowModeSelf ? TooltipOverflowMode.Self : TooltipOverflowMode.Parent}
            directionalHint={DirectionalHint.rightCenter}
            content={text}
            styles={hostStyles}
        >
            {children || text}
        </TooltipHost>
    );
};

export default OverflowText;
