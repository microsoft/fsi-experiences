import { IStackTokens } from '@fluentui/react/lib/components/Stack';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { ReactElement } from 'react';

export interface IBoxDetails {
    label?: string;
    value?: string | number | Date;
    footer?: string | number | Date;
    labelColor?: string;
}

export interface IDataBoxProps {
    boxDetails: IBoxDetails;
    stackTokens?: IStackTokens;
    valueRender?: (value?: string | number | Date) => ReactElement;
    footerRender?: (value?: string | number | Date) => ReactElement;
    styles?: ITextStyles;
}
