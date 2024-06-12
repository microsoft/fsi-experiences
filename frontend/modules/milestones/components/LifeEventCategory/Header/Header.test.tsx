import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import lifeEventsConfigurations from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('Footer of LifeEventCategory', () => {
    const testCategoryCode = 104800006;
    const testCategory = lifeEventsConfigurations.categoriesMap[testCategoryCode];

    it('Should render header correctly- events and financial goals', async () => {
        const { getByText, getByTestId } = render(
            <Header
                categoryName={testCategory.name}
                categoryCode={testCategoryCode}
                eventsCount={3}
                icon={testCategory.icon}
                isEmpty={false}
                financialGoalsCount={1}
            />
        );

        expect(getByText(testCategory.name)).toBeVisible();
        expect(getByText('Vehicle')).toBeVisible();
        expect(getByTestId(/life-event-count-financial-goal/i)).toBeVisible();

        const numEvents = lifeEventStrings.EVENTS_PLURAL.replace('{{pluralCount}}', '3');
        const numFinancialGoals = lifeEventStrings.GOALS.replace('{{pluralCount}}', '1');
        expect(getByText(`${numEvents}, ${numFinancialGoals}`)).toBeVisible();
    });

    it('Should render header correctly - events, no financial goal', async () => {
        const { getByTestId } = render(
            <Header
                categoryName={testCategory.name}
                categoryCode={testCategoryCode}
                eventsCount={3}
                icon={testCategory.icon}
                isEmpty={false}
                financialGoalsCount={0}
            />
        );

        expect(getByTestId(/life-event-count/i)).toBeVisible();
    });

    it('Should render empty state header correctly', async () => {
        const { getByText, getByTestId } = render(
            <Header
                categoryName={testCategory.name}
                categoryCode={testCategoryCode}
                eventsCount={3}
                icon={testCategory.icon}
                isEmpty={true}
                financialGoalsCount={1}
            />
        );

        expect(getByText(testCategory.name)).toBeVisible();
        expect(getByText('Vehicle')).toBeVisible();
        expect(getByTestId(/life-event-icon-button-/i)).toBeVisible();

        const numEvents = lifeEventStrings.NO_EVENTS_YET;
        const numFinancialGoals = lifeEventStrings.NO_GOALS_YET;
        expect(getByText(`${numEvents}, ${numFinancialGoals}`)).toBeVisible();
    });
});
