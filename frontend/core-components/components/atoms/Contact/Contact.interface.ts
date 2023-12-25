import { IStyle } from '@fluentui/react/lib/Styling';

export interface IContactProps {
    contactName: string;
    contactId: string;
    clickable?: boolean;
    role?: string;
    entity?: string;
    styles?: IContactStyles;
    overrideOnClick?: () => void;
}

export interface IContactStyles {
    container?: IStyle;
    containerButton?: IStyle;
    icon?: IStyle;
    text?: IStyle;
    role?: IStyle;
    textWrapper?: IStyle;
}
