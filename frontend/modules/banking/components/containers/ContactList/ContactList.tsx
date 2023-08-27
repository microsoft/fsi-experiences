import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import { IContactListProps } from './ContactList.interface';
import { allContactsStyle, errorStateContactCardStyle, shimmerContactCardStyle } from './ContactList.style';
import Contact from '@fsi/core-components/dist/components/atoms/Contact/Contact';
import { getOptionSetText } from '../../../utilities/EntityMetadata';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { Shimmer, ShimmerElementType } from '@fluentui/react/lib/components/Shimmer';

const loadingContactsShimmer = [
    { type: ShimmerElementType.circle, height: 12 },
    { type: ShimmerElementType.gap, width: 6 },
    { type: ShimmerElementType.line, height: 12 },
];

const ContactList: FC<IContactListProps> = props => {
    const { contacts, roleMetaData, customersLoadingState } = props;

    if (customersLoadingState === LoadingState.Error) {
        return (
            <Stack>
                <ErrorState styles={errorStateContactCardStyle} />
            </Stack>
        );
    }

    if (customersLoadingState !== LoadingState.Success) {
        return (
            <Stack style={shimmerContactCardStyle} data-testid={`shimmer-progress`}>
                <Shimmer shimmerElements={loadingContactsShimmer} />
            </Stack>
        );
    }

    if (contacts.length === 0) {
        return <></>;
    }

    return (
        <Stack data-testid="contacts-wrapper" styles={allContactsStyle}>
            {contacts.map(contact => (
                <Contact
                    key={contact.contact.contactId}
                    contactName={contact.contact.fullName}
                    contactId={contact.contact.contactId}
                    role={getOptionSetText(contact.role, roleMetaData)}
                />
            ))}
        </Stack>
    );
};

export default ContactList;
