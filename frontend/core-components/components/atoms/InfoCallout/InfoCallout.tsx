import React, { FC, useState } from 'react';
import type { IInfoCalloutProps } from './InfoCallout.interface';
import { infoCalloutButtonStyles, infoCalloutIconStyles } from './InfoCallout.style';
import { useId } from '@fluentui/react-hooks';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { Callout } from '@fluentui/react/lib/components/Callout/Callout';
import { DirectionalHint } from '@fluentui/react/lib/components/Callout';

export const InfoCallout: FC<IInfoCalloutProps> = props => {
    const { iconAriaLabel, calloutStyles, hintDirection = DirectionalHint.rightCenter, children } = props;
    const [isCalloutVisible, setCalloutVisible] = useState(false);

    const toggleIsCalloutVisible = () => setCalloutVisible(!isCalloutVisible);
    const calloutButtonId = useId('info-callout');

    return (
        <>
            <IconButton
                data-testid="info-callout-icon"
                styles={infoCalloutButtonStyles}
                iconProps={{ iconName: 'Info', styles: infoCalloutIconStyles }}
                onClick={toggleIsCalloutVisible}
                id={calloutButtonId}
                ariaLabel={iconAriaLabel}
            />
            {isCalloutVisible && (
                <Callout
                    ariaLabelledBy={calloutButtonId}
                    role="alertdialog"
                    gapSpace={0}
                    target={`#${calloutButtonId}`}
                    directionalHint={hintDirection}
                    onDismiss={toggleIsCalloutVisible}
                    setInitialFocus
                    styles={calloutStyles}
                >
                    {children}
                </Callout>
            )}
        </>
    );
};

export default InfoCallout;
