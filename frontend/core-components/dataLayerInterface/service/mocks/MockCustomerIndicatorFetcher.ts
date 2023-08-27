import { ICustomerIndicatorField } from '../../entity/CustomerIndicators/CustomerIndicator';
import { mockIndicatorsData } from '../../entity/CustomerIndicators/mocks/CustomerIndicatorsData.mock';
import { ICustomerIndicatorFetcher } from '../ICustomerIndicatorFetcher';

export class MockCustomerIndicatorFetcher implements ICustomerIndicatorFetcher {
    fetchIndicator(): Promise<ICustomerIndicatorField[]> {
        return Promise.resolve(mockIndicatorsData);
    }
}
