import { IStyle } from '@fluentui/react/lib/Styling';
import { ITheme } from '@fluentui/react/lib/Theme';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { FHMetadata } from '../../../interfaces/FHEntity/FHMetadata';
import { FinancialInstrumentFields } from '../../../interfaces/FHEntity/FinancialInstrumentFields';

export interface IBankingCardStyleProps {
    className?: string;
    active: boolean;
    isCredit: boolean;
    theme: ITheme;
}

export interface IBankingCardStyles {
    root: IStyle;
}
export interface IBankingCardProps {
    cardInfo?: FinancialInstrumentFields;
    index?: number;
    fhRole?: number;
    currencyId?: string;
    metadata?: FHMetadata;
    styles?: IStyleFunctionOrObject<IBankingCardStyleProps, IBankingCardStyles>;
    theme?: ITheme;
}
