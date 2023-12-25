import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { QUEUE_LIST_ROW_TEST_ID } from './QueueListRow.const';
import { QueueListRow } from './QueueListRow';
import { queueItemsMock } from '../../../interfaces/mocks/Queue.mock';

describe('ApplicationListRow', () => {
    const mockProps = {
        item: queueItemsMock.map(item => ({ data: { ...item, status: { ...item.status! } }, groupId: item.stepId }))[0],
        srCurrentItemText: 'current',
        isSelected: false,
        children: <div>Content</div>,
    };

    it('should render the component', () => {
        const { getByTestId } = render(<QueueListRow {...mockProps} />);
        const queueListRow = getByTestId(QUEUE_LIST_ROW_TEST_ID);
        expect(queueListRow).toBeInTheDocument();
    });

    it('should NOT render the component if children property is undefined', () => {
        const props = { ...mockProps, children: undefined };
        const { queryByTestId } = render(<QueueListRow {...props} />);
        const queueListRow = queryByTestId(QUEUE_LIST_ROW_TEST_ID);
        expect(queueListRow).toBeNull();
    });

    it('should set aria-selected on the row if isSelected is TRUE', () => {
        const { queryByTestId } = render(<QueueListRow {...mockProps} isSelected={true} />);
        const queueListRow = queryByTestId(QUEUE_LIST_ROW_TEST_ID);

        expect(queueListRow?.getAttribute('aria-selected')).toEqual('true');
    });

    it('should NOT set aria-selected on the row if isSelected has a falsy value', () => {
        const { queryByTestId } = render(<QueueListRow {...mockProps} />);
        const queueListRow = queryByTestId(QUEUE_LIST_ROW_TEST_ID);

        expect(queueListRow?.getAttribute('aria-selected')).toBeNull();
    });

    it('should trigger onClick when the row is clicked', async () => {
        const onClickMethod = jest.fn();

        const { getByTestId } = render(<QueueListRow {...mockProps} onClick={onClickMethod} />);
        const queueListRow = getByTestId(QUEUE_LIST_ROW_TEST_ID);

        await act(async () => {
            await fireEvent.click(queueListRow);
        });

        expect(onClickMethod).toBeCalled();
    });

    it('should NOT trigger onClick when the row is clicked but onClick is undefined', async () => {
        const onClickMethod = jest.fn();

        const { getByTestId } = render(<QueueListRow {...mockProps} />);
        const queueListRow = getByTestId(QUEUE_LIST_ROW_TEST_ID);

        await act(async () => {
            await fireEvent.click(queueListRow);
        });

        expect(onClickMethod).not.toBeCalled();
    });
});
