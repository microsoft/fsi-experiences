import { IDatePickerProps } from '@fluentui/react/lib/components/DatePicker/DatePicker.types';
export interface DatePickerProps extends IDatePickerProps {
    onSelectedDate: (date: Date | null | undefined) => void;
    selectedDate?: Date;
    placeholder?: string;
    maxDate?: Date;
    minDate?: Date;
    label?: string;
    className?: string;
    underlined?: boolean;
    labelId?: string;
    descriptionId?: string;
    customDateFormatting?: {
        shortDatePattern?: string;
    };
    outOfBoundCustomMessage?: string;
}
