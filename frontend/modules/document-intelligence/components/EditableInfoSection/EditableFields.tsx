import { TagProps } from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import React, { FC, FormEvent, useMemo } from 'react';
import { EditableText } from '../EditableText/EditableText';
import { mergeStyles } from '@fluentui/react/lib/Styling';

export interface IDocumentFieldProps {
    value: string;
    placeholder?: string;
    displayName: string;
    labelTagProps?: TagProps;
    onChange?: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => void;
    required?: boolean;
    readOnly?: boolean;
    id: string;
    key?: string;
}

export interface EditableFieldsProps {
    fields: IDocumentFieldProps[];
    editMode?: boolean;
    id?: string;
}

const MemorizedEditableText = React.memo(EditableText);

export const EditableFields: FC<EditableFieldsProps> = ({ fields, editMode, id }) => {
    const Fields = useMemo(
        () =>
            fields.map(field => {
                return (
                    <MemorizedEditableText
                        defaultValue={field.value}
                        placeholder={field.placeholder}
                        label={field.displayName}
                        readOnly={!editMode}
                        required={field.required}
                        labelTagProps={field.labelTagProps}
                        onChange={field.onChange}
                        key={field.key || field.id}
                        disabled={editMode && field.readOnly}
                    />
                );
            }),
        [fields, editMode]
    );

    return (
        <fieldset disabled={!editMode} className={mergeStyles({ border: 'none', padding: '0', margin: '0' })} id={id} data-testid={`${id}-controls`}>
            {Fields}
        </fieldset>
    );
};
