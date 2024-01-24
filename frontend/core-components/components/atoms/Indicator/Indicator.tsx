import { TooltipHost } from '@fluentui/react/lib/components/Tooltip/TooltipHost';
import React, { FC, useMemo } from 'react';
import type { IIndicatorProps } from './Indicator.interface';
import { getIndicatorStyles, tooltipHostStyle } from './Indicator.style';
import { useId } from '@fluentui/react-hooks';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { COLORS } from '../../../constants/Colors';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const calloutProps = { gapSpace: 0 };
export const Indicator: FC<IIndicatorProps> = props => {
    const { tooltipProps, size = 16, color = COLORS.black, iconName, iconAriaLabel, buttonStyles } = props;

    const indicatorStyles = useMemo(() => {
        return mergeStyleSets(buttonStyles, getIndicatorStyles(size, color));
    }, [size, color, buttonStyles]);

    const id = useId('indicator-tooltip');

    return (
        <TooltipHost
            calloutProps={calloutProps}
            {...tooltipProps}
            id={id}
            data-testid="indicator-tooltip"
            styles={mergeStyleSets(tooltipHostStyle, tooltipProps?.styles)}
        >
            <IconButton
                className="indicator-icon-button"
                size={size}
                aria-label={iconAriaLabel}
                aria-describedby={id}
                data-testid={`indicator-icon-${iconName}`}
                styles={indicatorStyles}
                iconProps={{ iconName, color }}
                color={color}
                onClick={e => e.stopPropagation()}
            />
        </TooltipHost>
    );
};

export default Indicator;
