import { IButtonProps, IComboBox, IComboBoxOption, IComboBoxStyles, IIconProps, IRefObject } from '@fluentui/react';
import { FormEvent } from 'react';

export interface IComboBoxProps {
    options: IComboBoxOption[];
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    underlined?: boolean;
    allowFreeform?: boolean;
    autoComplete?: boolean;
    multiSelect?: boolean;
    buttonIconProps?: IIconProps;
    componentRef?: IRefObject<IComboBox>;
    dropdownMaxWidth?: number;
    dropdownWidth?: number;
    iconButtonProps?: IButtonProps;
    onItemClick?: (event: FormEvent<IComboBox>, item?: IComboBoxOption, index?: number) => void;
    onChange?: (option: IComboBoxOption, event: FormEvent<IComboBox>) => void;
    styles?: IComboBoxStyles;
    selectedKey?: string;
}
