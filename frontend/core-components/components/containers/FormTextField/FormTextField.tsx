import React, { FC } from 'react';
import type { IFormTextFieldProps } from './FormTextField.interface';
import { TextField } from '../../atoms/TextField';
import { Controller } from 'react-hook-form';
import { Stack } from '@fluentui/react';
import ScreenReaderText from '../../atoms/ScreenReaderText/ScreenReaderText';
import { LabelWithAdditionalInfo } from '../../atoms/LabelWithAdditionalInfo/LabelWithAdditionalInfo';

export const FormTextField: FC<IFormTextFieldProps> = ({ label, name, placeholder, control, defaultValue, ...props }) => {
    return (
        <Controller
            name={name || ''}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <TextField
                    className={'formTextField'}
                    aria-labelledby={undefined}
                    {...props}
                    label={label}
                    placeholder={placeholder}
                    onRenderLabel={textFieldProps => {
                        return (
                            props.onRenderLabel?.(textFieldProps) || (
                                <LabelWithAdditionalInfo
                                    label={textFieldProps?.label || ''}
                                    fieldId={textFieldProps?.id || ''}
                                    isRequired={textFieldProps?.required}
                                />
                            )
                        );
                    }}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                        field.onBlur();
                        props.onBlur?.(event as any);
                    }}
                    onChange={(value, event) => {
                        field.onChange(value);
                        props.onChange?.(value, event);
                    }}
                    type={props.type}
                    value={field.value}
                    onValidate={(value: string) => {
                        const errorMessage = fieldState.error?.message;
                        return (
                            errorMessage && (
                                <Stack verticalAlign="center" horizontal>
                                    <div aria-hidden="true">{errorMessage}</div>
                                    <ScreenReaderText
                                        id={`srFormTextFieldErrorMessage_${label.replace(/\W/g, '')}`}
                                    >{`${label} ${errorMessage}`}</ScreenReaderText>
                                </Stack>
                            )
                        );
                    }}
                    data-testid={name}
                    required={!!props.rules?.required}
                    componentRef={field.ref}
                />
            )}
            rules={props.rules}
            shouldUnregister={props.shouldUnregister}
        />
    );
};

export default FormTextField;
