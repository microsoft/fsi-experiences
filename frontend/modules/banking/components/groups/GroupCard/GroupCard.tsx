import React, { FC, useContext, useMemo } from 'react';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { IconButton } from '@fluentui/react/lib/Button';
import { PersonaSize } from '@fluentui/react/lib/Persona';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { Separator } from '@fluentui/react/lib/Separator';
import { IFacepilePersona, OverflowButtonType } from '@fluentui/react/lib/Facepile';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { IGroup, IGroupMember } from '../../../interfaces/Groups';
import GroupDetailsBar from '../../GroupDetailsBar/GroupDetailsBar';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import {
    facepileStyles,
    groupCardTableHeaderStyle,
    groupCardTableHeaderTextStyle,
    groupCardIconStyle,
    groupsPersonaStyles,
    mainStackStyle,
    groupCardShortDetailsStyles,
    closedCardStyles,
    openedCardStyles,
    groupSeperatorStyles,
    cardMemberRootStyles,
} from './GroupCard.style';
import { LinkablePersona } from '@fsi/core-components/dist/components/atoms';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { GroupsContext } from '../contexts/GroupsContext';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import Facepile from '@fsi/core-components/dist/components/atoms/Facepile';

export interface IGroupCardProps {
    group: IGroup;
    isPrimary: boolean;
    isSelected: boolean;
    onSelected: (id: string) => void;
    onEditClick: (group: IGroup | null, step: number) => void;
    onDeleteClick: (group: IGroup) => void;
    readonly?: boolean;
}

const GroupCard: FC<IGroupCardProps> = ({ readonly, group, isPrimary, isSelected, onSelected, onEditClick, onDeleteClick }) => {
    const groupsContext = useContext(GroupsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);

    const sortedGroup = useMemo(() => {
        const myGroup = { ...group, members: [...group.members] };
        if (myGroup.members.length !== 0) {
            const primaryMemberIndex = myGroup.members.findIndex(m => m.id === group.primaryMember);
            if (primaryMemberIndex !== -1 && primaryMemberIndex !== 0) {
                const temp = myGroup.members[primaryMemberIndex];
                myGroup.members[primaryMemberIndex] = group.members[0];
                myGroup.members[0] = temp;
            }
        }

        return myGroup;
    }, [group]);

    const facepiles: IFacepilePersona[] = useMemo(() => {
        if (sortedGroup.members.length === 0) return [];
        return sortedGroup.members.map(m => {
            const facepilePersona: IFacepilePersona = {
                personaName: m.customer.name,
                imageUrl: m.customer.contactImgUrl,
            };
            return facepilePersona;
        });
    }, [sortedGroup]);
    const deleteGroup = () => {
        onDeleteClick(sortedGroup);
    };

    const Card = () => (
        <Stack>
            <FocusZone direction={FocusZoneDirection.vertical}>
                <Stack styles={closedCardStyles(isSelected)} data-testid="group-card-component-renderClosedCard">
                    <Facepile
                        autoSize
                        disableHoverCard
                        className="group-facepiles"
                        styles={facepileStyles}
                        personas={facepiles}
                        personaSize={PersonaSize.size32}
                        overflowButtonType={OverflowButtonType.descriptive}
                    />
                </Stack>
                <Stack styles={openedCardStyles(isSelected)} tokens={{ childrenGap: '10px' }}>
                    {sortedGroup.members.length !== 0 ? (
                        <>
                            <Stack horizontal horizontalAlign="start" verticalAlign="center" styles={groupCardTableHeaderStyle}>
                                <Text className="group-member-header" styles={groupCardTableHeaderTextStyle}>
                                    {translate('GROUPS_CARD_MEMBERS')}
                                </Text>
                                <Text styles={groupCardTableHeaderTextStyle}>{translate('GROUPS_CARD_ROLE')}</Text>
                            </Stack>
                            <Stack
                                role="list"
                                horizontalAlign="start"
                                tokens={{ childrenGap: '8px', maxHeight: '165px' }}
                                styles={{ root: { width: '100%', overflowY: 'auto' } }}
                            >
                                {sortedGroup.members.map((gm, idx) => renderCardMember(gm))}
                            </Stack>
                        </>
                    ) : (
                        <EmptyState icon={IMAGE_SRC.connect_error} iconSize={48} title={translate('GROUPS_CARD_MEMBER_ERROR')} />
                    )}
                    <Separator styles={{ root: { padding: '0px 0px', height: '0px' } }} />
                    <Stack horizontal horizontalAlign="end" verticalAlign="center" styles={{ root: { paddingBottom: '7px' } }}>
                        <IconButton
                            styles={groupCardIconStyle}
                            menuIconProps={{ iconName: 'Delete', 'aria-hidden': true }}
                            onClick={() => deleteGroup()}
                            data-testid="group-card-component-delete-button"
                            aria-label={translate('DELETE')}
                            title={translate('DELETE')}
                            disabled={readonly}
                        />
                        <IconButton
                            styles={groupCardIconStyle}
                            menuIconProps={{ iconName: 'Edit', 'aria-hidden': true }}
                            onClick={() => onEditClick(sortedGroup, 0)}
                            data-testid="group-card-component-edit-button"
                            aria-label={translate('GROUPS_EDIT')}
                            title={translate('GROUPS_EDIT')}
                            disabled={readonly}
                        />
                    </Stack>
                </Stack>
            </FocusZone>
        </Stack>
    );

    const renderCardMember = (gm: IGroupMember) => {
        return (
            <Stack
                data-testid={`group-card-component-persona-${gm.id}`}
                horizontal
                horizontalAlign="start"
                role="listitem"
                verticalAlign="center"
                styles={cardMemberRootStyles}
                className={sortedGroup.primaryMember === gm.id ? 'primary-member' : ''}
                key={gm.id}
            >
                <LinkablePersona
                    styles={groupsPersonaStyles}
                    personas={[{ personaName: gm.customer.name, imageUrl: gm.customer.contactImgUrl, data: gm.customer }]}
                    personaSize={PersonaSize.size32}
                />
                <Text styles={{ root: { textAlign: 'start', fontWeight: FontWeights.regular, fontSize: FontSizes.size12, overflow: 'hidden' } }}>
                    {groupsContext.pickLists.groupMemberTypes.get(gm.role)}
                </Text>
            </Stack>
        );
    };

    return (
        <Stack
            styles={mainStackStyle}
            className={isSelected ? 'group-selected' : ''}
            tokens={{ childrenGap: '12px' }}
            data-is-focusable
            onClick={() => onSelected(sortedGroup.id)}
            data-testid="group-card-component"
        >
            <Stack tokens={{ childrenGap: '12px' }}>
                <GroupDetailsBar styles={groupCardShortDetailsStyles} group={sortedGroup} isPrimary={isPrimary} />
                <Separator styles={groupSeperatorStyles} />
            </Stack>
            <Card />
        </Stack>
    );
};
export default GroupCard;
