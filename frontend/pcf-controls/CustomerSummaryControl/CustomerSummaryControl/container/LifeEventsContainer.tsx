import React, { useMemo } from 'react';
import { LifeEvents } from '@fsi/milestones/LifeEvents';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { PCFFinancialGoalsFetcher, PCFLifeEventsFetcher } from '../fetchers';
import contextService from '@fsi/pcf-common/services/ContextService';
import { MockFinancialGoalFetcher, MockLifeEventsFetcher } from '@fsi/milestones/interfaces/mocks/MockLifeEventsFetcher';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { extractContextualSets } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { mergeConfigs } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { extractLifeEventsFlags } from './lifeEvents';
import { IFeatureFlags } from '@fsi/core-components/dist/context/config/IConfig';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { ILifeEventsFetcher } from '@fsi/milestones/interfaces/ILifeEventsFetcher';
import { LIFE_EVENT_HIDE_LIST_CONFIGURATIONS } from '@fsi/milestones/constants/LifeEvent.consts';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';
import { ILoggerService } from '@fsi/core-components/dist/context/telemetry/ILoggerService';

export interface LifeEventsContainerProps extends PCFContainerProps {}
interface IFetcherPickerProps {
    context: CommonPCFContext;
    settings?: IFeatureFlags;
    loggerService: ILoggerService;
}


const extractLifeEventsConfigSets = context => ({
    configSets: extractContextualSets(context, [LIFE_EVENT_HIDE_LIST_CONFIGURATIONS]),
});

const fetcherPicker = ({ context, settings, loggerService }: IFetcherPickerProps): ILifeEventsFetcher => {
    const [isTestMode, isFinancialGoalsFeatureOn] = [contextService.isTestMode(), settings?.enableFinancialGoals];

    if (isFinancialGoalsFeatureOn) {
        return isTestMode ? new MockFinancialGoalFetcher() : new PCFFinancialGoalsFetcher(context, loggerService);
    } else {
        return isTestMode ? new MockLifeEventsFetcher() : new PCFLifeEventsFetcher(context, loggerService);
    }
};

export const extractLifeEventsConfig = context => mergeConfigs([extractLifeEventsConfigSets(context), extractLifeEventsFlags(context)]);

export const LifeEventsContainer: React.FC<LifeEventsContainerProps> = (props: LifeEventsContainerProps) => {
    const { context } = props;
    const contactId = extractEntityId(context.parameters?.contactId);
    const config = extractLifeEventsConfig(context);
    const loggerService = usePCFLoggerService();

    const fetcher = useMemo(() => {
        return fetcherPicker({ context: context, settings: config.flags, loggerService: loggerService });
    }, [config.flags, context]);

    return context ? (
        <PCFContainer config={config} context={props.context}>
            <LifeEvents fetcher={fetcher} contactId={contactId} />
        </PCFContainer>
    ) : null;
};
