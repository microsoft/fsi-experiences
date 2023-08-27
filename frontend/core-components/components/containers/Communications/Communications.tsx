import React, { FC } from 'react';
import { IStackStyles, IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { CommunicationItem } from './CommunicationItem';
import { PreferredContactMethod } from '../../../enums/PreferredContactMethod';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';

interface CommunicationsProps {
    preferred?: number;
    doNotPostalMail?: boolean;
    doNotEmail?: boolean;
    doNotPhone?: boolean;
    contactMethodToId: Map<PreferredContactMethod, number>;
    styles?: IStackStyles;
}

export const Communications: FC<CommunicationsProps> = props => {
    const translate = useTranslation(namespaces.CUSTOMER_SNAPSHOT_CONTROL);

    const methodToIcon = [
        { contactMethod: PreferredContactMethod.Phone, icon: 'Phone', text: translate('PREFERRED_COMM_PHONE') },
        { contactMethod: PreferredContactMethod.Email, icon: 'Accounts', text: translate('PREFERRED_COMM_EMAIL') },
        { contactMethod: PreferredContactMethod.Mail, icon: 'Mail', text: translate('PREFERRED_COMM_MAIL') },
    ];

    return (
        <>
            <Stack horizontal horizontalAlign="center" tokens={stackTokens} styles={props.styles}>
                {methodToIcon.map((methodIcon, i) => {
                    const preferred = isPreferred(methodIcon.contactMethod, props.contactMethodToId, props.preferred);
                    return (
                        <CommunicationItem
                            key={i}
                            contactMethod={methodIcon.contactMethod}
                            iconName={methodIcon.icon}
                            text={preferred ? methodIcon.text : ''}
                            isPreferred={preferred}
                        />
                    );
                })}
            </Stack>
        </>
    );
};

const stackTokens: IStackTokens = {
    childrenGap: 26,
    padding: '10px 0px 24px 0px',
};

const isPreferred = (contactMethod: PreferredContactMethod, contactMethodToId: Map<PreferredContactMethod, number>, preferred?: number) => {
    const contactMethodId = contactMethodToId.get(contactMethod);
    const anyId = contactMethodToId.get(PreferredContactMethod.Any);

    if ((contactMethodId && contactMethodId === preferred) || (anyId && anyId === preferred)) return true;
    return false;
};

export default Communications;
