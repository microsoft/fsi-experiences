import React from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/dist/containers/PCFContainer';
import { PCFOnboardingApplicationTasksFetcher } from '@fsi-pcf/oa-tasks-common/fetchers';
import { MockOnboardingApplicationTasksFetcher } from '@fsi/onboarding-application/dist/interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { TaskVerificationWrapper } from '@fsi/onboarding-application/components/TaskVerification/TaskVerification';
import contextService from '@fsi/pcf-common/dist/services/ContextService';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface TaskVerificationContainerProps extends PCFContainerProps {}

const containerStyles = { display: 'flex', height: '100%' };

export const TaskVerificationContainer: React.FC<TaskVerificationContainerProps> = ({ context }: TaskVerificationContainerProps) => {
    const loggerService = usePCFLoggerService();
    const taskDefinitionId = context.parameters.taskDefinitionId?.raw;
    const applicationId = context.parameters.applicationId?.raw;
    const fetcher = contextService.isTestMode()
        ? new MockOnboardingApplicationTasksFetcher()
        : new PCFOnboardingApplicationTasksFetcher(context, loggerService);

    return (
        context && (
            <PCFContainer containerStyle={containerStyles} context={context} withCurrencies={false}>
                <TaskVerificationWrapper fetcher={fetcher} taskDefinitionId={taskDefinitionId} applicationId={applicationId} />
            </PCFContainer>
        )
    );
};
export default TaskVerificationContainer;
