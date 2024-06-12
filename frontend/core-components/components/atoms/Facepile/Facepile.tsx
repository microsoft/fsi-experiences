import { IButtonProps } from '@fluentui/react/lib/components/Button/Button.types';
import { ICalloutProps } from '@fluentui/react/lib/components/Callout/Callout.types';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { Facepile as FluentFacepile } from '@fluentui/react/lib/components/Facepile/Facepile';
import { IFacepileProps, OverflowButtonType } from '@fluentui/react/lib/components/Facepile/Facepile.types';
import { HoverCard } from '@fluentui/react/lib/components/HoverCard';
import { HoverCardType } from '@fluentui/react/lib/components/HoverCard/HoverCard.types';
import { IPlainCardProps } from '@fluentui/react/lib/components/HoverCard/PlainCard/PlainCard.types';
import { Persona, PersonaSize } from '@fluentui/react/lib/components/Persona';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { hoverCardStyles, personaStyles, resizeWrapper } from './Facepile.styles';

const personaSize = 32;

const minEmptySpace = personaSize * 3;

export interface ICustomFacepile extends IFacepileProps {
    disableHoverCard?: boolean;
    autoSize?: boolean;
}

const personaMapper = (persona, idx) => (
    <Persona
        key={idx}
        text={persona.personaName}
        size={PersonaSize.size32}
        imageUrl={persona.imageUrl}
        onClick={persona.onClick}
        styles={personaStyles}
    />
);

const onRenderPlainCard =
    ({ personas, maxDisplayablePersonas }) =>
    () =>
        <Stack tokens={{ childrenGap: 12 }}>{personas.slice(maxDisplayablePersonas, personas.length).map(personaMapper)}</Stack>;

const onRenderChildren =
    ({ personas, maxDisplayablePersonas, disableHoverCard }) =>
    childrenProps => {
        const plainCardProps: IPlainCardProps = {
            onRenderPlainCard: onRenderPlainCard({ personas, maxDisplayablePersonas }),
            directionalHint: DirectionalHint.bottomCenter,
            styles: hoverCardStyles,
            calloutProps: {
                isBeakVisible: true,
            },
        };

        if (disableHoverCard) {
            return childrenProps.children;
        }

        return (
            <HoverCard cardOpenDelay={0} plainCardProps={plainCardProps} type={HoverCardType.plain}>
                {childrenProps.children}
            </HoverCard>
        );
    };

const Facepile: FC<ICustomFacepile> = ({ personas, maxDisplayablePersonas, disableHoverCard, autoSize, ...props }) => {
    const shouldResize = personas.length > 1 && autoSize;

    const { width, ref } = useResizeDetector({ handleHeight: false, refreshMode: 'throttle', handleWidth: shouldResize });

    const customMaxDisplayablePersonas =
        shouldResize && width ? Math.max(Math.floor((width - minEmptySpace) / personaSize), 1) : maxDisplayablePersonas;

    const overflowButtonProps: IButtonProps = useMemo(
        () => ({
            onRenderChildren: onRenderChildren({ personas, maxDisplayablePersonas: customMaxDisplayablePersonas, disableHoverCard }),
        }),
        [personas, customMaxDisplayablePersonas, disableHoverCard]
    );

    const facepile = (
        <FluentFacepile
            overflowButtonProps={overflowButtonProps}
            overflowButtonType={OverflowButtonType.descriptive}
            personas={personas}
            maxDisplayablePersonas={customMaxDisplayablePersonas}
            {...props}
        />
    );

    if (shouldResize) {
        return (
            <div style={resizeWrapper} ref={ref}>
                {facepile}
            </div>
        );
    }

    return facepile;
};

export default Facepile;
