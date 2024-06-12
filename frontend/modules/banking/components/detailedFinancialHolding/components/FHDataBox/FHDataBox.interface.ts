import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { IBoxDetails } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox.interface';
import { TimedPerformancePairs } from '@fsi/core-components/dist/components/containers/TimedPerformance/TimedPerformance.interface';
import FinancialHoldingFields from '../../../../interfaces/FHEntity/FinancialHoldingFields';

export enum FHDataBoxType {
    Text,
    Performance,
    Currency,
    SignedCurrency,
    Date,
    Rate,
    Number,
    OptionSet,
}

export interface IFHCurrencyValue extends IBoxDetails {
    currencyId: string;
}

export type FHDataBoxValueType = Date | string | number | TimedPerformancePairs[];

export interface FHDataBoxDetails {
    type: FHDataBoxType;
    field?: string;
    value?: FHDataBoxValueType;
    label?: string;
    labelColor?: string;
    footer?: FHDataBoxDetails;
}

export interface ICurrencyDisplayBox {
    styles: ITextStyles;
    fricationDigits: number;
}
export interface IFHDataBoxProps {
    styles?: ITextStyles;
    currencyDisplay?: ICurrencyDisplayBox;
    entity?: FinancialHoldingFields;
    boxDetails: FHDataBoxDetails;
}
