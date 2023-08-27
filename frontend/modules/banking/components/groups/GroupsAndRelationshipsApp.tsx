import React, { FC } from 'react';
import GroupsContextProvider from './contexts/GroupsContext';
import { IGroupFetcher } from '../../interfaces/Groups/IGroupFetcher';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import GroupsAndRelationshipsMainApp from './GroupsAndRelationshipsMainApp/GroupsAndRelationshipsMainApp';
import RelationshipsContextProvider from '../../components/relationships/context/RelationshipsContext';
import { GROUPS_APP_RESPONSIVE_CLASS } from './GroupsAndRelationshipsApp.const';
import { IRelationshipFetcher } from '../../interfaces/Relationships/IRelationshipFetcher';

export interface IGroupsAndRelationshipsAppProps {
    groupsFetcher: IGroupFetcher;
    contactId: string;
    relationshipsFetcher: IRelationshipFetcher;
}

export const GroupsAndRelationshipsApp: FC<IGroupsAndRelationshipsAppProps> = ({ groupsFetcher, contactId, relationshipsFetcher }) => {
    return (
        <GroupsContextProvider contactId={contactId} fetcher={groupsFetcher} data-testid="group-app">
            <RelationshipsContextProvider fetcher={relationshipsFetcher} contactId={contactId}>
                <ResponsiveContainer classPrefix={GROUPS_APP_RESPONSIVE_CLASS}>
                    <GroupsAndRelationshipsMainApp />
                </ResponsiveContainer>
            </RelationshipsContextProvider>
        </GroupsContextProvider>
    );
};
export default GroupsAndRelationshipsApp;
