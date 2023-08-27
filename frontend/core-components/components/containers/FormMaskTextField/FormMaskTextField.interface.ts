import { ControllerProps } from 'react-hook-form';
import { IMaskedTextFieldProps } from '@fluentui/react/lib/TextField';
import { ITextFieldProps } from '../../atoms/TextField';

export interface IFormMaskTextFieldProps
    extends Omit<IMaskedTextFieldProps, 'defaultValue' | 'onChange'>,
        Omit<ControllerProps, 'name' | 'render'>,
        Pick<ITextFieldProps, 'onChange'> {}
