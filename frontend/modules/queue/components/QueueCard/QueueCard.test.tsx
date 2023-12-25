import React from 'react';
import { render } from '@testing-library/react';
import QueueCard from './QueueCard';
import {
    QUEUE_CARD_TEST_ID,
    QUEUE_CARD_ICON_START_TEST_ID,
    QUEUE_CARD_ICON_END_TEST_ID,
    QUEUE_CARD_TAG_START_TEST_ID,
    QUEUE_CARD_TAG_END_TEST_ID,
} from './QueueCard.const';

describe('QueueCard', () => {
    const mockProps = {
        id: 'queueCard',
        tagEnd: 'tagEnd',
        primaryContent: 'primaryContent',
    };
    it('Should be rendered in DOM', () => {
        const { getByTestId } = render(<QueueCard {...mockProps} />);
        const queueCard = getByTestId(QUEUE_CARD_TEST_ID);
        expect(queueCard).toBeInTheDocument();
    });
    it('Should Not be rendered in DOM if no content properties provided', () => {
        const { queryByTestId } = render(<QueueCard primaryContent={''} />);
        const queueCard = queryByTestId(QUEUE_CARD_TEST_ID);
        expect(queueCard).toBeNull();
    });

    it('Should render iconStart if provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} iconStart={<span>iconStart</span>} />);
        const queueCard = queryByTestId(QUEUE_CARD_ICON_START_TEST_ID);
        expect(queueCard).toBeInTheDocument();
    });
    it('Should Not render iconStart if not provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} />);
        const queueCard = queryByTestId(QUEUE_CARD_ICON_START_TEST_ID);
        expect(queueCard).toBeNull();
    });
    it('Should render iconEnd if provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} iconEnd={<span>iconEnd</span>} />);
        const queueCard = queryByTestId(QUEUE_CARD_ICON_END_TEST_ID);
        expect(queueCard).toBeInTheDocument();
    });
    it('Should Not render iconEnd if not provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} />);
        const queueCard = queryByTestId(QUEUE_CARD_ICON_END_TEST_ID);
        expect(queueCard).toBeNull();
    });
    it('Should render tagStart if provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} tagStart="tagStart" />);
        const queueCard = queryByTestId(QUEUE_CARD_TAG_START_TEST_ID);
        expect(queueCard).toBeInTheDocument();
    });
    it('Should Not render tagStart if not provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} />);
        const queueCard = queryByTestId(QUEUE_CARD_TAG_START_TEST_ID);
        expect(queueCard).toBeNull();
    });
    it('Should Not render tagEnd if not provided', () => {
        const { queryByTestId } = render(<QueueCard {...mockProps} tagEnd={undefined} />);
        const queueCard = queryByTestId(QUEUE_CARD_TAG_END_TEST_ID);
        expect(queueCard).toBeNull();
    });
});
