import { useContext } from 'react';
import FSIContext, { FSIContextValue } from '../FSIContext';

export const useFSIContext = (): FSIContextValue => {
    const context = useContext(FSIContext);

    return context;
};
