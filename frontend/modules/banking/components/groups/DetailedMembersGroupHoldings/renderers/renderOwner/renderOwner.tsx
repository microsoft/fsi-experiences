import { PersonaSize } from '@fluentui/react/lib/components/Persona/Persona.types';
import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import { LinkablePersona } from '@fsi/core-components/dist/components/atoms/LinkablePersona/LinkablePersona';
import { overflownPersona } from './renderOwner.style';

const renderOwner =
    ({ hidePersonaDetails }) =>
    (groupHolding: IGroupFinancialHolding) => {
        if (!groupHolding?.owners.length) {
            return '';
        }

        const personas = groupHolding.owners.map(owner => ({
            personaName: owner.contact.fullName,
            data: { ...owner.contact, id: owner.contact.contactId },
        }));

        return (
            <LinkablePersona
                autoSize
                styles={overflownPersona}
                personaSize={PersonaSize.size24}
                personas={personas}
                personaProps={{ hidePersonaDetails }}
            />
        );
    };

export default renderOwner;
