import { ReactElement } from 'react';
import { IStyle } from '@fluentui/merge-styles/lib/IStyle';
import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';

export interface IEmptyStateStyles {
    container?: IStyle;
    icon?: IStyle;
    title?: IStyle;
    subtitle?: IStyle;
}

export interface ICallToActionEmptyStateProps {
    title: string;
    iconProps?: IIconProps;
    callback: () => void;
    disabled?: boolean;
}
export interface IEmptyStateProps {
    title: string;
    subtitle?: string;
    icon?: string;
    iconSize?: number;
    footer?: ReactElement;
    horizontalActions?: boolean;
    callsToAction?: ICallToActionEmptyStateProps[];
    styles?: IEmptyStateStyles;
    isErrorState?: boolean;
}
