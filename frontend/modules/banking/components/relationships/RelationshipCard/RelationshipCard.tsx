import React, { FC, useContext, useMemo } from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { PersonaSize } from '@fluentui/react/lib/Persona';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { IFacepilePersona, OverflowButtonType } from '@fluentui/react/lib/Facepile';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import {
    createRelationShipWrapper,
    relationshipCardStyle,
    relationshipListContainerStyles,
    relationshipsCardErrorStateStyles,
    relationshipsEmptyStateCard,
    relationshipsListHeaderStyles,
    relationshipsListHeaderTextStyles,
} from './RelationshipCard.style';
import { RelationshipsContext } from '../context/RelationshipsContext';
import { IRelationhipCardProps } from './RelationshipCard.interface';
import { RelationshipErrorEnum } from '../RelationshipErrorEnum';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { GroupErrorEnum, GroupsContext } from '../../../components/groups';
import EmptyState from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import Facepile from '@fsi/core-components/dist/components/atoms/Facepile';

const RelationshipCard: FC<IRelationhipCardProps> = ({ relationships, isSelected, onSelected, onAddRelationship, readonly }) => {
    const relationshipsContext = useContext(RelationshipsContext);
    const groupsContext = useContext(GroupsContext);

    const translate = useTranslation(namespaces.RELATIONSHIP);

    const customers: IFacepilePersona[] = useMemo(
        () =>
            relationshipsContext.relationships.map(relationship => {
                return { personaName: relationship.contactTo.fullName, imageUrl: relationship.contactTo.contactImgUrl };
            }),
        [relationshipsContext.relationships]
    );

    const renderFacepile = () => (
        <Facepile
            styles={{ root: { paddingBottom: '12px', position: 'relative' } }}
            personas={customers}
            personaSize={PersonaSize.size32}
            maxDisplayablePersonas={5}
            overflowButtonType={OverflowButtonType.descriptive}
            overflowButtonProps={{}}
        />
    );

    return (
        <Stack tokens={{ childrenGap: '15px' }} styles={relationshipListContainerStyles} data-testid="relationship-card-component">
            <Stack.Item>
                <Stack wrap tokens={{ childrenGap: 8 }} horizontal horizontalAlign="space-between" styles={relationshipsListHeaderStyles}>
                    <Stack.Item>
                        <Text styles={relationshipsListHeaderTextStyles} as="h2" className="relationship-card">
                            {translate('RELATIONSHIPS')}
                        </Text>
                    </Stack.Item>
                    <Stack.Item styles={createRelationShipWrapper}>
                        <DefaultButton
                            text={translate('RELATIONSHIP_ADD_SUBMIT_TEXT')}
                            iconProps={{ iconName: 'Add' }}
                            onClick={() => onAddRelationship(true)}
                            data-testid="relationship-list-add-button"
                            disabled={relationshipsContext.errorState === RelationshipErrorEnum.RELATIONSHIP_INIT || readonly}
                        />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
            {relationships.length !== 0 && (
                <FocusZone>
                    <Stack.Item
                        styles={relationshipCardStyle}
                        className={isSelected ? 'group-selected' : ''}
                        data-is-focusable
                        onClick={onSelected}
                        data-testid={'relationship-card-facepile-wrapper'}
                    >
                        {renderFacepile()}
                    </Stack.Item>
                </FocusZone>
            )}
            {relationshipsContext.errorState === RelationshipErrorEnum.RELATIONSHIP_INIT && groupsContext.errorState !== GroupErrorEnum.GROUPS_GET && (
                <Stack.Item data-testid={'relationship-card-facepile-wrapper'}>
                    <div style={{ height: '160px' }}>
                        <ErrorState iconSize={48} styles={relationshipsCardErrorStateStyles} />
                    </div>
                </Stack.Item>
            )}
            {groupsContext.groups.length !== 0 &&
                relationshipsContext.relationships.length === 0 &&
                relationshipsContext.errorState !== RelationshipErrorEnum.RELATIONSHIP_GET && (
                    <div style={{ height: '160px' }}>
                        <EmptyState
                            icon={IMAGE_SRC.emptyState48}
                            iconSize={48}
                            title={translate('RELATIONSHIPS_CARD_EMPTY_STATE')}
                            styles={relationshipsEmptyStateCard}
                        />
                    </div>
                )}
        </Stack>
    );
};

export default RelationshipCard;
