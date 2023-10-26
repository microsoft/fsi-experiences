import React, { FC, useContext } from 'react';
import { RelationshipsContext } from './RelationshipsContext';

export const MOCKED_RELATIONSHIP_CONTEXT_TEXT = 'MOCKED_RELATIONSHIP_CONTEXT_TEXT';
export interface IRelationshipContextMockProps {
    context: any;
}

export const RelationshipsContextChildMock: FC<IRelationshipContextMockProps> = ({ context }) => {
    context.value = useContext(RelationshipsContext);

    return <div>{MOCKED_RELATIONSHIP_CONTEXT_TEXT}</div>;
};

export default RelationshipsContextChildMock;
