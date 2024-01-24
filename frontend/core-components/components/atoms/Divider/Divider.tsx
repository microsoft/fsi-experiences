import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import React, { FC } from 'react';
import type { IDividerProps } from './Divider.interface';
import { getClassName } from './Divider.style';

export const Divider: FC<IDividerProps> = React.memo(props => {
    const baseClassName = getClassName(props.customClassName);

    return <Separator className={baseClassName} {...props} />;
});

export default Divider;
