import { useMemo } from 'react';
import { useQuery } from 'react-query';
import groupBy from 'lodash/groupBy';
import { IGroupFinancialHolding } from '../../interfaces/Groups/IGroupFinancialHolding';
import { useFHMetadata } from './useFHMetadata';
import { IUseFHDataResponse, IUseFHProps } from './useFHData';
import { useFHIndicators } from './useFHIndicator';

export interface IUseFHDetailedDataResponse extends IUseFHDataResponse {
    fhStructure?: IGroupFinancialHolding[];
}

const useDetailedFHMain: (props: IUseFHProps) => IUseFHDetailedDataResponse = ({ contactId, fetcher }) => {
    const {
        data: metadata,
        isError: isErrorMetadata,
        isLoading: isLoadingMetadata,
        isFetched: isFetchedMetadata,
    } = useFHMetadata(() => fetcher.fetchFHMetadata());

    const {
        data: fhData,
        isError: isErrorFH,
        isLoading: isLoadingFH,
        isFetched: isFetchedFH,
    } = useQuery(['financialHoldingsData', contactId], () => fetcher.fetchFHData(contactId, true));

    const fhEntities = useFHIndicators(fhData, metadata);

    const {
        data: fhStructureData,
        isError: isErrorData,
        isLoading: isLoadingData,
        isFetched: isFetchedData,
    } = useQuery(['financialHoldingsStructureData', contactId], async () => fetcher.fetchFHOtherCustomersOwn?.(contactId));

    const fhStructure = useMemo(() => {
        const buildFhStructure: IGroupFinancialHolding[] = [];

        if (fhData && fhStructureData) {
            const map = groupBy(fhEntities, 'id');

            fhStructureData?.forEach((value, key) => {
                const holding = map[key] && map[key][0];
                if (holding) {
                    buildFhStructure.push({ ...holding, owners: value, groupHoldingId: holding.id });
                }
            });
        }
        return buildFhStructure;
    }, [fhData, fhStructureData, fhEntities]);

    const isLoading = isLoadingData || !isFetchedData || isLoadingMetadata || !isFetchedMetadata || isLoadingFH || !isFetchedFH;
    const isError = isErrorData || isErrorMetadata || isErrorFH;

    return {
        isLoading,
        isError,
        fhStructure,
        metadata,
        entities: fhEntities,
        calculated: fhData?.calculated,
        categoriesMetadata: fhData?.requestMetadata,
    };
};

export default useDetailedFHMain;
