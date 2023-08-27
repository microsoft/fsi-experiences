import React from 'react';
import { ContainerProperties } from '../../../context/hooks/useResponsiveContainer';

export interface ResponsiveContainerContextValue {
    containerProps: ContainerProperties;
}

export const ResponsiveContainerContext = React.createContext<ContainerProperties>({
    columns: 12,
});
