import React, { FC } from 'react';
import type { IFormDropdownProps } from './FormDropdown.interface';
import { Controller } from 'react-hook-form';
import { Dropdown } from '../..//atoms/Dropdown';
import { LabelWithAdditionalInfo } from '../../atoms/LabelWithAdditionalInfo/LabelWithAdditionalInfo';

export const FormDropdown: FC<IFormDropdownProps> = props => {
    return (
        <Controller
            name={props.name || ''}
            control={props.control}
            defaultValue={props.defaultValue}
            rules={props.rules}
            render={({ field, fieldState }) => (
                <Dropdown
                    className={'formDropdown'}
                    {...props}
                    onRenderLabel={dropDownProps => {
                        return (
                            props.onRenderLabel?.(dropDownProps) || (
                                <LabelWithAdditionalInfo
                                    label={dropDownProps?.label || ''}
                                    id={props.labelId || ''}
                                    fieldId={dropDownProps?.id || ''}
                                    isRequired={dropDownProps?.required}
                                />
                            )
                        );
                    }}
                    selectedKey={props.defaultValue}
                    onChange={(value, event) => {
                        props.onChange?.(value, event);
                        field.onChange(value);
                    }}
                    options={props.options || []}
                    errorMessage={fieldState.error?.message}
                    placeholder={props.placeholder || ''}
                    data-testid={props.name}
                    required={!!props.rules?.required}
                    componentRef={field.ref}
                />
            )}
            shouldUnregister={props.shouldUnregister}
        />
    );
};

export default FormDropdown;
