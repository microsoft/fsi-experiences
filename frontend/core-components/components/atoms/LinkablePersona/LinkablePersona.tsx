import React, { FC, useCallback, useMemo } from 'react';
import Facepile from '../Facepile';
import { facepileStyles } from './LinkablePersona.style';
import { IPersonaProps, PersonaSize } from '@fluentui/react/lib/components/Persona';
import isNil from 'lodash/isNil';
import { ICustomFacepile } from '../Facepile/Facepile';
import { useOpenForm } from '../../../context/hooks/useOpenForm';

interface ILinkablePersona extends ICustomFacepile {
    personaProps?: IPersonaProps;
}

export const LinkablePersona: FC<ILinkablePersona> = ({ personas, personaProps, ...rest }) => {
    const openContactForm = useOpenForm({ entity: 'contact' });
    const getPersonaProps = useCallback(
        persona => ({ ...persona, ...personaProps, showSecondaryText: !isNil(personaProps?.secondaryText), ['data-testid']: 'clickable-persona' }),
        [personaProps]
    );

    const customPersonas = useMemo(
        () => personas.map(persona => ({ ...persona, onClick: () => openContactForm(persona.data.id) })),
        [openContactForm, personas]
    );

    return (
        <Facepile
            data-is-focusable
            getPersonaProps={getPersonaProps}
            personaSize={PersonaSize.size24}
            personas={customPersonas}
            styles={facepileStyles}
            {...rest}
        />
    );
};

export default LinkablePersona;
