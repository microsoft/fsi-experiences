import React, { FC, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/components/Text/Text';
import {
    documentDetailsBoldTextStyle,
    documentDetailsRexIconStyles,
    documentDetailsSidePanelStyles,
    documentDetailsRegardingEntitiestyles,
    documentDetailsTextStyle,
    documentDetailsTopStyles,
    fieldTypeStyles,
    iconEditStyles,
    labelStyles,
} from './DocumentDetailsTab.style';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import DocumentRecommendation from '../DocumentRecommendation/DocumentRecommendation';
import DocumentPipelineSteps from '../DocumentPipelineSteps/DocumentPipelineSteps';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { DocumentStatus } from '../../interfaces/IDocument';
import DocumentRegarding from '../DocumentRegarding/DocumentRegarding';
import { useDocumentsMetadata } from '../../hooks/useDocumentsMetadata';
import { descriptionFieldTextLimit, DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { DateTime } from '@fsi/core-components/dist/components/atoms/DateTime';
import { EditableText } from '../EditableText/EditableText';
import { isDateValid } from '@fsi/core-components/dist/utilities/TimeUtils';
import { IDocumentDetailsTabProps } from './DocumentDetailsTab.interface';

export const DocumentDetailsTab: FC<IDocumentDetailsTabProps> = ({
    document,
    fetcher,
    showDescription,
    updateDescription,
    hasWriteAccess,
    isErrorLoadingSteps,
    isLoadingStepsResults,
    stepsResults,
    onEditModeChange,
}) => {
    const translate = useTranslation(DI_NAMESPACE);

    const { regarding, pipelineResult, statusDisplayName, modifiedBy, autoUpdated, status, description, uploadedDate } = document;

    const isApprovedOrRejected = status === DocumentStatus.Approved || status === DocumentStatus.Rejected;

    const { metadata } = useDocumentsMetadata(fetcher);
    const [editableTextErrorMessage, setEditableTextErrorMessage] = useState<string | undefined>();
    const showSteps = !!pipelineResult;
    const showRecommendation = !!pipelineResult && (!isApprovedOrRejected || autoUpdated);

    const modifiedByText = autoUpdated ? translate('UPDATED_AUTOMATICALLY') : modifiedBy;

    const onDoneEditingDescription = value => {
        updateDescription(value);
        setEditableTextErrorMessage('');
        onEditModeChange?.(false);
    };

    const onChangeDescriptionField = (event, newValue) => {
        if (newValue.length >= descriptionFieldTextLimit) {
            return setEditableTextErrorMessage(translate('MAX_LENGTH', { length: descriptionFieldTextLimit }));
        }
        setEditableTextErrorMessage('');
    };

    const includeUploadedDate = uploadedDate && isDateValid(uploadedDate);

    return (
        <Stack styles={documentDetailsSidePanelStyles} data-testid="di-details-side-bar">
            <Stack styles={documentDetailsTopStyles}>
                <Stack data-testid="di-details-regarding">
                    <Text styles={documentDetailsTextStyle}>{metadata?.regardingEntityName || translate('DOCUMENT_REGARDING')}</Text>
                    <DocumentRegarding stackStyles={documentDetailsRegardingEntitiestyles} regarding={regarding} />
                </Stack>
                {showDescription && (
                    <Stack data-testid="di-details-description">
                        <EditableText
                            label={translate('DESCRIPTION')}
                            onDoneEditing={onDoneEditingDescription}
                            maxLength={descriptionFieldTextLimit}
                            onChange={onChangeDescriptionField}
                            errorMessage={editableTextErrorMessage}
                            placeholder={translate('BRIEF_DESCRIPTION')}
                            defaultValue={description || ''}
                            readOnly
                            selfEdit={hasWriteAccess}
                            styles={fieldTypeStyles}
                            labelStyles={labelStyles}
                            iconStyles={iconEditStyles}
                            onEditModeChange={onEditModeChange}
                        />
                    </Stack>
                )}
                {includeUploadedDate && (
                    <Stack data-testid="di-details-uploaded-date">
                        <Text styles={documentDetailsTextStyle}>{translate('DOCUMENT_UPLOADED_DATE')}</Text>
                        <DateTime date={uploadedDate} styles={documentDetailsBoldTextStyle} />
                    </Stack>
                )}
                <Stack data-testid="di-details-status">
                    <Text styles={documentDetailsTextStyle}>{translate('DOCUMENT_STATUS')}</Text>
                    <Text styles={documentDetailsBoldTextStyle}>{statusDisplayName}</Text>
                </Stack>
                {isApprovedOrRejected && (
                    <Stack data-testid="di-details-modified-by">
                        <Text styles={documentDetailsTextStyle}>{translate('DOCUMENT_MODIFIED_BY')}</Text>
                        <Text styles={documentDetailsBoldTextStyle}>{modifiedByText}</Text>
                    </Stack>
                )}
            </Stack>

            <Stack data-testid="di-details-pipeline-result">
                {showRecommendation && (
                    <DocumentRecommendation
                        customIconStyles={documentDetailsRexIconStyles}
                        customTextStyles={documentDetailsBoldTextStyle}
                        showDescription
                        autoUpdated={autoUpdated}
                        documentStatus={status}
                        pipelineResult={pipelineResult}
                    />
                )}
                {showSteps && (
                    <>
                        <Separator />
                        <DocumentPipelineSteps isLoading={isLoadingStepsResults} stepResults={stepsResults} isError={isErrorLoadingSteps} />
                    </>
                )}
            </Stack>
        </Stack>
    );
};

export default DocumentDetailsTab;
