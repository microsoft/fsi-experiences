import { DocumentPipelineStatus } from '../../constants/PipelineStatuses.const';
import { IDocumentPipelineStatusMessage } from '../IDocumentInsight';

export const statusMessageApprove: IDocumentPipelineStatusMessage = {
    shortText: 'Recommend approval of the document',
    status: DocumentPipelineStatus.Approved,
    description: 'This document meets the criteria needed for approval.',
};

export const statusMessageReject: IDocumentPipelineStatusMessage = {
    shortText: 'Recommend that you reject the document',
    status: DocumentPipelineStatus.Rejected,
    description: 'We recommend that you reject this document because it doesn’t match all criteria required for approval',
};

export const statusMessageUnclear: IDocumentPipelineStatusMessage = {
    shortText: 'Recommend that you manually verify the document',
    status: DocumentPipelineStatus.Unclear,
    description:
        'This document doesn’t appear to meet some of the criteria required for approval, but may still be correct. Please inspect it and verify its conformity before you approve it.',
};
