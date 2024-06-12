import React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { IGroupMember } from '../../../../../interfaces/Groups';

const onRenderMemberName = (item: IGroupMember) => (
    <Persona styles={{ root: { height: '100%' } }} text={item.customer.name} size={PersonaSize.size24} />
);

export default onRenderMemberName;
