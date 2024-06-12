import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { InstancesCircle, InstancesTextOfInstances, InstancesTextOfX } from './Indicators.style';

export interface IInstancesCountProps {
    instances: number;
    hide: boolean;
}

const InstancesCount: FC<IInstancesCountProps> = ({ instances, hide }) => {
    return (
        <div style={hide ? { display: 'none' } : InstancesCircle}>
            <Stack horizontal>
                <div style={InstancesTextOfX}>x </div>
                <div style={InstancesTextOfInstances}>{instances}</div>
            </Stack>
        </div>
    );
};

export default InstancesCount;
