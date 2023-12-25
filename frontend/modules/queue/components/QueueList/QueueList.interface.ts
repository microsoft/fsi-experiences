import { IStyle } from '@fluentui/react/lib/Styling';
import React, { ReactElement, AriaAttributes } from 'react';
import { IQueueData } from '../../interfaces/IQueueData.interface';
import { IQueueGroup } from '../../interfaces/IQueueGroup.interface';

export interface IQueueListStyles {
    queueListWrapper?: IStyle;
    queueList?: IStyle;
    queueListRow?: IStyle;
    queueListRowCell?: IStyle;
    queueListGroupHeader?: IStyle;
    queueListGroupHeaderPrimaryText?: IStyle;
    queueListGroupHeaderSecondaryText?: IStyle;
}

export interface IQueueListItem {
    data: IQueueData;
    groupId?: string;
}

export interface IQueueListProps {
    dataItems: IQueueListItem[];
    activeItemId?: string;
    groups: IQueueGroup;
    wrapperAriaAttributes?: AriaAttributes;
    styles?: IQueueListStyles;
    onRenderContent: (item: IQueueListItem) => ReactElement;
    onClick?: (item: IQueueListItem, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
