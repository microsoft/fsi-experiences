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

export interface LifeEventsContainerProps extends PCFContainerProps {}
interface IFetcherPickerProps {
    context: CommonPCFContext;
    settings?: IFeatureFlags;
}

const extractLifeEventsConfigSets = context => ({
    configSets: extractContextualSets(context, [LIFE_EVENT_HIDE_LIST_CONFIGURATIONS]),
});

const fetcherPicker = ({ context, settings }: IFetcherPickerProps): ILifeEventsFetcher => {
    const [isTestMode, isFinancialGoalsFeatureOn] = [contextService.isTestMode(), settings?.enableFinancialGoals];

    if (isFinancialGoalsFeatureOn) {
        return isTestMode ? new MockFinancialGoalFetcher() : new PCFFinancialGoalsFetcher(context);
    } else {
        return isTestMode ? new MockLifeEventsFetcher() : new PCFLifeEventsFetcher(context);
    }
};

export const extractLifeEventsConfig = context => mergeConfigs([extractLifeEventsConfigSets(context), extractLifeEventsFlags(context)]);

export const LifeEventsContainer: React.FC<LifeEventsContainerProps> = (props: LifeEventsContainerProps) => {
    const { context } = props;
    const contactId = extractEntityId(context.parameters?.contactId);
    const config = extractLifeEventsConfig(context);

    const fetcher = useMemo(() => {
        return fetcherPicker({ context: context, settings: config.flags });
    }, [config.flags, context]);

    return context ? (
        <PCFContainer config={config} context={props.context}>
            <LifeEvents fetcher={fetcher} contactId={contactId} />
        </PCFContainer>
    ) : null;
};
