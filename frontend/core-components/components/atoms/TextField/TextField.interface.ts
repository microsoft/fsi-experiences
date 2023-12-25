import { IStyleFunctionOrObject } from '@fluentui/react';
import { ITextFieldStyleProps, ITextFieldProps as IFluentTextFieldProps, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { FormEvent, ReactElement } from 'react';

export interface ITextFieldProps extends Omit<Partial<IFluentTextFieldProps>, 'onChange'> {
    label: string;
    placeholder: string;
    underlined?: boolean | undefined;
    type?: 'text' | 'email' | 'password' | 'number';
    min?: number;
    max?: number;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    description?: string;
    errorMessage?: string;
    pattern?: string;
    validateOnFocusOut?: boolean;
    validateOnLoad?: boolean;
    styles?: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
    onValidation?: (value: string) => string | ReactElement | PromiseLike<string | ReactElement> | undefined;
    onValidate?: (value: string) => string | ReactElement | PromiseLike<string | ReactElement> | undefined;
    onValidationComplete?: (value: string, isValid: boolean) => void;
    onResult?: (value: string) => void;
    onChange?: (newValue?: string, event?: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    defaultValue?: string;
}
