import { IStyle } from '@fluentui/react/lib/Styling';
import { ReactElement } from 'react';

export interface ITasksProgressOverviewListStyles {
    list?: IStyle;
    listItem?: IStyle;
    contentContainer?: IStyle;
    listItemTitle?: IStyle;
    listItemText?: IStyle;
    listItemIcon?: IStyle;
}

export interface ITasksProgressOverviewListTaskGroupItem {
    name: string;
    completed: number;
    total: number;
}

export interface ITasksProgressOverviewListProps {
    taskGroups: ITasksProgressOverviewListTaskGroupItem[];
    styles?: ITasksProgressOverviewListStyles;
}

export interface ITasksProgressOverviewListItemProps {
    title: string;
    text: string;
    srText: string | ReactElement;
    iconName: string;
    iconStatus: string;
    styles: ITasksProgressOverviewListStyles;
}
