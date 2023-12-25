import { AriaAttributes, ReactNode } from 'react';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';

export interface ICollapseProps {
    styles?: IStackStyles;
    disabled?: boolean;
    defaultOpen?: boolean;
    content: ReactNode;
    iconButtonStyles?: IIconStyles;
    contentWrapperStyles?: IStackStyles;
    iconAria?: AriaAttributes;
    headerAria?: AriaAttributes;
    headerRole?: string;
}
