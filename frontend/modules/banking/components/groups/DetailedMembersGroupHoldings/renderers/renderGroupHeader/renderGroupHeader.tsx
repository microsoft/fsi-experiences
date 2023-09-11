/* istanbul ignore file */
import { IconButton } from '@fluentui/react/lib/components/Button';
import { Checkbox } from '@fluentui/react/lib/components/Checkbox';
import { Stack } from '@fluentui/react/lib/Stack';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import React from 'react';
import { FH_OVERVIEW_ICON_TEXT_MAP } from '../../../../../constants/FHValueMaps';
import { IGroupDividerProps } from '@fluentui/react/lib/GroupedList';
import { GROUPS_HOLDINGS_VIEW_KEYS } from '../../DetailedMembersGroupHoldings.const';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import { Text } from '@fluentui/react/lib/Text';
import {
    groupHeaderCollapseIconStyles,
    groupHeaderIconStyles,
    groupHeaderSeparatorStyles,
    groupHeaderStyles,
    groupHeaderTextStyles,
} from './renderGroupHeader.style';
import { Icon } from '@fluentui/react/lib/Icon';
import { Separator } from '@fluentui/react/lib/components/Separator';

const renderGroupHeader =
    ({ showCheckboxes, financialHoldings, translate, onFHSelected, items, viewKey }) =>
    props => {
        if (!props?.group) return null;

        const calculateSelected = props => {
            let count = 0;
            const startIndex = props.group!.startIndex;
            const endIndex = startIndex + props.group!.count;
            for (let i = startIndex; i < endIndex; ++i) {
                if (financialHoldings.findIndex(fh => fh.id === items[i].id) !== -1) count++;
            }
            return count;
        };

        const getGroupText = props => {
            const numItems = props.group!.count;
            if (!onFHSelected) return `${props.group!.name} (${numItems})`;
            const selectedCount = calculateSelected(props);
            if (selectedCount === 0) return `${props.group!.name} (${numItems})`;
            return `${props.group!.name} (${translate('SELECTED_GROUP_HOLDING', { selectedCount, numItems })})`;
        };

        const onSelectGroup = (props: IGroupDividerProps, isChecked?: boolean) => {
            const startIndex = props.group!.startIndex;
            const endIndex = startIndex + props.group!.count;
            const itemsSelected: IGroupFinancialHolding[] = [];
            for (let i = startIndex; i < endIndex; ++i) {
                itemsSelected.push(items[i]);
            }

            /*istanbul ignore next */ onFHSelected && onFHSelected(itemsSelected, isChecked);
        };

        const isGroupChecked = (props: IGroupDividerProps) => {
            const count = calculateSelected(props);
            return count > 0 && count === props.group!.count;
        };

        const isGroupIndeterminate = (props: IGroupDividerProps) => {
            const count = calculateSelected(props);
            return count > 0 && count < props.group!.count;
        };

        const onToggleCollapse = (props: IGroupDividerProps) => props!.onToggleCollapse!(props!.group!);

        const iconProps = {
            iconName: 'ChevronRightMed',
            color: NeutralColors.gray130,
            styles: {
                root: {
                    color: NeutralColors.gray130,
                    transformOrigin: '50% 50%',
                    transition: 'transform 0.1s linear 0s',
                    transform: `rotate(${props.group!.isCollapsed ? '0deg' : '90deg'})`,
                    fontSize: '12px',
                },
            },
        };

        const iconName = FH_OVERVIEW_ICON_TEXT_MAP[props.group.key]?.icon;
        const groupId = `member-group-holding-${props.group.key}-${showCheckboxes ? 'editable' : 'readonly'}`;

        return (
            <Stack horizontalAlign="start" verticalAlign="center" data-testid="group-detailed-holdings-header">
                <Stack
                    horizontal
                    horizontalAlign="start"
                    verticalAlign="center"
                    tokens={{ childrenGap: showCheckboxes ? '14px' : '18px' }}
                    styles={groupHeaderStyles}
                >
                    {showCheckboxes && (
                        <Stack.Item>
                            <Checkbox
                                ariaLabel={translate('SELECT_SECTION')}
                                checked={isGroupChecked(props)}
                                indeterminate={isGroupIndeterminate(props)}
                                onChange={(ev, isChecked) => onSelectGroup(props, isChecked)}
                                data-testid="group-detailed-holdings-check-group"
                            />
                        </Stack.Item>
                    )}
                    <IconButton
                        styles={groupHeaderCollapseIconStyles}
                        className={showCheckboxes ? 'with-checkboxes' : ''}
                        aria-expanded={!props?.group?.isCollapsed}
                        aria-labelledby={groupId}
                        data-testid="group-detailed-holdings-collapse-icon"
                        onClick={() => onToggleCollapse(props)}
                        iconProps={iconProps}
                    />
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: '8px' }}>
                        {viewKey !== GROUPS_HOLDINGS_VIEW_KEYS.members && (
                            <Icon
                                styles={groupHeaderIconStyles}
                                iconName={iconName}
                                data-testid={`group-detailed-holdings-category-icon-${iconName}`}
                            />
                        )}
                        <Text id={groupId} styles={groupHeaderTextStyles} data-testid="group-detailed-holdings-header-text">
                            {getGroupText(props)}
                        </Text>
                    </Stack>
                </Stack>
                <Separator styles={groupHeaderSeparatorStyles} />
            </Stack>
        );
    };

export default renderGroupHeader;
