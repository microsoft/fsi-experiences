import { TagProps } from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import { ITextFieldProps as IFluentTextFieldProps } from '@fluentui/react/lib/TextField';
import { IIconStyles, ILabelStyles } from '@fluentui/react';
import { ILabelProps } from '@fluentui/react/lib/Label';

export interface EditableTextProps extends IFluentTextFieldProps {
    selfEdit?: boolean;
    readOnly?: boolean;
    onDoneEditing?: (value: string) => void;
    labelTagProps?: TagProps;
    labelStyles?: ILabelStyles;
    iconStyles?: IIconStyles;
    onEditModeChange?: (mode: boolean) => void;
}

export interface LabelWithEditAndTagProps extends ILabelProps {
    text: string;
    editMode?: boolean;
    withEditButton?: boolean;
    onEditClick?: () => void;
    required?: boolean;
    inputId: string;
    tagProps?: TagProps;
    iconStyles?: IIconStyles;
}
