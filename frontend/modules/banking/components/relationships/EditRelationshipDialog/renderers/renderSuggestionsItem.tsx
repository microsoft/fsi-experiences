import { Persona, PersonaSize } from '@fluentui/react/lib/components/Persona';
import React from 'react';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';

const renderSuggestionsItems = (item: IAbbreviatedContact) => (
    <Persona
        data-testid={`relationship-contact-persona-${item.contactId}`}
        key={item.contactId}
        styles={{ root: { margin: '6px' } }}
        text={item.fullName}
        size={PersonaSize.size32}
    />
);

export default renderSuggestionsItems;
