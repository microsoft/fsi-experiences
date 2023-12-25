import React from 'react';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { LIFE_EVENTS_FLAGS } from './constants/lifeEvents';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { IFinancialGoalsFetcher, ILifeEventsFetcher } from './interfaces/ILifeEventsFetcher';
import { LifeEventBar } from './components/LifeEventBar/LifeEventBar';
import { lifeEventsPrefix } from './constants/responsive.consts';
import FinancialGoalContextProvider from './goals/FinancialGoal.context';
import LifeEventContextProvider from './LifeEvent.context';

interface ILifeEventsProps {
    fetcher: ILifeEventsFetcher | IFinancialGoalsFetcher;
    contactId: string;
}

export const LifeEvents: React.FC<ILifeEventsProps> = props => {
    const enableFinancialGoals = useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS);

    return (
        <ResponsiveContainer classPrefix={lifeEventsPrefix}>
            {enableFinancialGoals ? (
                <LifeEventContextProvider fetcher={props.fetcher} contactId={props.contactId}>
                    <FinancialGoalContextProvider fetcher={props.fetcher} contactId={props.contactId}>
                        <LifeEventBar />
                    </FinancialGoalContextProvider>
                </LifeEventContextProvider>
            ) : (
                <LifeEventContextProvider fetcher={props.fetcher} contactId={props.contactId}>
                    <LifeEventBar />
                </LifeEventContextProvider>
            )}
        </ResponsiveContainer>
    );
};

export default LifeEvents;
