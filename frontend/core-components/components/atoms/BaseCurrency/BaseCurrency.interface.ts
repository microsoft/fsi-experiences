import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

export interface IBaseCurrencyProps {
    exchange?: {
        fromCurrency: string;
        rate?: number;
    };
    color?: string;
    styles?: ITextStyles;
    ariaLabelPrefix?: string;
    hideCurrencyInfoIcon?: boolean;
}
