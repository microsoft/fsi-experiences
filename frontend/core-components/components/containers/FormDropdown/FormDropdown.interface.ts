import { ControllerProps } from 'react-hook-form';
import { IDropdownProps } from '../../atoms/Dropdown';

export interface IFormDropdownProps extends Omit<Partial<IDropdownProps>, 'defaultValue'>, Omit<Partial<ControllerProps>, 'render'> {
    labelId?: string;
}
