import React, { FC } from 'react';
import type { IScreenReaderTextProps } from './ScreenReaderText.interface';
import { srClassName } from './ScreenReaderText.style';

const ScreenReaderText: FC<IScreenReaderTextProps> = React.memo(props => {
    const { id, children } = props;

    return (
        <span {...props} id={id} className={srClassName} data-testid="screenReaderText">
            {children}
        </span>
    );
});

export default ScreenReaderText;
