import { Stack } from '@fluentui/react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React, { FC, ReactElement, useMemo } from 'react';
import { DI_NAMESPACE, DOCUMENT_INTELLIGENCE_FLAGS } from '../../constants/DocumentIntelligence.const';
import { IStepResultWithDefinition } from '../../interfaces';
import { DocumentStatus } from '../../interfaces/IDocument';
import DocumentDetailsTab from '../DocumentDetailsTab/DocumentDetailsTab';
import { DocumentExtractionTab } from '../DocumentExtractionTab/DocumentExtractionTab';
import { detailsContainerStyles, pivotContainerClassname, pivotContainerStyles } from './DocumentDetailsPane.style';
import { IDocumentDetailsPaneProps } from './DocumentDetailsPane.interface';

const detailsItemKey = 'msfsi-di-document-details-tab';
const extractionItemKey = 'msfsi-di-document-extracted-info-tab';

export const swapTwoFirstTabs = (pivotTabs: ReactElement[]): ReactElement[] => {
    [pivotTabs[0], pivotTabs[1]] = [pivotTabs[1], pivotTabs[0]];
    return pivotTabs;
};

export const DocumentDetailsPane: FC<IDocumentDetailsPaneProps> = ({
    document,
    fetcher,
    showDescription,
    updateDescription,
    onEditModeChange,
    hasWriteAccess,
    extractedStep,
    enrichmentStep,
    pipelineSteps,
    isErrorLoadingResults,
    isLoadingResults,
    isErrorLoadingSteps,
    onSaveStepFields,
    isSavingStepFields,
}) => {
    const t = useTranslation(DI_NAMESPACE);
    const showReviewStatusAsPrimaryTab = useIsFeatureEnabled(DOCUMENT_INTELLIGENCE_FLAGS.SHOW_REVIEW_STATUS_PRIMARY_TAB);
    const missingFile = document.status === DocumentStatus.MissingFile;
    const editFieldsDisabled = useMemo(
        () => !hasWriteAccess || document.inactive || document.status === DocumentStatus.Approved || document.status === DocumentStatus.Rejected,
        [document.inactive, document.status, hasWriteAccess]
    );

    const renderReviewDetails = () => {
        return (
            <DocumentDetailsTab
                document={document}
                fetcher={fetcher}
                showDescription={showDescription}
                updateDescription={updateDescription}
                hasWriteAccess={hasWriteAccess}
                stepsResults={pipelineSteps}
                isErrorLoadingSteps={isErrorLoadingSteps}
                isLoadingStepsResults={isLoadingResults}
                onEditModeChange={onEditModeChange}
            />
        );
    };
    const renderPivotReviewTab = () => {
        return (
            <PivotItem
                headerText={t('DOCUMENT_REVIEW_TAB_TITLE')}
                data-testid={detailsItemKey}
                key={detailsItemKey}
                itemKey={detailsItemKey}
                className="msfsi-di-document-details-container"
            >
                {renderReviewDetails()}
            </PivotItem>
        );
    };

    const renderPivotExtractedDetails = () => {
        return (
            <PivotItem
                headerText={t('DOCUMENT_EXTRACTED_TAB_TITLE')}
                data-testid={extractionItemKey}
                key={extractionItemKey}
                className="msfsi-di-extracted-info-container"
                headerButtonProps={{
                    disabled: missingFile,
                }}
                itemKey={extractionItemKey}
            >
                <DocumentExtractionTab
                    extractedStep={extractedStep as IStepResultWithDefinition}
                    enrichmentStep={enrichmentStep}
                    onSave={onSaveStepFields}
                    onEditModeChange={onEditModeChange}
                    isErrorLoadingResults={isErrorLoadingResults}
                    isLoadingResults={isLoadingResults}
                    isSavingStepFields={isSavingStepFields}
                    editFieldsDisabled={editFieldsDisabled}
                />
            </PivotItem>
        );
    };

    const tabs = [renderPivotReviewTab(), renderPivotExtractedDetails()];
    const pivotItems = showReviewStatusAsPrimaryTab ? tabs : swapTwoFirstTabs(tabs);

    if (extractedStep && document.pipelineResult) {
        return (
            <Pivot
                aria-label={t('DOCUMENT_DETAILS_PANE_ARIA_LABEL')}
                styles={pivotContainerStyles as any}
                overflowBehavior="menu"
                data-testid="msfsi-di-document-details-pane"
                className={pivotContainerClassname}
                defaultSelectedKey={missingFile ? detailsItemKey : ''}
                onLinkClick={() => {
                    onEditModeChange?.(false);
                }}
            >
                {pivotItems}
            </Pivot>
        );
    }

    return (
        <Stack data-testid="msfsi-di-document-details-single" styles={detailsContainerStyles}>
            {renderReviewDetails()}
        </Stack>
    );
};
