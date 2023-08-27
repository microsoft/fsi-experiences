import React, { FC, FormEvent } from 'react';
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import { MaskedTextField } from '@fluentui/react/lib/components/TextField/MaskedTextField/MaskedTextField';
import type { IFormMaskTextFieldProps } from './FormMaskTextField.interface';
import { Controller } from 'react-hook-form';
import { getClassNameStyleSets } from '../../../utilities/GetClassNameStyleSets';
import { baseClassName, defaultErrorStyles, textFieldBaseStyles } from '../../atoms/TextField/TextField.style';
import ScreenReaderText from '../../atoms/ScreenReaderText/ScreenReaderText';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { FormMaskTextFieldStyles } from './FormMaskTextField.style';
import { LabelWithAdditionalInfo } from '../../atoms/LabelWithAdditionalInfo/LabelWithAdditionalInfo';

/* istanbul ignore file */
export const FormMaskTextField: FC<IFormMaskTextFieldProps> = ({
    label,
    name,
    control,
    defaultValue,
    className: customClassNames = 'formMaskTextField',
    ...props
}) => {
    const textFieldClasses = getClassNameStyleSets({
        baseClassName,
        styles: defaultErrorStyles,
        customClassNames,
    });

    return (
        <Controller
            name={name || ''}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <MaskedTextField
                    {...props}
                    label={label}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                        field.onBlur();
                        props.onBlur?.(event as any);
                    }}
                    onChange={(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => {
                        field.onChange(value);
                        props.onChange?.(value as string, event);
                    }}
                    onRenderLabel={textFieldProps =>
                        props.onRenderLabel?.(textFieldProps) || (
                            <LabelWithAdditionalInfo
                                label={textFieldProps?.label || ''}
                                fieldId={textFieldProps?.id || ''}
                                isRequired={textFieldProps?.required}
                            />
                        )
                    }
                    value={field.value}
                    errorMessage={fieldState.error?.message}
                    onGetErrorMessage={(value: string) => {
                        const errorMessage = fieldState.error?.message;
                        return errorMessage ? (
                            <Stack verticalAlign="center" horizontal>
                                <div aria-hidden="true">{errorMessage}</div>
                                <ScreenReaderText
                                    id={`srFormMaskTextFieldErrorMessage_${label?.replace(/\W/g, '')}`}
                                >{`${label} ${errorMessage}`}</ScreenReaderText>
                            </Stack>
                        ) : (
                            ''
                        );
                    }}
                    data-testid={name}
                    required={!!props.rules?.required}
                    componentRef={field.ref}
                    styles={concatStyleSets(textFieldBaseStyles, FormMaskTextFieldStyles, props.styles)}
                    className={textFieldClasses[baseClassName]}
                />
            )}
            rules={props.rules}
            shouldUnregister={props.shouldUnregister}
        />
    );
};

export default FormMaskTextField;
