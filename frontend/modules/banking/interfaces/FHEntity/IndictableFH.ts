import { FinancialHoldingFields } from './FinancialHoldingFields';

export interface IIndicatorFields {
    order: number;
    messageKey: string;
    messageProps?: {
        [key: string]: string | number;
    };
    type: () => string;
}

export interface IConditionIndicatorFields extends IIndicatorFields {
    condition: () => boolean | undefined;
}

export interface IndictableFH extends FinancialHoldingFields {
    indicator: IIndicatorFields[];
}
