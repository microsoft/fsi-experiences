import React, { FC } from 'react';
import { namespaces, useTranslation } from '../../../../context/hooks/useTranslation';
import { FieldType, IFieldData, IFieldLayout, IFieldMetadata } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import { PreferredContactMethod } from '../../../../enums/PreferredContactMethod';
import components from '../components';
import Field, { IField } from '../Field/Field';

const getPreferredType = preferredContactMethod => {
    if (preferredContactMethod === PreferredContactMethod.Email) {
        return FieldType.Email;
    }
    if (preferredContactMethod === PreferredContactMethod.Phone) {
        return FieldType.Phone;
    }
    if (preferredContactMethod === PreferredContactMethod.Mail) {
        return FieldType.Address;
    }
};

interface ISectionField {
    fieldData: IFieldData;
    currencyId?: string;
    fieldMetadata: IFieldMetadata;
    type: FieldType;
    preferredContactMethod?: PreferredContactMethod;
    field: IFieldLayout;
}

const SectionField: FC<ISectionField> = ({ field, fieldData, currencyId, fieldMetadata, type, preferredContactMethod }) => {
    const Component: FC<IField> = components[type] || Field;
    const translate = useTranslation(namespaces.CUSTOMER_SNAPSHOT_CONTROL);
    const tags = type === getPreferredType(preferredContactMethod) ? [translate('PREFERRED')] : [];

    return (
        <Component
            currencyId={currencyId}
            fieldLabel={field.label}
            fieldData={fieldData}
            metadata={fieldMetadata}
            hideLabel={field.hideLabel}
            tags={tags}
        />
    );
};

export default SectionField;
