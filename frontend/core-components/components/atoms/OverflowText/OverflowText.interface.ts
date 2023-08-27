import { ITooltipHostStyles } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';

export interface IOverflowTextProps {
    text: string;
    styles?: ITooltipHostStyles;
    overflowModeSelf?: boolean;
}
