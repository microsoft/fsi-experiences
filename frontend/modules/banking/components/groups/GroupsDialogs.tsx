import React, { useContext } from 'react';
import { GroupsContext } from './contexts/GroupsContext';
import AsyncOperationsDialog from './AsyncOperationsDialog';
import GroupsWizard from './GroupsWizard';

interface GroupsDialogsProps {
    setModalData;
    modalData;
    isDialogOpen;
    dialogData;
    saveGroup;
    deleteGroup;
    closeDialog;
}
const GroupsDialogs: React.FC<GroupsDialogsProps> = props => {
    const groupsContext = useContext(GroupsContext);
    const { setModalData, modalData, isDialogOpen, dialogData, saveGroup, deleteGroup, closeDialog } = props;

    const closeGroupModal = () => setModalData({ isOpen: false, group: groupsContext.selectedGroup, step: 0 });

    return (
        <>
            <AsyncOperationsDialog
                isOpen={isDialogOpen}
                isLoading={dialogData.isLoading}
                header={dialogData.header}
                text={dialogData.msg}
                onDismiss={closeDialog}
                onDeleteClick={dialogData.isDeleting ? () => deleteGroup(groupsContext.selectedGroup) : undefined}
            />
            {modalData.isOpen && (
                <GroupsWizard
                    key={modalData.group.id}
                    data={modalData.group}
                    stepToBeOpened={modalData.step}
                    onCancelClicked={closeGroupModal}
                    onSaveClicked={saveGroup}
                />
            )}
        </>
    );
};
export default GroupsDialogs;
