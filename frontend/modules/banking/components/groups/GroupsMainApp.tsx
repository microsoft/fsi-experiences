import React, { FC, useContext, useMemo } from 'react';
import { IGroup } from '../../interfaces/Groups';
import { GroupsContext } from './contexts/GroupsContext';
import GroupMainDetails from './GroupMainDetails/GroupMainDetails';
import LoadingComponent from './LoadingComponent';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';

interface GroupsMainAppProps {
    openGroupModal;
    onDeleteGroupClick: () => void;
    readonly?: boolean;
}

const GroupsMainApp: FC<GroupsMainAppProps> = ({ openGroupModal, readonly, onDeleteGroupClick }) => {
    const groupsContext = useContext(GroupsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const rolesOptionSet: EntityMetadataWithOptionSet = useMemo(
        () => ({
            displayName: '',
            optionSet: Array.from(groupsContext.pickLists.groupMemberTypes).reduce(
                (prevValue, [key, value]) => ({ ...prevValue, [key]: { text: value, value: key } }),
                {}
            ),
        }),
        [groupsContext.pickLists.groupMemberTypes]
    );

    const isPrimary = (group: IGroup) => {
        const mainMember = group.members.find(m => m.customer.id === groupsContext.mainCustomer.id);
        return mainMember?.IsPrimaryGroup || false;
    };

    const callsToAction = useMemo(() => {
        return [{ title: translate('CREATE_GROUP'), callback: () => openGroupModal(null, 0), disabled: readonly }];
    }, [openGroupModal, readonly, translate]);

    const renderMainWindowComponent = () => {
        if (groupsContext.loadingState.isLoading) {
            return <LoadingComponent msg={groupsContext.loadingState.msg} />;
        }

        if (groupsContext.groups.length > 0) {
            return (
                <GroupMainDetails
                    group={groupsContext.selectedGroup}
                    rolesOptionSet={rolesOptionSet}
                    isPrimary={isPrimary(groupsContext.selectedGroup)}
                    onEditIconClick={openGroupModal}
                    onDeleteGroupClick={onDeleteGroupClick}
                    readonly={readonly}
                />
            );
        }
        return <EmptyState icon={IMAGE_SRC.create} iconSize={200} title={translate('GROUPS_CARD_EMPTY_STATE')} callsToAction={callsToAction} />;
    };

    return <>{renderMainWindowComponent()}</>;
};
export default GroupsMainApp;
