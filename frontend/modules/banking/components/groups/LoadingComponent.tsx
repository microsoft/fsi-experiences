import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

export interface ILoadingComponentProps {
    msg: string;
}

const LoadingComponent: FC<ILoadingComponentProps> = ({ msg }) => {
    return (
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { width: '100%', height: '100%' } }}>
            <ProgressIndicator styles={{ root: { width: '50%' } }} label={msg} />
        </Stack>
    );
};
export default LoadingComponent;
