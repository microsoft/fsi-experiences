import React, { FC } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { IGroupHeaderProps } from '@fluentui/react/lib/GroupedList';
import { FH_OVERVIEW_ICON_TEXT_MAP } from '../../constants/FHValueMaps';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { Icon } from '@fluentui/react/lib/components/Icon/Icon';
import {
    groupExpandIconStyle,
    groupHeaderStyle,
    groupHeaderTextStyle,
    groupIconStyle,
    headerStyle,
    iconProps,
    iconStyle,
} from './FHTableGroupHeader.style';

export const FHTableGroupHeader: FC<IGroupHeaderProps> = (props: IGroupHeaderProps) => {
    const toggleCollapse = (): void => {
        props.onToggleCollapse!(props.group!);
    };
    const icon = props.group?.key && FH_OVERVIEW_ICON_TEXT_MAP[props.group?.key]?.icon;

    const id = useId('fh-table-group-header');

    const isCollapsed = !!props.group?.isCollapsed;

    return (
        <Stack verticalAlign="center" horizontalAlign="start" horizontal styles={groupHeaderStyle} data-testid={id}>
            <Stack.Item styles={groupExpandIconStyle}>
                <IconButton aria-expanded={!isCollapsed} aria-labelledby={id} onClick={toggleCollapse} iconProps={iconProps(isCollapsed)} />
            </Stack.Item>
            <Stack.Item styles={groupIconStyle}>
                <Icon style={iconStyle} iconName={icon} />
            </Stack.Item>
            <Stack.Item styles={groupHeaderTextStyle}>
                <div id={id} style={headerStyle}>
                    {props.group!.name} ({props.group!.count})
                </div>
            </Stack.Item>
        </Stack>
    );
};
