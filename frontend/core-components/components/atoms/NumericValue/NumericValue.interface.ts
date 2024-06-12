import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

export interface INumericValueProps {
    value: number;
    compact?: boolean;
    signed?: boolean;
    fricationDigits?: number;
    styles?: ITextStyles;
    isPercentage?: boolean;
}
