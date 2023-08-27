/* istanbul ignore file */
import React from 'react';
import { FSIContainer, FSIContextValue } from '../../context/FSIContext';
import ProviderWrapper from './ProviderWrapper';

const FSIProviderWrapper =
    <P extends unknown>(Component: React.FC<P>, contextValue?: Partial<FSIContextValue>): React.FC<P> =>
    props => {
        const TestingQueryProvider = ProviderWrapper(Component);
        return (
            <FSIContainer {...contextValue}>
                <TestingQueryProvider {...props} />
            </FSIContainer>
        );
    };

export default FSIProviderWrapper;
