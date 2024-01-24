import { IPersonaProps } from '@fluentui/react/lib/components/Persona/Persona.types';

export interface ILinkablePersonaProps {
    customerName: string;
    secondaryText?: string;
    customerId: string;
    contactImageUrl?: string;
    isClickable?: boolean;
    hidePersonaDetails?: boolean;
    personaProps?: IPersonaProps;
}
