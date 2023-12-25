import { useQuery } from "react-query";
import { IOnboardingApplicationQueueFetcher } from "../interfaces/IOnboardingApplicationQueueFetcher";

interface IUseArchiveReasonprop {
    fetcher: IOnboardingApplicationQueueFetcher;
    applicationID: string;
}

const useGetArchiveReason = ({ fetcher, applicationID }: IUseArchiveReasonprop) => {
    const { data: archiveReasons } = useQuery(applicationID + 'fetchArchiveReasons', () => fetcher.fetchArchiveReasons(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });
    return archiveReasons;
}

export default useGetArchiveReason;