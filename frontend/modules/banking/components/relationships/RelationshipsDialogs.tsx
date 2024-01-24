import React from 'react';
import AsyncOperationsDialog from '../../components/groups/AsyncOperationsDialog';
import { IRelationship } from '../../interfaces/Relationships/IRelationship';
import { COLORS } from '@fsi/core-components/dist/constants';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Theme';
import EditRelationshipDialog from './EditRelationshipDialog/EditRelationshipDialog';

interface RelationshipsDialogsProps {
    dialogData: { isDeleting: boolean; isLoading: boolean; header: string; msg: string };
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    clickedRelationship: Partial<IRelationship> | undefined;
    setClickedRelationship: React.Dispatch<React.SetStateAction<Partial<IRelationship> | undefined>>;
    saveRelationship: (relationship: any) => Promise<void>;
    deleteRelationship: (id: string) => Promise<void>;
}

export const relationshipHeaderTextStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size32, color: COLORS.primaryTagText } };

export const RelationshipsDialogs: React.FC<RelationshipsDialogsProps> = props => {
    const {
        setIsModalOpen,
        isModalOpen,
        dialogData,
        saveRelationship,
        deleteRelationship,
        isDialogOpen,
        setIsDialogOpen,
        clickedRelationship,
        setClickedRelationship,
    } = props;

    const dismissModal = () => {
        setIsModalOpen(false);
        setClickedRelationship(undefined);
    };
    const dismissDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <EditRelationshipDialog
                onDialogDismiss={dismissModal}
                visible={isModalOpen}
                initialValue={clickedRelationship}
                saveRelationship={saveRelationship}
                clickedRelationship={clickedRelationship}
                setClickedRelationship={setClickedRelationship}
            />
            <AsyncOperationsDialog
                isOpen={isDialogOpen}
                isLoading={dialogData.isLoading}
                header={dialogData.header}
                text={dialogData.msg}
                onDismiss={dismissDialog}
                onDeleteClick={dialogData.isDeleting ? () => deleteRelationship(/* istanbul ignore next */ clickedRelationship?.id || '') : undefined}
            />
        </>
    );
};
export default RelationshipsDialogs;
