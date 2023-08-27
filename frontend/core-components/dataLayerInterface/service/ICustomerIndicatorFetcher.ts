import { ICustomerIndicatorField } from '../entity/CustomerIndicators/CustomerIndicator';

export interface ICustomerIndicatorFetcher {
    fetchIndicator(): Promise<ICustomerIndicatorField[]>;
}
