import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { IIconProps } from '@fluentui/react/lib/components/Icon';

export interface IFileUploadFieldProps {
    id: string;
    onUpload: (file: File) => void;
    disabled?: boolean;
    iconProps?: IIconProps;
    styles?: IButtonStyles;
    className?: string;
    supportedFileFormats?: string[];
    stopClickPropagation?: boolean;
    primary?: boolean;
}
