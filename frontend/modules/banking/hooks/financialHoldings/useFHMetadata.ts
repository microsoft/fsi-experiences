import { useQuery } from 'react-query';
import { FHMetadata } from '../../interfaces/FHEntity';

export const useFHMetadata = (fetchMetadata: () => Promise<FHMetadata>) => {
    return useQuery('financialHoldingsMetadata', fetchMetadata, { cacheTime: Infinity, staleTime: Infinity });
};
