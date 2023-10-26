import React, { FC, useContext } from 'react';
import { GroupsContext } from './GroupsContext';

export const MOCKED_GROUP_CONTEXT_TEXT = 'MOCKED_GROUP_CONTEXT_TEXT';
export interface IGroupsContextMockProps {
    context: any;
}

export const GroupsContextChildMock: FC<IGroupsContextMockProps> = ({ context }) => {
    context.value = useContext(GroupsContext);

    return <div>{MOCKED_GROUP_CONTEXT_TEXT}</div>;
};
export default GroupsContextChildMock;
