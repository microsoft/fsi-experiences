import { ControllerProps } from 'react-hook-form';
import { DatePickerProps } from '../../atoms/DatePicker';

export interface IFormDatePickerProps extends Omit<DatePickerProps, 'defaultValue'>, Omit<ControllerProps, 'render'> {}
