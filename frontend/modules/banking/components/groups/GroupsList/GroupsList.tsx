import React, { FC, useCallback, useContext } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { DefaultButton } from '@fluentui/react/lib/Button';
import GroupCard from '../GroupCard/GroupCard';
import { IGroup } from '../../../interfaces/Groups';
import { GroupsContext } from '../contexts/GroupsContext';
import {
    groupsEmptyStateCard,
    groupsListContainerStyles,
    groupsListErrorStateStyles,
    groupsListHeaderStyles,
    groupsListHeaderTextStyles,
    groupsListStyle,
} from './GroupsList.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { GroupErrorEnum } from '../GroupErrorEnum';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { RelationshipErrorEnum, RelationshipsContext } from '../../../components/relationships';
import { EmptyState } from '@fsi/core-components/dist/components/atoms';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '@fluentui/react/lib/FocusZone';
import { focusZoneStyles } from '../GroupsAndRelationshipsMainApp/GroupsAndRelationshipsMainApp.style';

export interface IGroupsListProps {
    selectedGroup: IGroup;
    onGroupSelected: (id: string) => void;
    onAddGroupClick: (group: IGroup | null, step: number) => void;
    onDeleteGroupClick: (group: IGroup) => void;
    readonly?: boolean;
}

const shouldEnterCardInnerZone = e => e.key === 'Tab' && !e.shiftKey;

const GroupsList: FC<IGroupsListProps> = ({ readonly, selectedGroup, onGroupSelected, onAddGroupClick, onDeleteGroupClick }) => {
    const groupsContext = useContext(GroupsContext);
    const relationshipsContext = useContext(RelationshipsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);

    const { groups, mainCustomer } = groupsContext;

    const isPrimary = useCallback(
        (group: IGroup) => {
            const mainMember = group.members.find(m => m.customer.id === mainCustomer.id);
            return mainMember?.IsPrimaryGroup || false;
        },
        [mainCustomer]
    );

    return (
        <Stack horizontalAlign="start" tokens={{ childrenGap: '21px' }} styles={groupsListContainerStyles} data-testid="group-list-component">
            <Stack horizontal horizontalAlign="space-between" styles={groupsListHeaderStyles}>
                <Text className="group-card" as="h2" styles={groupsListHeaderTextStyles}>
                    {translate('GROUPS')}
                </Text>
                <DefaultButton
                    text={translate('CREATE_GROUP')}
                    iconProps={{ iconName: 'Add' }}
                    onClick={() => onAddGroupClick(null, 0)}
                    data-testid="group-list-component-add-group-button"
                    disabled={groupsContext.errorState === GroupErrorEnum.GROUPS_GET || readonly}
                />
            </Stack>
            {groupsContext.errorState === GroupErrorEnum.GROUPS_GET && relationshipsContext.errorState !== RelationshipErrorEnum.RELATIONSHIP_INIT && (
                <div style={{ height: '160px' }}>
                    <ErrorState iconSize={48} styles={groupsListErrorStateStyles} />
                </div>
            )}
            {groupsContext.groups.length === 0 &&
                groupsContext.errorState !== GroupErrorEnum.GROUPS_GET &&
                relationshipsContext.relationships.length !== 0 && (
                    <div style={{ height: '160px', width: '100%' }}>
                        <EmptyState
                            icon={IMAGE_SRC.emptyState48}
                            iconSize={48}
                            title={translate('GROUPS_CARD_EMPTY_STATE')}
                            styles={groupsEmptyStateCard}
                        />
                    </div>
                )}
            {groupsContext.groups.length !== 0 && (
                <FocusZone
                    handleTabKey={FocusZoneTabbableElements.all}
                    shouldResetActiveElementWhenTabFromZone
                    shouldEnterInnerZone={shouldEnterCardInnerZone}
                    style={focusZoneStyles}
                    direction={FocusZoneDirection.vertical}
                >
                    <Stack role="list" styles={groupsListStyle} tokens={{ childrenGap: '16px', maxHeight: '100%' }}>
                        {groups.map(g => (
                            <Stack.Item role="listitem" key={g.id} className="groups-line">
                                <GroupCard
                                    readonly={readonly}
                                    group={g}
                                    key={g.id}
                                    isPrimary={isPrimary(g)}
                                    isSelected={selectedGroup.id === g.id}
                                    onSelected={onGroupSelected}
                                    onEditClick={onAddGroupClick}
                                    onDeleteClick={onDeleteGroupClick}
                                />
                            </Stack.Item>
                        ))}
                    </Stack>
                </FocusZone>
            )}
        </Stack>
    );
};
export default GroupsList;
