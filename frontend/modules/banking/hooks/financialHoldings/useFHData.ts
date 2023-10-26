import { useQuery } from 'react-query';
import { CalculatedFHData, FHMetadata } from '../../interfaces/FHEntity/';
import { useFHIndicators } from './useFHIndicator';
import { useFHMetadata } from './useFHMetadata';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IFHFetcher } from '../../interfaces/IFHFetcher';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';

export interface IUseFHProps {
    fetcher: IFHFetcher;
    contactId: string;
    fetchFI?: boolean;
    categoryId?: string;
}
export interface IUseFHDataResponse {
    entities: IndictableFH[];
    calculated?: CalculatedFHData;
    metadata?: FHMetadata;
    isLoading: boolean;
    isError: boolean;
    categoriesMetadata?: { [entityName: string]: HttpStatusCode };
}

const useFHData = ({ contactId, fetcher, categoryId, fetchFI = true }: IUseFHProps): IUseFHDataResponse => {
    const {
        data: fhData,
        isError: isErrorData,
        isLoading: isLoadingData,
        isFetched: isFetchedData,
    } = useQuery(['financialHoldingsData', contactId, categoryId], () => fetcher.fetchFHData(contactId, fetchFI, categoryId));

    const {
        data: metadata,
        isError: isErrorOptionSets,
        isLoading: isLoadingMetadata,
        isFetched: isFetchedMetadata,
    } = useFHMetadata(() => fetcher.fetchFHMetadata());

    const fhEntities = useFHIndicators(fhData, metadata);
    const isLoading = isLoadingData || isLoadingMetadata || !isFetchedMetadata || !isFetchedData;
    const isError = isErrorData || isErrorOptionSets;

    return { entities: fhEntities, metadata, calculated: fhData?.calculated, isLoading, isError, categoriesMetadata: fhData?.requestMetadata };
};

export default useFHData;
