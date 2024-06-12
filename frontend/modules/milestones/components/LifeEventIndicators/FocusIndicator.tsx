import React, { CSSProperties, FC } from 'react';
import { FocusCircleStyle } from './Indicators.style';

export interface IFocusIndicatorProps {
    hide: boolean;
    style?: CSSProperties;
}

const FocusIndicator: FC<IFocusIndicatorProps> = ({ hide, style = {} }) => {
    return <div style={hide ? { display: 'none' } : { ...FocusCircleStyle, ...style }}></div>;
};
export default FocusIndicator;
