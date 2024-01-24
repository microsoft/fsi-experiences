import React from 'react';
import { render } from '@testing-library/react';
import QueueList from './QueueList';
import { queueGroupsMock, queueItemsMock } from '../../interfaces/mocks/Queue.mock';
import { createGroups } from '../../helpers/createGroups';

describe('QueueList', () => {
    const mockProps = {
        dataItems: queueItemsMock.map(item => ({ data: { ...item, status: { ...item.status! } }, groupId: item.stepId })),
        groups: queueGroupsMock,
        onRenderContent: item => {
            return <div>some text</div>;
        },
    };

    it('should render component', () => {
        const { container } = render(<QueueList {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should NOT render group headers if groups is not provided', () => {
        const { container } = render(<QueueList {...mockProps} groups={{}} />);

        const groupHeaders = container.querySelectorAll('.ms-GroupHeader');

        expect(Array.from(groupHeaders)).toEqual([]);
    });

    it('should return valid groups for provided data', () => {
        const groups = createGroups(mockProps.dataItems, mockProps.groups);
        // Result Example: [{count: 5, key: "1", name: "group 1", startIndex: 0}, {count: 3, key: "2", name: "group 2", startIndex: 5}]
        expect(groups[0].startIndex).toBe(0);
        expect(groups[1].startIndex).toBe(5);
    });

    it('should NOT include, in the groups result, items that have an invalid groupId', () => {
        const items = mockProps.dataItems.map(item => JSON.parse(JSON.stringify(item)));
        items.forEach(item => (item.groupId = '000'));

        items[0].groupId = mockProps.dataItems[0].groupId;

        const groups = createGroups(items, mockProps.groups);
        expect(groups[0].count).toBe(1);
    });
});
