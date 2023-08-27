import { useQuery } from 'react-query';
import { FHMetadata } from '../../interfaces/FHEntity/FHMetadata';
import { IFHCardsFetcher } from '../../interfaces/IFHCardsFetcher';
import { FinancialHoldingMap } from '../../interfaces/FHEntity/FinancialHoldingMap';
import { useFHMetadata } from './useFHMetadata';

export interface IUseCardsFHProps {
    fetcher: IFHCardsFetcher;
    contactId: string;
}
export interface IUseFHCardsDataResponse {
    entities?: FinancialHoldingMap;
    metadata?: FHMetadata;
    isLoading: boolean;
    isError: boolean;
    hasAccess?: boolean;
}

const useFHCardsData = ({ contactId, fetcher }: IUseCardsFHProps): IUseFHCardsDataResponse => {
    const {
        data: entities,
        isError: isErrorData,
        isLoading: isLoadingData,
        isFetched: isFetchedData,
    } = useQuery(['financialHoldingCardsData', contactId], () => fetcher.fetchFHCardsData(contactId));

    const {
        data: metadata,
        isError: isErrorOptionSets,
        isLoading: isLoadingMetadata,
        isFetched: isFetchedMetadata,
    } = useFHMetadata(() => fetcher.fetchFHMetadata());
    const isLoading = isLoadingData || isLoadingMetadata || !isFetchedMetadata || !isFetchedData;
    const isError = isErrorData || isErrorOptionSets;

    return { entities: entities?.financialHoldings, metadata, isLoading, isError, hasAccess: entities?.hasAccess };
};

export default useFHCardsData;
