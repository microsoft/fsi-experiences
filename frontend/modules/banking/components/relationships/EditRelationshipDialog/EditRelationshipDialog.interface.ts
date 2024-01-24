import React from 'react';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';

export interface EditRelationshipDialogProps {
    onDialogDismiss: () => void;
    visible: boolean;
    initialValue?: Partial<IRelationship>;
    saveRelationship: (relationship: any) => Promise<void>;
    clickedRelationship: Partial<IRelationship> | undefined;
    setClickedRelationship: React.Dispatch<React.SetStateAction<Partial<IRelationship> | undefined>>;
}
