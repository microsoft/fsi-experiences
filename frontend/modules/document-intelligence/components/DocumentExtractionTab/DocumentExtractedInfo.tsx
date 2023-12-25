import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useLocale } from '@fsi/core-components/dist/context/hooks/useLocale';
import React, { FC, useMemo, useState } from 'react';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { IStepResultWithDefinition } from '../../interfaces/IDocumentInsight';
import { CollectionsMap, StepHeadersByTypes } from '../../constants/StepHeadersByTypes.const';
import { useEditableFields } from '../../hooks/useEditableFields';
import { EditableInfoSection } from '../EditableInfoSection/EditableInfoSection';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';
import { SectionHeaderProps } from '../EditableInfoSection/EditableInfoSection.interface';
import { StepTypes } from '../../constants/StepTypes.const';
import { loadingStyles } from './DocumentExtractionTab.style';
import { IDocumentExtractedInfoProps } from './DocumentExtractionTab.interface';

export const useStepHeader = (step?: IStepResultWithDefinition): SectionHeaderProps => {
    const t = useTranslation(DI_NAMESPACE);
    const locale = useLocale();
    const headerProps = StepHeadersByTypes[step?.type as number];

    const subHeader = useMemo(() => {
        const someFieldValue = step?.fields?.some(field => field.originalValue || field.originalValue === 0);
        const collection =
            someFieldValue && step?.collection && step?.collectionConfidence
                ? {
                      title: CollectionsMap[step.collection] ? t(CollectionsMap[step.collection]) : step.collection,
                      tagText: t('STEP_OUTPUT_CONFIDENCE', {
                          percent: formatNumber(step.collectionConfidence, locale, false, { style: 'percent' }),
                      }),
                  }
                : undefined;

        return (
            collection && {
                ...collection,
                hoverTitle: t(headerProps?.subHeader?.hoverTitle),
            }
        );
    }, [headerProps, locale, step, t]);

    const stepHeader = useMemo(() => {
        if (!headerProps) {
            return {
                title: '',
                infoCallout: {
                    content: '',
                    ariaLabel: '',
                },
            };
        }

        const Content = headerProps.infoCallout.content;

        return {
            title: t(headerProps.title),
            infoCallout: {
                content: (
                    <Content
                        step={step}
                        description={t(headerProps.infoCallout.description)}
                        linkInfoLabel={t(headerProps.infoCallout.linkInfoLabel)}
                        prefixLinkInfoLabel={t(headerProps.infoCallout.prefixLinkInfoLabel)}
                    />
                ),
                ariaLabel: t(headerProps.infoCallout.ariaLabel),
            },
        };
    }, [headerProps, step, t]);

    return {
        ...stepHeader,
        subHeader,
    };
};

export const DocumentExtractedInfo: FC<IDocumentExtractedInfoProps> = ({
    extractedStep,
    enrichmentStep,
    onSave,
    onEditModeChange,
    isLoadingResults,
    isSavingStepFields,
    editFieldsDisabled,
}) => {
    const t = useTranslation(DI_NAMESPACE);
    const commonTranslate = useTranslation();
    const extractedStepHeader = useStepHeader(extractedStep);
    const enrichmentStepHeader = useStepHeader(enrichmentStep);

    const [isInExtractEditMode, setIsInExtractEditMode] = useState<boolean>(false);
    const [isInEnrichmentEditMode, setIsInEnrichmentEditMode] = useState<boolean>(false);
    const [focusEditBtn, setFocusEditBtn] = useState<number>();

    const toggleExtractEditMode = (newMode: boolean) => {
        setIsInExtractEditMode(newMode);
        onEditModeChange?.(newMode || isInEnrichmentEditMode);
        if (!newMode) setFocusEditBtn(StepTypes.Extraction);
    };

    const toggleEnrichmentEditMode = (newMode: boolean) => {
        setIsInEnrichmentEditMode(newMode);
        onEditModeChange?.(newMode || isInExtractEditMode);
        if (!newMode) setFocusEditBtn(StepTypes.Enrichment);
    };

    const {
        editableFields: extractedFields,
        onSave: onSaveExtractFields,
        onReset: onResetExtractFields,
        onCancel: onCancelExtractFields,
    } = useEditableFields({
        step: extractedStep,
        onUpdateFields: onSave,
        isEditMode: isInExtractEditMode,
    });
    const {
        editableFields: enrichmentFields,
        onSave: onSaveEnrichmentFields,
        onReset: onResetEnrichmentFields,
        onCancel: onCancelEnrichmentFields,
    } = useEditableFields({
        step: enrichmentStep || ({ fields: [] } as any),
        onUpdateFields: onSave,
        isEditMode: isInEnrichmentEditMode,
    });

    const loadingLabel = isLoadingResults ? commonTranslate('LOADING') : t('DOCUMENT_EXTRACTED_TAB_UPDATING');

    return isLoadingResults || isSavingStepFields ? (
        <Loading label={loadingLabel} styles={loadingStyles} />
    ) : (
        <>
            <EditableInfoSection
                header={extractedStepHeader}
                toggleEditMode={toggleExtractEditMode}
                fields={extractedFields}
                editMode={isInExtractEditMode}
                onSave={onSaveExtractFields}
                sectionId="msfsi-di-extracted-info"
                onCancel={onCancelExtractFields}
                onReset={onResetExtractFields}
                needFocusOnEditBtn={focusEditBtn === StepTypes.Extraction}
                editFieldsDisabled={editFieldsDisabled}
            />
            {enrichmentStep?.fields?.length && (
                <EditableInfoSection
                    header={enrichmentStepHeader}
                    toggleEditMode={toggleEnrichmentEditMode}
                    fields={enrichmentFields}
                    editMode={isInEnrichmentEditMode}
                    onSave={onSaveEnrichmentFields}
                    sectionId="msfsi-di-enrichment-info"
                    onCancel={onCancelEnrichmentFields}
                    onReset={onResetEnrichmentFields}
                    needFocusOnEditBtn={focusEditBtn === StepTypes.Enrichment}
                    editFieldsDisabled={editFieldsDisabled}
                />
            )}
        </>
    );
};
