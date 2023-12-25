import { ControllerProps } from 'react-hook-form';
import { ITextFieldProps } from '../../atoms/TextField';

export interface IFormTextFieldProps extends Omit<ITextFieldProps, 'defaultValue'>, Omit<ControllerProps, 'render' | 'name'> {}
