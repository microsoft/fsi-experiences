import React from 'react';
import {
    IDropdownOption,
    IDropdownProps as IFluentDropdownProps,
    IDropdownStyleProps,
    IDropdownStyles,
    IStyleFunctionOrObject,
} from '@fluentui/react';

export interface IDropdownProps extends Omit<Partial<IFluentDropdownProps>, 'onChange'> {
    options: IDropdownOption[];
    label?: string;
    placeholder: string;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    underlined?: boolean | undefined;
    styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
    onChange: (item: IDropdownOption, e: React.FormEvent<HTMLDivElement>) => void;
    selectedKey?: string;
}
