import { IGroup } from '@fluentui/react/lib/components/GroupedList/GroupedList.types';
import { IQueueListItem } from '../components/QueueList';
import { IQueueGroup } from '../interfaces/IQueueGroup.interface';

export const createGroups = (dataItems: IQueueListItem[], queueGroups: IQueueGroup): IGroup[] => {
    const groups = new Map();

    for (const key in queueGroups) {
        const name = queueGroups[key].name;

        groups.set(key, { key: key, count: 0, startIndex: -1, name });
    }

    dataItems.forEach((slot, index) => {
        if (!groups.has(slot.groupId)) return;

        const group = groups.get(slot.groupId);

        if (group.count === 0) {
            group.startIndex = index;
        }

        group.count++;
    });

    return Array.from(groups.values());
};