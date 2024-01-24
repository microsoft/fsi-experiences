import React, { FC, useContext } from 'react';
import { FSIContext } from './FSIContext';

export const MOCKED_FSI_CONTEXT_TEXT = 'MOCKED_FSI_CONTEXT_TEXT';
export interface IFSIContextMockProps {
    context: any;
}

export const FSIContextChildMock: FC<IFSIContextMockProps> = ({ context }) => {
    context.value = useContext(FSIContext);

    return <div>{MOCKED_FSI_CONTEXT_TEXT}</div>;
};
export default FSIContextChildMock;
