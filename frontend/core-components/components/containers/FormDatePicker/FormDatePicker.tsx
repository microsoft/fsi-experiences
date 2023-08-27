import React, { FC } from 'react';
import type { IFormDatePickerProps } from './FormDatePicker.interface';
import { Controller } from 'react-hook-form';
import { DatePicker } from '../../atoms/DatePicker';

export const FormDatePicker: FC<IFormDatePickerProps> = props => {
    return (
        <Controller
            name={props.name || ''}
            defaultValue={props.defaultValue}
            rules={props.rules}
            render={({ field, fieldState }) => {
                return (
                    <DatePicker
                        {...props}
                        label={props.label}
                        ariaLabel={props.label}
                        data-testid={props.name}
                        selectedDate={field.value}
                        underlined
                        onSelectedDate={(date?: Date | null) => {
                            field.onChange(date);
                            props.onSelectedDate(date);
                        }}
                        textField={{ errorMessage: fieldState.error?.message }}
                        componentRef={field.ref}
                    />
                );
            }}
            shouldUnregister={props.shouldUnregister}
        />
    );
};

export default FormDatePicker;
