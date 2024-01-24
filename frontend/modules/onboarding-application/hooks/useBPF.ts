import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { FETCH_BPF_NAME_QUERY, FETCH_BPF_STAGE_QUERY, FETCH_STAGE_NAME_QUERY } from '../constants/OnboardingApplicationTasks.const';
import { IOnboardingApplicationTasksFetcher } from '../interfaces/IOnboardingApplicationTasksFetcher';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';

interface IUseBPF {
    bpfName?: string;
    bpfStage?: string;
    stageName?: string;
    isStageIdFetched: boolean;
    isBPFNameFetched: boolean;
}

export const useBPF = ({ fetcher }: { fetcher: IOnboardingApplicationTasksFetcher }): IUseBPF => {
    const { messages } = useBrowserCommunication('stage-change');

    const { data: bpfName, isFetched: isBPFNameFetched } = useQuery(FETCH_BPF_NAME_QUERY, () => fetcher.fetchBPFName(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });
    const {
        isFetched: isStageIdFetched,
        data: bpfStage,
        refetch: refetchStageID,
    } = useQuery(FETCH_BPF_STAGE_QUERY, () => fetcher.fetchActiveBPFStage(bpfName!), {
        enabled: !!bpfName,
    });
    const { data: stageName, refetch: refetchStageName } = useQuery(FETCH_STAGE_NAME_QUERY, () => fetcher.fetchActiveStageName(bpfStage!), {
        enabled: !!bpfStage,
    });

    useEffect(() => {
        if (messages?.length) {
            refetchStageID();
            refetchStageName();
        }
    }, [messages, refetchStageID, refetchStageName]);

    return { bpfName, bpfStage, stageName, isStageIdFetched, isBPFNameFetched };
};
