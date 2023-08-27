import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { arrangeByDates, findCategoryByCode } from '../../utilities/LifeEventsUtils';
import { LifeEventCategory } from '../../interfaces';
import EmptyState from '../EmptyState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import SidePanelSection from '../LifeEventsSidePanel/SidePanelSection/SidePanelSection';
import { rootStyles, birthdayStyles, defaultCategoriesStyles } from './Content.styles';
import LEventElementInSidePanel from '../LifeEventsSidePanel/LEventElementInSidePanel/LEventElementInSidePanel';
import {
    expiredSectionStyles,
    expiredTitleStyles,
    expiredSubTitleStyles,
    expiredContentStyles,
} from '../LifeEventsSidePanel/SidePanelSection/SidePanelSection.style';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { ILifeEventConfigurations } from '../../interfaces/Configuration';
import { LIFE_EVENTS_FLAGS } from '../../constants/lifeEvents';

interface IContentProps {
    categoriesCollection: LifeEventCategory[];
    openSidePanelCategory: number;
    hideModifyButtons?: boolean;
    configuration?: ILifeEventConfigurations;
    readonly?: boolean;
    addNewEvent: () => void;
}

const expiredSidePanelSectionStyles = {
    sectionStyles: expiredSectionStyles,
    titleStyles: expiredTitleStyles,
    subTitleStyles: expiredSubTitleStyles,
    contentStyles: expiredContentStyles,
};

const sectionsTitlesMap = {
    EVENTS: {
        EXPIRED: 'ACTION_NEEDED',
        EXPIRED_SUBTITLE: 'EXPIRED_EVENTS_SUBTITLE',
        PLANNED: 'PLANNED_EVENTS_TITLE',
        PAST: 'PAST_EVENTS_TITLE',
    },
    EVENTS_AND_GOALS: {
        EXPIRED: 'ACTION_NEEDED',
        EXPIRED_SUBTITLE: 'EXPIRED_EVENTS_AND_GOALS_SUBTITLE',
        PLANNED: 'PLANNED_EVENTS_AND_GOALS_TITLE',
        PAST: 'PAST_EVENTS_AND_GOALS_TITLE',
    },
};

const rootTokens = { childrenGap: 32 };

const Content: FC<IContentProps> = ({ categoriesCollection, openSidePanelCategory, configuration, readonly, hideModifyButtons, addNewEvent }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const enableFinancialGoals = useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS);
    const sectionsTitles = sectionsTitlesMap[enableFinancialGoals ? 'EVENTS_AND_GOALS' : 'EVENTS'];
    const categoryData = useMemo(
        () => findCategoryByCode(categoriesCollection, openSidePanelCategory),
        [categoriesCollection, openSidePanelCategory]
    );

    const isBirthdayCategory = categoryData?.categoryCode === configuration?.birthdayCategoryCode;

    const { planned, past, actionNeeded } = useMemo(
        () => arrangeByDates((categoryData as LifeEventCategory)?.lifeEvents, enableFinancialGoals),
        [categoryData, enableFinancialGoals]
    );

    if (!planned.length && !past.length && !actionNeeded.length) {
        return <EmptyState readonly={readonly} hideModifyButtons={hideModifyButtons} onClick={addNewEvent} isBirthdayCategory={isBirthdayCategory} />;
    }

    if (isBirthdayCategory && categoryData?.lifeEvents[0]) {
        return (
            <Stack styles={birthdayStyles} tokens={rootTokens} data-testid="life-events-details-side-panel">
                <LEventElementInSidePanel
                    index={0}
                    lifeEvent={categoryData?.lifeEvents[0]}
                    readonly={readonly}
                    hideModifyButtons={hideModifyButtons}
                />
            </Stack>
        );
    }

    return (
        <Stack styles={rootStyles} tokens={rootTokens} data-testid="life-events-details-side-panel">
            <SidePanelSection
                readonly={readonly}
                hideModifyButtons={hideModifyButtons}
                lifeEvents={actionNeeded}
                title={translate(sectionsTitles.EXPIRED)}
                subtitle={translate(sectionsTitles.EXPIRED_SUBTITLE)}
                styles={expiredSidePanelSectionStyles}
            ></SidePanelSection>
            <Stack styles={defaultCategoriesStyles} grow verticalAlign="space-between">
                <Stack tokens={rootTokens}>
                    <SidePanelSection
                        readonly={readonly}
                        hideModifyButtons={hideModifyButtons}
                        lifeEvents={planned}
                        title={translate(sectionsTitles.PLANNED)}
                    ></SidePanelSection>
                    <SidePanelSection
                        readonly={readonly}
                        hideModifyButtons={hideModifyButtons}
                        lifeEvents={past}
                        title={translate(sectionsTitles.PAST)}
                    ></SidePanelSection>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Content;
