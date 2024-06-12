import React, { FC, useCallback, useContext, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { focusCategoryIndicatorStyle, lifeEventCategoryStyles } from './LifeEventCategory.style';
import { LifeEventContext } from '../../LifeEvent.context';
import { LifeEvent } from '../../interfaces';
import { useIndicators } from '../../hooks/useIndicators';
import FocusIndicator from '../LifeEventIndicators/FocusIndicator';
import Header from './Header';
import Footer from './Footer';
import { arrangeByDates, filterGoals, filterLifeEvents, isGoalBeforeLifeEventPlanned } from '../../utilities';
import FinancialGoalFooter from '../../goals/components/FinancialGoalFooter';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { LIFE_EVENTS_FLAGS } from '../../constants/lifeEvents';
export interface ICategoryProps {
    categoryName: string;
    categoryCode: number;
    icon: string;
    displayOrder: number;
    lifeEvents: LifeEvent[];
    onClick: (code: number) => void;
    readonly?: boolean;
    hideModifyButtons?: boolean;
}

const rootTokens = { childrenGap: 8 };

const LifeEventCategory: FC<ICategoryProps> = ({ categoryName, categoryCode, lifeEvents, icon, onClick, readonly, hideModifyButtons }) => {
    const enableFinancialGoals = useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS);
    const { planned, past, actionNeeded } = useMemo(() => arrangeByDates(lifeEvents, enableFinancialGoals), [enableFinancialGoals, lifeEvents]);

    const plannedLifeEventsCounter = filterLifeEvents(planned);
    const pastLifeEventsCounter = filterLifeEvents(past);
    const actionNeededLifeEventsCounter = filterLifeEvents(actionNeeded);

    const eventsCount = plannedLifeEventsCounter.length + pastLifeEventsCounter.length + actionNeededLifeEventsCounter.length;

    const isEmpty = eventsCount === 0;

    const plannedGoalsCounter = filterGoals(planned);
    const pastGoalsCounter = filterGoals(past);
    const actionNeededGoalsCounter = filterGoals(actionNeeded);

    const financialGoalsCount = plannedGoalsCounter.length + pastGoalsCounter.length + actionNeededGoalsCounter.length;

    const lastLifeEvent = useMemo(() => {
        if (isEmpty) {
            return undefined;
        }
        if (actionNeeded.length) {
            return actionNeeded[0];
        }

        if (planned.length) {
            return planned.slice(-1)[0];
        }

        return past[0];
    }, [isEmpty, actionNeeded, planned, past]);

    const { configuration } = useContext(LifeEventContext);

    const { isNew, isFocused } = useIndicators(lastLifeEvent?.event, configuration);

    const handleCategoryClick = useCallback(() => {
        onClick(categoryCode);
    }, [onClick, categoryCode]);

    const categoryFooterGoal = lastLifeEvent?.event.financialGoal && isGoalBeforeLifeEventPlanned(lastLifeEvent.event);

    return (
        <Stack
            role="listitem"
            tokens={rootTokens}
            onClick={handleCategoryClick}
            data-is-focusable
            styles={lifeEventCategoryStyles}
            data-testid={`life-event-category-wrapper-${categoryCode}`}
        >
            <Header
                categoryName={categoryName}
                categoryCode={categoryCode}
                icon={icon}
                eventsCount={eventsCount}
                isEmpty={isEmpty}
                financialGoalsCount={financialGoalsCount}
            />
            {categoryFooterGoal ? (
                <FinancialGoalFooter financialGoal={lastLifeEvent.event.financialGoal!} />
            ) : (
                <Footer
                    readonly={readonly}
                    hideModifyButtons={hideModifyButtons}
                    isNew={isNew}
                    lastLifeEvent={lastLifeEvent?.event}
                    categoryCode={categoryCode}
                    configuration={configuration}
                    isEmpty={isEmpty}
                />
            )}
            <FocusIndicator hide={!isFocused} style={focusCategoryIndicatorStyle} />
        </Stack>
    );
};
export default LifeEventCategory;
