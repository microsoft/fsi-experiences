import { renderHook } from '@testing-library/react-hooks';
import { waitFor, act } from '@testing-library/react';
import { stepDefinitionExtract } from '../interfaces/mocks/StepsDefinitions.mock';
import { stepResultSuccessMock } from '../interfaces/mocks/PipelineStepData.mock';
import { useEditableFields, isTheSameValue } from './useEditableFields';
import { IStepFieldDataWithDefinition } from '../interfaces';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';

describe('useEditableFields tests', () => {
    const fields = stepDefinitionExtract.fields.map(field => ({
        ...field,
        ...(stepResultSuccessMock.fields[field.id] || {}),
        originalValue: stepResultSuccessMock.fields[field.id]?.value,
    }));

    const mockStep = {
        ...stepDefinitionExtract,
        ...stepResultSuccessMock,
        fields,
    };

    it('should return the right data format', async () => {
        const { result } = renderHook(() => useEditableFields({ step: mockStep }), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.editableFields).toEqual(
            fields.map((field: IStepFieldDataWithDefinition) => ({
                value: field.value as string,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-0-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );

        expect(result.current.onSave).toBeInstanceOf(Function);
        expect(result.current.onCancel).toBeInstanceOf(Function);
        expect(result.current.onReset).toBeInstanceOf(Function);
    });

    it('should not return labelTagProps if confidence is not defined', async () => {
        const fieldsWithoutConfidence = fields.map(field => ({ ...field, confidence: undefined }));

        const { result } = renderHook(() => useEditableFields({ step: { ...mockStep, fields: fieldsWithoutConfidence } }), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.editableFields).toEqual(
            fieldsWithoutConfidence.map((field: IStepFieldDataWithDefinition) => ({
                value: field.value as string,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: undefined,
                onChange: expect.any(Function),
                key: `reset-0-field-${field.id}-edit-false`,
            }))
        );
    });

    it('should return default value if value is not defined', async () => {
        const fieldsWithoutValue = fields.map(field => ({ ...field, value: '', originalValue: '' }));

        const { result } = renderHook(() => useEditableFields({ step: { ...mockStep, fields: fieldsWithoutValue } }), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.editableFields).toEqual(
            fieldsWithoutValue.map((field: IStepFieldDataWithDefinition) => ({
                value: '',
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-0-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );
    });

    it('should call onUpdate', async () => {
        const onUpdate = jest.fn();

        const { result } = renderHook(() => useEditableFields({ step: mockStep, onUpdateFields: onUpdate }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.onSave();
        });

        await waitFor(() => {
            expect(onUpdate).toHaveBeenCalled();
        });
    });

    it('should trigger reset', async () => {
        const onUpdate = jest.fn();

        const { result } = renderHook(() => useEditableFields({ step: mockStep, onUpdateFields: onUpdate }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.onReset();
        });

        expect(result.current.editableFields).toEqual(
            fields.map((field: IStepFieldDataWithDefinition) => ({
                value: field.originalValue,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-1-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );
    });

    it('should trigger cancel and reset counter', async () => {
        const { result } = renderHook(() => useEditableFields({ step: mockStep }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.onReset();
        });

        expect(result.current.editableFields).toEqual(
            fields.map((field: IStepFieldDataWithDefinition) => ({
                value: field.originalValue,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-1-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );

        act(() => {
            result.current.onCancel();
        });

        expect(result.current.editableFields).toEqual(
            fields.map((field: IStepFieldDataWithDefinition) => ({
                value: field.value,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-0-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );
    });

    it('should display with right label when both values are the same', () => {
        const fieldsWithSameValues = fields.map(field => ({ ...field, value: field.originalValue }));
        const { result } = renderHook(() => useEditableFields({ step: { ...mockStep, fields: fieldsWithSameValues } }), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.editableFields).toEqual(
            fieldsWithSameValues.map((field: IStepFieldDataWithDefinition) => ({
                value: field.value,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-0-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );
    });

    it('should display with right label when values are different', () => {
        const fieldsWithDifferentValues = fields.map(field => ({ ...field, value: 'different value' }));
        const { result } = renderHook(() => useEditableFields({ step: { ...mockStep, fields: fieldsWithDifferentValues } }), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.editableFields).toEqual(
            fieldsWithDifferentValues.map((field: IStepFieldDataWithDefinition) => ({
                value: field.value,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: 'Edited',
                },
                key: `reset-0-field-${field.id}-edit-false`,
                onChange: expect.any(Function),
            }))
        );
    });

    it('should display fields with editMode on', () => {
        const { result } = renderHook(() => useEditableFields({ step: mockStep, isEditMode: true }), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.editableFields).toEqual(
            fields.map((field: IStepFieldDataWithDefinition) => ({
                value: field.value as string,
                displayName: field.displayName,
                id: field.id,
                required: field.required,
                labelTagProps: {
                    text: `${(field.confidence as number) * 100}% confidence`,
                },
                key: `reset-0-field-${field.id}-edit-true`,
                onChange: expect.any(Function),
            }))
        );
    });
});

describe('isTheSameValue', () => {
    it('should return true if both values are undefined', () => {
        expect(isTheSameValue(undefined, undefined)).toBeTruthy();
    });

    it('should return true if both values are the same', () => {
        expect(isTheSameValue('test', 'test')).toBeTruthy();
    });

    it('should return false if both values are different', () => {
        expect(isTheSameValue('test', 'test2')).toBeFalsy();
    });

    it('should return false if one value is undefined', () => {
        expect(isTheSameValue('test', undefined)).toBeFalsy();
    });

    it('should return false if one value is null', () => {
        expect(isTheSameValue('test', null)).toBeFalsy();
    });

    it('should return false if one value is an empty string', () => {
        expect(isTheSameValue('', 'test')).toBeFalsy();
    });

    it('should return true for same value different types', () => {
        expect(isTheSameValue('1', 1)).toBeTruthy();
    });
});
