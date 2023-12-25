import { useFSIContext } from '@fsi/core-components/dist/context/hooks/useFSIContext';
import { IOnboardingApplicationTasksFetcher } from '../interfaces/IOnboardingApplicationTasksFetcher';

export const useCancelTasksDisplay = ({ fetcher }: { fetcher: IOnboardingApplicationTasksFetcher }): boolean => {
    const context = useFSIContext();
    return (context.envVars?.canceltasksdisplayindicator?.value || context.envVars?.canceltasksdisplayindicator?.defaultvalue) === 'yes';
};
