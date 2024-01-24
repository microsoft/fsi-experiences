export interface IArchiveApplicationDialogProps {
    isOpen: boolean;
    onMoveToArchive: (reason: string, comment?: string) => Promise<void>;
    onCancel: () => void;
    onDismiss: () => void;
    archiveReasons: { [key: string]: string };
    itemName?: string;
}
