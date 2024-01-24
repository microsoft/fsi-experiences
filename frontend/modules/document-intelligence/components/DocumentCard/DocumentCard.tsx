import React, { FC, useCallback } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { DocumentStatus } from '../../interfaces/IDocument';
import {
    documentCardContentTokens,
    documentCardStyles,
    documentHeaderStyles,
    documentHeaderWrapperStyles,
    documentDescriptionStyle,
} from './DocumentCard.style';
import DocumentRecommendation from '../DocumentRecommendation/DocumentRecommendation';
import DocumentCardFooter from '../DocumentCardFooter/DocumentCardFooter';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import { HAS_FILE_CLASS } from './DocumentCard.const';
import DocumentRegarding from '../DocumentRegarding/DocumentRegarding';
import { IDocumentCardProps } from './DocumentCard.interface';

export const DocumentCard: FC<IDocumentCardProps> = ({
    document,
    onDocumentDelete,
    onFileView,
    onUpload,
    disableUpdate,
    disableDelete,
    showDescription,
}) => {
    const { name, regarding, pipelineResult, status, autoUpdated, description } = document;

    const missingFile = status === DocumentStatus.MissingFile;
    const pendingReview = status === DocumentStatus.PendingReview;

    const handleCardClick = useCallback(() => {
        if (!missingFile) {
            onFileView(document);
        }
    }, [document, missingFile, onFileView]);

    const showDescriptionInCard = showDescription && description;

    return (
        <Stack
            as="li"
            tabIndex={0}
            role="listitem"
            styles={documentCardStyles}
            className={missingFile ? '' : HAS_FILE_CLASS}
            onClick={handleCardClick}
            verticalFill
        >
            <Stack.Item shrink={0} styles={documentHeaderWrapperStyles}>
                <OverflowText styles={documentHeaderStyles} text={name} />
                <DocumentRegarding regarding={regarding} />
                {showDescriptionInCard && <OverflowText styles={documentDescriptionStyle} text={description} />}
            </Stack.Item>
            <Stack grow verticalFill tokens={documentCardContentTokens}>
                {pipelineResult && pendingReview && <DocumentRecommendation pipelineResult={pipelineResult} autoUpdated={autoUpdated} />}
            </Stack>
            <DocumentCardFooter
                disableDelete={disableDelete || document.inactive}
                disableUpdate={disableUpdate || document.inactive}
                document={document}
                onDocumentDelete={onDocumentDelete}
                onFileView={onFileView}
                onUpload={onUpload}
            />
        </Stack>
    );
};

export default DocumentCard;
