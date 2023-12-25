import React, { FC, useContext } from 'react';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import EmptyState from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { RelationshipsContext } from '../../../components/relationships/context/RelationshipsContext';
import { RelationshipErrorEnum } from '../../../components/relationships/RelationshipErrorEnum';
import RelationshipsMainApp from '../../../components/relationships/RelationshipsMainApp';
import { GroupsContext } from '../contexts/GroupsContext';
import { GroupErrorEnum } from '../GroupErrorEnum';
import GroupsMainApp from '../GroupsMainApp';
import LoadingComponent from '../LoadingComponent';

interface RenderCommonAppComponentProps {
    openGroupModal;
    setIsRelationshipModalOpen;
    groupRelationshipSwitch;
    showRelationshipDeleteAcceptDialog;
    relationships: IRelationship[];
    setClickedRelationship;
    onDeleteGroupClick: () => void;
}

const RenderCommonAppComponent: FC<RenderCommonAppComponentProps> = ({
    openGroupModal,
    setIsRelationshipModalOpen,
    groupRelationshipSwitch,
    showRelationshipDeleteAcceptDialog,
    relationships,
    setClickedRelationship,
    onDeleteGroupClick,
}) => {
    const groupsContext = useContext(GroupsContext);
    const relationshipsContext = useContext(RelationshipsContext);
    const translate = useTranslation(namespaces.RELATIONSHIP);
    const translateGroups = useTranslation(namespaces.GROUPS_CONTROL);
    const groupsReadonly = groupsContext.readonly;
    const relationshipsReadonly = relationshipsContext.readonly;

    if (groupsContext.loadingState.isLoading || relationshipsContext.loadingState.isLoading) {
        return <LoadingComponent msg={translate('APP_LOADING_STATE')} />;
    }

    if (groupsContext.errorState === GroupErrorEnum.GROUPS_GET && relationshipsContext.errorState === RelationshipErrorEnum.RELATIONSHIP_INIT) {
        return <ErrorState iconSize={200} />;
    }

    if (
        groupsContext.groups.length === 0 &&
        relationshipsContext.relationships.length === 0 &&
        groupsContext.errorState !== GroupErrorEnum.GROUPS_GET &&
        relationshipsContext.errorState !== RelationshipErrorEnum.RELATIONSHIP_INIT
    ) {
        return (
            <EmptyState
                icon={IMAGE_SRC.create}
                iconSize={200}
                title={translate('EMPTY_STATE_TITLE')}
                horizontalActions
                callsToAction={[
                    {
                        title: translateGroups('CREATE_GROUP'),
                        callback: () => openGroupModal(null, 0),
                        iconProps: { iconName: 'Add' },
                        disabled: groupsReadonly,
                    },
                    {
                        title: translate('CREATE_RELATIONSHIP'),
                        callback: () => setIsRelationshipModalOpen(true),
                        iconProps: { iconName: 'Add' },
                        disabled: relationshipsReadonly,
                    },
                ]}
            />
        );
    }
    return (groupRelationshipSwitch && groupsContext.groups.length !== 0) ||
        (relationshipsContext.relationships.length === 0 && groupsContext.errorState !== GroupErrorEnum.GROUPS_GET) ? (
        <GroupsMainApp readonly={groupsReadonly} openGroupModal={openGroupModal} onDeleteGroupClick={onDeleteGroupClick} />
    ) : (
        <RelationshipsMainApp
            readonly={relationshipsReadonly}
            showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
            relationships={relationships}
            setIsModalOpen={setIsRelationshipModalOpen}
            setClickedRelationship={setClickedRelationship}
        />
    );
};

export default RenderCommonAppComponent;
