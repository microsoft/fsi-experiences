import React, { FC } from 'react';
import useResponsiveContainer from '../../../context/hooks/useResponsiveContainer';
import { DEFAULT_COLUMN_PREFIX } from '../../../utilities/responsive/ResponsiveUtil';
import { ResponsiveContainerContext } from './ResponsiveContainer.context';
import type { IResponsiveContainerProps } from './ResponsiveContainer.interface';
import { ResponsiveContainerStyles } from './ResponsiveContainer.style';

const ResponsiveContainer: FC<IResponsiveContainerProps> = props => {
    const { children, classPrefix = DEFAULT_COLUMN_PREFIX, style } = props;

    const containerProps = useResponsiveContainer(classPrefix);

    return (
        <ResponsiveContainerContext.Provider value={containerProps}>
            <div
                data-testid="responsive-container"
                className={`${containerProps.className} ${ResponsiveContainerStyles}`}
                ref={containerProps.ref}
                style={style}
            >
                {children}
            </div>
        </ResponsiveContainerContext.Provider>
    );
};

export default ResponsiveContainer;
