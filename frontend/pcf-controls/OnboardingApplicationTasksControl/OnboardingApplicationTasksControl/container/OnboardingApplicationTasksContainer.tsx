import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import contextService from '@fsi/pcf-common/services/ContextService';
import { MockOnboardingApplicationTasksFetcher } from '@fsi/onboarding-application/interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import OnboardingApplicationTasks from '@fsi/onboarding-application/components/OnboardingApplicationTasks/OnboardingApplicationTasks';
import { PCFOnboardingApplicationTasksFetcher } from '@fsi-pcf/oa-tasks-common/fetchers';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface OnboardingApplicationTasksContainerProps extends PCFContainerProps {
    onReadyTasks: () => void;
}

export const OnboardingApplicationTasksContainer: React.FC<OnboardingApplicationTasksContainerProps> = (
    props: OnboardingApplicationTasksContainerProps
) => {
    const { context, containerStyle, onReadyTasks } = props;
    const selectedTasksGroup = context.parameters?.selectedTasksGroup.raw;
    const loggerService = usePCFLoggerService();

    const fetcher = useMemo(() => {
        return contextService.isTestMode()
            ? new MockOnboardingApplicationTasksFetcher()
            : new PCFOnboardingApplicationTasksFetcher(context, loggerService);
    }, [context, loggerService]);

    return (
        context && (
            <PCFContainer context={context} containerStyle={containerStyle}>
                <OnboardingApplicationTasks fetcher={fetcher} selectedTasksGroup={selectedTasksGroup} onReadyTasks={onReadyTasks} />
            </PCFContainer>
        )
    );
};
export default OnboardingApplicationTasksContainer;
