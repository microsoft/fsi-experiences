import React from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/dist/containers/PCFContainer';
import { OnboardingApplicationQueueFetcher } from '../fetchers/OnboardingApplicationQueue.fetcher';
import { MockOnboardingApplicationQueueFetcher } from '@fsi/queue/dist/interfaces/mocks/MockOnboardingApplicationQueueFetcher';
import contextService from '@fsi/pcf-common/dist/services/ContextService';
import QueueAndForm from './QueueAndForm';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface OnboardingApplicationQueueProps extends PCFContainerProps {}

const containerStyles = { display: 'flex', height: '100%' };

export const OnboardingApplicationQueueContainer: React.FC<OnboardingApplicationQueueProps> = ({ context }: OnboardingApplicationQueueProps) => {
    const loggerService = usePCFLoggerService();
    const fetcher = contextService.isTestMode()
        ? new MockOnboardingApplicationQueueFetcher()
        : new OnboardingApplicationQueueFetcher(context, loggerService);

    return (
        context && (
            <PCFContainer containerStyle={containerStyles} context={context} withCurrencies={false}>
                <QueueAndForm fetcher={fetcher} context={context} />
            </PCFContainer>
        )
    );
};
export default OnboardingApplicationQueueContainer;
