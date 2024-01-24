import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { ITooltipHostProps } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';

export interface IIndicatorProps {
    size?: number;
    color?: string;
    iconName?: string;
    tooltipProps?: ITooltipHostProps;
    iconAriaLabel?: string;
    buttonStyles?: IButtonStyles;
}
