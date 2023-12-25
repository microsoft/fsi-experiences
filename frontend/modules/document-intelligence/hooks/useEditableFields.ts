import { useLocale } from '@fsi/core-components/dist/context/hooks/useLocale';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';
import { useCallback, useMemo, useState } from 'react';
import { IDocumentFieldProps } from '../components/EditableInfoSection/EditableFields';
import { DI_NAMESPACE } from '../constants/DocumentIntelligence.const';
import { IStepFieldDataWithDefinition, IStepResultWithDefinition } from '../interfaces/IDocumentInsight';
import { UpdateStepFieldDataProps } from '../interfaces/IDocumentsFetcher';

export type UpdateStepFieldsFuncType = ({ stepResultId, fieldsToUpdate, stepOutput }: UpdateStepFieldDataProps) => Promise<boolean>;

type UseEditableFieldsHookProps = {
    step: IStepResultWithDefinition;
    onUpdateFields?: UpdateStepFieldsFuncType;
    isEditMode?: boolean;
};

export const isTheSameValue = (value, originalValue) => (!originalValue && !value) || value?.toString() === originalValue?.toString();
const LABELS = { EDITED: 'STEP_OUTPUT_CONFIDENCE_EDITED', NORMAL: 'STEP_OUTPUT_CONFIDENCE' } as const;

export const getLabelTagProps = ({
    field,
    resetCount,
    t,
    locale,
}: {
    field: IStepFieldDataWithDefinition;
    resetCount: number;
    t: TranslationFunction;
    locale: string;
}) => {
    if (!isTheSameValue(field.value, field.originalValue) && resetCount === 0) {
        return {
            text: t(LABELS.EDITED),
        };
    }

    if (field.confidence === 0 || field.confidence) {
        return {
            text: t(LABELS.NORMAL, {
                percent: formatNumber(field.confidence, locale, false, { style: 'percent' }),
            }),
        };
    }

    return undefined;
};

export const useEditableFields = ({ step, onUpdateFields, isEditMode = false }: UseEditableFieldsHookProps) => {
    const t = useTranslation(DI_NAMESPACE);
    const locale = useLocale();
    const [editedFields, setEditedFields] = useState<{ [fieldId: string]: string | number }>({});
    const [resetCount, setResetCount] = useState(0);
    const { fields } = step;

    const onChangeHandler = useCallback(
        (fieldId, newValue) =>
            setEditedFields(prevEditedFields => ({
                ...prevEditedFields,
                [fieldId]: newValue || '',
            })),
        [setEditedFields]
    );

    const editableFields: IDocumentFieldProps[] = useMemo(
        () =>
            fields.map((field: IStepFieldDataWithDefinition) => ({
                value: resetCount > 0 ? (field.originalValue as string) : (field.value as string),
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                readOnly: field.readOnly,
                labelTagProps: getLabelTagProps({ field, resetCount, t, locale }),
                key: `reset-${resetCount}-field-${field.id}-edit-${isEditMode}`,
                onChange: (_, value?: string) => {
                    onChangeHandler(field.id, value);
                },
            })),
        [fields, resetCount, t, locale, onChangeHandler, isEditMode]
    );

    const onSaveHandler = useCallback(async () => {
        await onUpdateFields?.({ stepResultId: step.resultId, stepOutput: step.output, fieldsToUpdate: editedFields });

        setResetCount(0);
        setEditedFields({});
    }, [onUpdateFields, step, editedFields]);

    const onReset = useCallback(() => {
        setResetCount(resetCount + 1);
        const edited = fields.reduce(
            (acc, field: IStepFieldDataWithDefinition) => ({
                ...acc,
                [field.id]: field.originalValue,
            }),
            {}
        );
        setEditedFields(edited);
    }, [resetCount, fields]);

    const onCancel = useCallback(() => {
        setResetCount(0);
        setEditedFields({});
    }, []);

    return {
        editableFields,
        onSave: onSaveHandler,
        onCancel,
        onReset,
    };
};
