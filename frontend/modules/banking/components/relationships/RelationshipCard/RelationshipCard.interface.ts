import React from 'react';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';

export interface IRelationhipCardProps {
    relationships: Array<IRelationship>;
    isSelected: boolean;
    onSelected: () => void;
    onAddRelationship: React.Dispatch<React.SetStateAction<boolean>>;
    readonly?: boolean;
}
