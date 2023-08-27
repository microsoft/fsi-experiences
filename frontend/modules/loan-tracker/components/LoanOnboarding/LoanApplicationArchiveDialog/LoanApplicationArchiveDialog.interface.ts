export interface ILoanApplicationArchiveDialogProps {
    isOpen: boolean;
    onMoveToArchive: (reason: string, comment?: string) => Promise<void>;
    onCancel: () => void;
    onDismiss: () => void;
}
