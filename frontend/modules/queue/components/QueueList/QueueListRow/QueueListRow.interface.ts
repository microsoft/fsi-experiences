import React from 'react';
import { IQueueListItem, IQueueListStyles } from '../QueueList.interface';

export interface IQueueListRowProps {
    item: IQueueListItem;
    srCurrentItemText: string;
    isSelected?: boolean;
    className?: string;
    styles?: IQueueListStyles;
    onClick?: (item: IQueueListItem, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
