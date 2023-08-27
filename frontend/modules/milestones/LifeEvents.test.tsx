import React from 'react';
import { render, waitForElementToBeRemoved, fireEvent, waitFor } from '@testing-library/react';
import { LifeEvents } from './LifeEvents';
import { MockFinancialGoalFetcher, MockLifeEventsFetcher } from './interfaces/mocks/MockLifeEventsFetcher';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import lifeEventsConfigurations from './interfaces/mocks/LifeEventsConfigurations.mock';
import { FSIContainer } from '@fsi/core-components/dist/context/FSIContext';
import { LIFE_EVENTS_FLAGS } from './constants/lifeEvents';

describe('LifeEventsMain', () => {
    const mockContactId = 'testId';

    const getConfigEvent = (enableGoals: boolean) => {
        return {
            flags: {
                [LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS]: enableGoals,
            },
        };
    };

    const LifeEventsWithContext = props => (
        <FSIContainer config={getConfigEvent(false)}>
            <LifeEvents {...props} />
        </FSIContainer>
    );

    it('Should render category list after loading', async () => {
        const { getByText, getAllByTestId } = render(<LifeEventsWithContext contactId={mockContactId} fetcher={new MockLifeEventsFetcher()} />);

        await waitForElementToBeRemoved(() => getByText(commonStrings.CONNECTING_WITH_DATA));

        const categoryElements = getAllByTestId(/life-event-category-wrapper/i);

        expect(categoryElements.length).toEqual(10);
    });

    it('Should show error state', async () => {
        const mockFetcher = new MockLifeEventsFetcher();
        mockFetcher.fetchLifeEvents = async () => {
            throw new Error();
        };

        const { getByText, getByTestId } = render(<LifeEventsWithContext contactId={mockContactId} fetcher={mockFetcher} />);

        await waitFor(() => expect(getByTestId('error-state')).toBeVisible());

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should Open birthday side bar', async () => {
        const { getByText, getByTestId, getAllByTestId } = render(
            <LifeEventsWithContext contactId={mockContactId} fetcher={new MockLifeEventsFetcher()} />
        );

        await waitForElementToBeRemoved(() => getByText(commonStrings.CONNECTING_WITH_DATA));

        const firstCategory = getAllByTestId(/life-event-category-wrapper-/i)[0].querySelector('button');
        if (firstCategory) {
            fireEvent.click(firstCategory);

            // eslint-disable-next-line jest/no-conditional-expect
            await waitFor(() => expect(getByTestId('life-events-details-side-panel')).toBeTruthy());
        }
    });

    it('Should call fetch life events', async () => {
        const mockFetcher = new MockLifeEventsFetcher();
        mockFetcher.fetchLifeEvents = jest.fn();

        const { getByText } = render(<LifeEventsWithContext contactId={mockContactId} fetcher={mockFetcher} />);

        await waitForElementToBeRemoved(() => getByText(commonStrings.CONNECTING_WITH_DATA));

        expect(mockFetcher.fetchLifeEvents).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations);
    });

    it('Should render category list after loading- financialGoals', async () => {
        const { getByText, getAllByTestId } = render(
            <FSIContainer config={getConfigEvent(true)}>
                <LifeEvents contactId={mockContactId} fetcher={new MockFinancialGoalFetcher()} />
            </FSIContainer>
        );

        await waitForElementToBeRemoved(() => getByText(commonStrings.CONNECTING_WITH_DATA));

        const categoryElements = getAllByTestId(/life-event-category-wrapper/i);

        expect(categoryElements.length).toEqual(10);
    });
});
