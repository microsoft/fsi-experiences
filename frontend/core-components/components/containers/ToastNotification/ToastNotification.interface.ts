import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStyle } from '@fluentui/react/lib/Styling';

export interface IToastNotificationProps {
    isOpen: boolean;
    onClose: () => void;
    disappearTime?: number;
    messageBarIconProps?: IIconProps;
    styles?: IStyle;
}
