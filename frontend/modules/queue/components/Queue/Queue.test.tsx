import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Queue from './Queue';
import { MockOnboardingApplicationQueueFetcher } from '../../interfaces/mocks/MockOnboardingApplicationQueueFetcher';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { queueItemsMock } from '../../interfaces/mocks/Queue.mock';
import { QUEUE_CARD_TEST_ID } from '../QueueCard/QueueCard.const';
import useQueueData from '../../hooks/useQueueData';
import { QUEUE_CARD_TAG_START_SR_ID_PREFIX } from './Queue.const';
import queueStrings from '../../assets/strings/Queue/Queue.1033.json';

jest.mock('@fsi/core-components/dist/hooks/useDebounce/useDebounce', () => ({
    useDebounce: fn => fn,
}));

jest.useFakeTimers();

const onSelectQueueItem = jest.fn();
const selectedQueueItemId = undefined;
const QueueWithHook = ({ fetcher }) => {
    const { items, steps, metadata } = useQueueData({ fetcher, applicationIds: [] });
    return (
        <Queue
            items={items}
            steps={steps}
            metadata={metadata}
            onSelectQueueItem={onSelectQueueItem}
            selectedQueueItemId={selectedQueueItemId}
        ></Queue>
    );
};

describe('Queue', () => {
    afterEach(() => {
        testingQueryClient.clear();
    });

    it('Should render Queue', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const component = render(<QueueWithHook fetcher={fetcher} />, { wrapper: QueryClientWrapper });
        const { getByTestId } = component;
        expect(getByTestId('queue-list')).toBeVisible();
    });

    it('Should render search bar', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { getByRole, getAllByTestId } = render(<QueueWithHook fetcher={fetcher} />, { wrapper: QueryClientWrapper });
        await waitFor(() => {
            expect(getAllByTestId(QUEUE_CARD_TEST_ID).length).toEqual(8);
        });
        fireEvent.change(getByRole('searchbox'), { target: { value: queueItemsMock[0].itemName } });
        expect(getAllByTestId(QUEUE_CARD_TEST_ID).length).toEqual(1);
    });

    it('Should render date description if provided', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        fetcher.fetchQueueMetadata = jest.fn().mockResolvedValue({ date: { displayName: 'date field' } });

        const { getAllByTestId } = render(<QueueWithHook fetcher={fetcher} />, {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => {
            const tagStart = getAllByTestId('queueCardTagStart')[0];
            const dateSrText = tagStart.querySelector(`:scope > [id^="${QUEUE_CARD_TAG_START_SR_ID_PREFIX}"]`);
            expect(dateSrText).toBeInTheDocument();
        });
    });

    it('Should fill text for screen reader search results when 1 item is found', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { getByRole, getAllByTestId } = render(<QueueWithHook fetcher={fetcher} />, { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(getAllByTestId(QUEUE_CARD_TEST_ID).length).toEqual(8);
        });

        fireEvent.change(getByRole('searchbox'), { target: { value: queueItemsMock[0].itemName } });

        await waitFor(() => {
            expect(getByRole('status')).toHaveTextContent(queueStrings.QUEUE_SEARCH_RESULTS_SR_TEXT_1_ITEM_FOUND);
        });
    });

    it('Should fill text for screen reader search results when No items found', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { getByRole, getAllByTestId } = render(<QueueWithHook fetcher={fetcher} />, { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(getAllByTestId(QUEUE_CARD_TEST_ID).length).toEqual(8);
        });

        fireEvent.change(getByRole('searchbox'), { target: { value: '_!_' } });

        await waitFor(() => {
            expect(getByRole('status')).toHaveTextContent(queueStrings.QUEUE_SEARCH_RESULTS_SR_TEXT_NO_ITEMS_FOUND);
        });
    });

    it('Should fill text for screen reader search results when more than one items found', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { getByRole, getAllByTestId } = render(<QueueWithHook fetcher={fetcher} />, { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(getAllByTestId(QUEUE_CARD_TEST_ID).length).toEqual(8);
        });

        fireEvent.change(getByRole('searchbox'), { target: { value: queueItemsMock[0].itemText } });

        await waitFor(() => {
            expect(getByRole('status')).toHaveTextContent(queueStrings.QUEUE_SEARCH_RESULTS_SR_TEXT_X_ITEMS_FOUND.replace('{{amount}}', '2'));
        });
    });

    it('Should NOT fill text for screen reader search results when search input has an empty value', async () => {
        const fetcher = new MockOnboardingApplicationQueueFetcher();
        const { getByRole, getAllByTestId } = render(<QueueWithHook fetcher={fetcher} />, { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(getAllByTestId(QUEUE_CARD_TEST_ID).length).toEqual(8);
        });

        fireEvent.change(getByRole('searchbox'), { target: { value: queueItemsMock[0].itemText } });

        await waitFor(() => {
            fireEvent.change(getByRole('searchbox'), { target: { value: '' } });
        });

        await waitFor(() => {
            expect(getByRole('status')).toBeEmptyDOMElement();
        });
    });
});
