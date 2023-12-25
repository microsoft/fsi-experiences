import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { IDocumentDefinition } from '../../interfaces';
import { IDocumentRegarding } from '../../interfaces/IDocumentRegarding';

export interface IDocumentCreationDialogProps {
    regardingEntities: IDocumentRegarding[];
    regardingDisplayName?: string;
    documentDefinitions: IDocumentDefinition[];
    isLoading: boolean;
    isError: boolean;
    isOpen?: boolean;
    onAdd: (params: { regarding: IDocumentRegarding; documentDefinition: IDocumentDefinition; description?: string }) => void;
    onCancel: () => void;
    onDismiss: () => void;
    showDescription?: boolean;
    header: string;
}

export type IRegardingDropdownOption = IDropdownOption<IDocumentRegarding>;

export type IDocumentDefinitionDropdownOption = IDropdownOption<IDocumentDefinition>;
