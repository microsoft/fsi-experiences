import { useQuery } from 'react-query';
import { ICustomerIndicator } from '../CustomerIndicators/CustomerIndicators';

const isConfigurationError = e => e?.name === 'CustomerIndicatorsConfigError';

const useCustomerIndicators = (props: ICustomerIndicator) => {
    const {
        data: indicatorData,
        isLoading: isLoadingIndicatorData,
        isError: isErrorIndicatorData,
        isFetched: isFetchedIndicatorData,
        error: indicatorDataError,
    } = useQuery('indicators', () => props.fetcher.fetchIndicator());
    const isLoading = (isLoadingIndicatorData || !isFetchedIndicatorData) && !isErrorIndicatorData;

    const isError = isErrorIndicatorData || !indicatorData;

    const invalidConfig = isErrorIndicatorData && isConfigurationError(indicatorDataError);

    return { indicatorData, isLoading, isError, invalidConfig };
};

export default useCustomerIndicators;
