import { ProgressIndicator } from '@fluentui/react/lib/components/ProgressIndicator/ProgressIndicator';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import type { IProgressbarProps } from './Progressbar.interface';
import { getClassNames, getDefaultProgressIndicatorStyle } from './Progressbar.style';

export const Progressbar: FC<IProgressbarProps> = props => {
    const { percentComplete, label, description, asideText, indicatorProps, styles: externalStyles } = props;

    const indicatorPercents = percentComplete / 100;

    const progressIndicatorDefaultStyle = getDefaultProgressIndicatorStyle(indicatorProps?.styles);
    const styles = getClassNames(externalStyles);

    return (
        <Stack className={styles.container} data-testid="progressbar-container">
            <ProgressIndicator
                {...indicatorProps}
                percentComplete={indicatorPercents}
                label={label}
                description={description}
                styles={progressIndicatorDefaultStyle}
            />
            {asideText && <span className={styles.asideText}>{asideText}</span>}
        </Stack>
    );
};

export default Progressbar;
