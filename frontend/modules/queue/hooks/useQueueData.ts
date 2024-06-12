import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { IQueueGroup } from '../interfaces/IQueueGroup.interface';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IOnboardingApplicationQueueFetcher } from '../interfaces/IOnboardingApplicationQueueFetcher';
import { IQueueListItem } from '../components/QueueList';
import useBrowserCommunication from '@fsi/core-components/hooks/useBrowserCommunication/useBrowserCommunication';

export interface IUseQueueProps {
    fetcher: IOnboardingApplicationQueueFetcher;
    applicationIds: string[];
}

export interface IUseQueueDataResponse {
    isLoading?: boolean;
    isError?: boolean;
    items: IQueueListItem[];
    steps: IQueueGroup;
    metadata?: { [key: string]: EntityMetadata };
    refetch: () => void;
}

const useQueueData = ({ fetcher, applicationIds }: IUseQueueProps): IUseQueueDataResponse => {
    const { isLoading: isNameLoading, data: bpfName } = useQuery('fetchBPFName', () => fetcher.fetchBPFName(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });
    const {
        isLoading: isStepsLoading,
        data: steps = {},
        isError: isStepsError,
        isFetched: isStepsFetched,
    } = useQuery('fetchSteps', () => fetcher.getSteps(bpfName!), { enabled: !!bpfName });

    const {
        isLoading: isItemsLoading,
        data,
        isError: isItemsError,
        refetch,
    } = useQuery(['fetchQueueItems', applicationIds.toString()], () => fetcher.fetchItems(steps, bpfName!), { enabled: isStepsFetched && !!bpfName });

    const {
        isLoading: isLoadingMetadata,
        isError: isErrorMetadata,
        data: metadata,
    } = useQuery('queueMetadata', () => fetcher.fetchQueueMetadata(), { cacheTime: Infinity, staleTime: Infinity });

    const { messages } = useBrowserCommunication('post-save');

    useEffect(() => {
        refetch();
    }, [fetcher, refetch, messages]);

    const parsedData = useMemo(() => (data || []).map(item => ({ data: { ...item, status: { ...item.status! } }, groupId: item.stepId })), [data]);

    return {
        isLoading: isStepsLoading || isItemsLoading || isLoadingMetadata,
        isError: isStepsError || isItemsError || isErrorMetadata,
        items: parsedData,
        steps,
        metadata,
        refetch,
    };
};

export default useQueueData;
