/* istanbul ignore file */
import { useQuery } from 'react-query';
import { IAccess } from '../dataLayerInterface/entity/IAccess';

const useContactAccessInfo = ({ entityId, fetcher }) => {
    const accessInfo = useQuery<IAccess>({
        queryFn: () => fetcher.getAccessInfo(entityId),
        queryKey: `contact-access-${entityId}`,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return accessInfo;
};

export default useContactAccessInfo;
