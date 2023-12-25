import { DocumentStatus } from '../interfaces/IDocument';

export const DocumentSectionKeys = ['FOR_REVIEW', 'ACTION_REQUIRED', 'APPROVED'] as const;

export type DocumentSectionKey = typeof DocumentSectionKeys[number];

export const StatusToSectionMapping: { [key: number]: DocumentSectionKey } = {
    [DocumentStatus.PendingReview]: 'FOR_REVIEW',
    [DocumentStatus.MissingFile]: 'ACTION_REQUIRED',
    [DocumentStatus.Rejected]: 'ACTION_REQUIRED',
    [DocumentStatus.Approved]: 'APPROVED',
};

export const DOCUMENT_INTL_CLASS_PREFIX = 'document-intelligence-';

export const DEFAULT_MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
export const DOC_STATUS_UPDATE_NOTIFICATION_TIMEOUT = 3000;

export const DI_NAMESPACE = 'documentIntelligence';
export const descriptionFieldTextLimit = 25;

export const DOCUMENT_INTELLIGENCE_FLAGS = {
    SHOW_DESCRIPTION: 'showDescription',
    SHOW_REVIEW_STATUS_PRIMARY_TAB: 'showReviewStatusAsPrimaryTab',
};

export const DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS = {
    [DOCUMENT_INTELLIGENCE_FLAGS.SHOW_DESCRIPTION]: false,
    [DOCUMENT_INTELLIGENCE_FLAGS.SHOW_REVIEW_STATUS_PRIMARY_TAB]: true,
};

export const REFETCH_DOCUMENT_INTERVAL = 1000 * 30;
export const REFETCH_FETCH_INTERVAL = 1000 * 5;
export const DELAY_DOC_RESET_QUERY = 1000 * 5;
