import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const MISSING_FILE_OPTION_NAME = 'Missing File';
export const PENDING_FILE_OPTION_NAME = 'Pending Review';

export const DOCUMENT_STATUSES_TYPES = {
    [MISSING_FILE_OPTION_NAME]: 104800000,
    [PENDING_FILE_OPTION_NAME]: 104800001,
    Approved: 104800003,
    Rejected: 104800004,
};

export const DocumentStatusesIcons = {
    [DOCUMENT_STATUSES_TYPES.Rejected]: { icon: 'Blocked2Solid', color: COLORS.red },
    [DOCUMENT_STATUSES_TYPES.Approved]: { icon: 'CompletedSolid', color: COLORS.successIcon },
    [DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]]: { icon: 'UnknownSolid', color: COLORS.documentMissingIcon },
    [DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME]]: { icon: 'Page', color: COLORS.documentPendingIcon },
};

export const DocumentsStatusChangeQuery = 'loan-documents-progress-status-changes';

export const DocumentsFileFormats = ['pdf', 'jpg', 'jpeg', 'png'];

export const DocumentsSmallScreenSize = '460px';
export const DocumentsBigScreenSize = '960px';
