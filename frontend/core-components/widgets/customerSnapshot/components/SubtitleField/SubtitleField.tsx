import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import { FieldType, IFieldData, IFieldLayout, IFieldMetadata } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import components from '../components';
import Field, { IField } from '../Field/Field';
import { fieldRootStyles } from './SubtitleField.styles';

interface ISubtitleField {
    fieldData: IFieldData;
    currencyId?: string;
    fieldMetadata: IFieldMetadata;
    type: FieldType;
    field: IFieldLayout;
    isInline?: boolean;
}

const SubtitleField: FC<ISubtitleField> = ({ field, fieldData, currencyId, fieldMetadata, type, isInline }) => {
    const Component: FC<IField> = components[type] || Field;

    return (
        <Stack data-testid={`subtitle-field-${field.name}`} styles={fieldRootStyles({ isInline })} horizontal>
            <Component
                horizontal
                currencyId={currencyId}
                fieldLabel={field.label}
                fieldData={fieldData}
                metadata={fieldMetadata}
                hideLabel={field.hideLabel}
            />
            <Stack className="comma-space">,&nbsp;</Stack>
        </Stack>
    );
};

export default SubtitleField;
