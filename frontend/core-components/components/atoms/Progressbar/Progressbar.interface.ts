import { IProgressIndicatorProps } from '@fluentui/react/lib/components/ProgressIndicator/ProgressIndicator.types';
import { IStyle } from '@fluentui/react/lib/Styling';
import { ReactElement } from 'react';

export interface IProgressbarStyles {
    container?: IStyle;
    asideText?: IStyle;
}

export interface IProgressbarProps {
    percentComplete: number;
    label?: string[] | string | ReactElement;
    description?: string[] | string | ReactElement;
    asideText?: string[] | string | ReactElement;
    indicatorProps?: IProgressIndicatorProps;
    styles?: IProgressbarStyles;
}
