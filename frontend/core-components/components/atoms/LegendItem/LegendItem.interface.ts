import { IStyle } from '@fluentui/react/lib/Styling';

export interface ILegendItemStyles {
    label?: IStyle;
    marker?: IStyle;
}

export interface ILegendItemProps {
    label: string;
    color: string;
    styles?: ILegendItemStyles;
}
