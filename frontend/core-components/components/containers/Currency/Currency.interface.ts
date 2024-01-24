import { Alignment, IStackStyles, IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { ICurrencyCodeProps } from '../../atoms/CurrencyCode';
import { INumericValueProps } from '../../atoms/NumericValue/NumericValue.interface';

export interface ICurrencyProps extends Omit<INumericValueProps, 'styles'>, Omit<ICurrencyCodeProps, 'styles'> {
    styles?: IStackStyles;
    currencyStyles?: ITextStyles;
    numberStyles?: ITextStyles;
    horizontalAlign?: Alignment;
    tokens?: IStackTokens;
}
