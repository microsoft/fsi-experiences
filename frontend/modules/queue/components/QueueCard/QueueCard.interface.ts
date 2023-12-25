import { IStyle } from '@fluentui/react/lib/Styling';
import React, { ReactElement } from 'react';

export interface IQueueCardStyles {
    card?: IStyle;
    title?: IStyle;
    subtitle?: IStyle;
    primaryContent?: IStyle;
    icon?: IStyle;
    iconStart?: IStyle;
    iconEnd?: IStyle;
    tagsWrapper?: IStyle;
    tag?: IStyle;
    tagStart?: IStyle;
    tagEnd?: IStyle;
}

export interface IQueueCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    primaryContent: string | ReactElement;
    id?: string;
    iconStart?: ReactElement;
    iconEnd?: ReactElement;
    tagStart?: string | ReactElement;
    tagEnd?: string | ReactElement;
    styles?: IQueueCardStyles;
    tabIndex?: number;
}
