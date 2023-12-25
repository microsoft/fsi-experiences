import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import contextService from '@fsi/pcf-common/services/ContextService';
import { MockOnboardingApplicationTasksFetcher } from '@fsi/onboarding-application/interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import TaskProgressOverview from '@fsi/onboarding-application/components/TaskProgressOverview/TaskProgressOverview';
import { PCFOnboardingApplicationTasksFetcher } from '@fsi-pcf/oa-tasks-common/fetchers';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface OnboardingApplicationTaskProgressOverviewProps extends PCFContainerProps {}

export const OnboardingApplicationTaskProgressOverviewContainer: React.FC<OnboardingApplicationTaskProgressOverviewProps> = (
    props: OnboardingApplicationTaskProgressOverviewProps
) => {
    const { context } = props;
    const loggerService = usePCFLoggerService();

    const fetcher = useMemo(() => {
        return contextService.isTestMode()
            ? new MockOnboardingApplicationTasksFetcher()
            : new PCFOnboardingApplicationTasksFetcher(context, loggerService);
    }, [context, loggerService]);

    return (
        context && (
            <PCFContainer context={context} withCurrencies={false}>
                <TaskProgressOverview fetcher={fetcher} />
            </PCFContainer>
        )
    );
};
export default OnboardingApplicationTaskProgressOverviewContainer;
