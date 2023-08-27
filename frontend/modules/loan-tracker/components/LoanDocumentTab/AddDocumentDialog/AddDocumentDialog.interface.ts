import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { IApplicant } from '../../../interfaces/ILoanApplicant/ILoanApplicant';
import { ICustomDocument } from '../../../interfaces/ILoanDocument/ILoanDocument';

export interface IAddDocumentDialogProps {
    applicants: IApplicant[];
    customDocuments: ICustomDocument[];
    isOpen?: boolean;
    title?: string;
    addButtonText?: string;
    onAdd: (applicant: IApplicant, customDocument: ICustomDocument) => void;
    onCancel: () => void;
    onDismiss: () => void;
}

export interface ICustomDropdownOption extends IDropdownOption {
    name: string;
}
