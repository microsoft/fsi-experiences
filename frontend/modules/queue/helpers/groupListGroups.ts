import { useMemo } from 'react';
import { createGroups } from './createGroups';


const groupListGroups = (dataItems, groups) => useMemo(() => {
    const createdGroups = createGroups(dataItems, groups);
    return createdGroups.length > 0 ? createdGroups : undefined; // undefined forces <GroupedList> to display all items, ungrouped, if no groups provided
}, [dataItems, groups]);

export default groupListGroups;
