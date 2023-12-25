import React, { FC, useCallback, useMemo } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { useOpenForm } from '../../../context/hooks/useOpenForm';
import { IContactProps } from './Contact.interface';
import { getContactClassNames } from './Contact.style';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useTranslation } from '../../../context/hooks/useTranslation';
import { useId } from '@fluentui/react-hooks/lib/useId';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';

export const Contact: FC<IContactProps> = props => {
    const { contactName, contactId, role, entity = 'contact', clickable = true, overrideOnClick, styles } = props;
    const openContactForm = useOpenForm({ entity });
    const translate = useTranslation();
    const srContactButtonDescriptionID = useId('srContactButtonDescription');

    const classNames = useMemo(() => getContactClassNames(styles, clickable), [styles, clickable]);

    const handleClick = useCallback(() => {
        if (!clickable) {
            return;
        }
        if (overrideOnClick) {
            overrideOnClick();
        } else {
            openContactForm(contactId);
        }
    }, [openContactForm, contactId, clickable, overrideOnClick]);

    return (
        <>
            <DefaultButton
                className={classNames.containerButton}
                aria-describedby={srContactButtonDescriptionID}
                key={contactId}
                data-testid="test-contact"
                onClick={handleClick}
            >
                <Icon className={classNames.icon} iconName="Contact"></Icon>
                <Stack horizontal className={classNames.textWrapper} title={`${contactName} (${role})`}>
                    <Text className={classNames.text}>{contactName}</Text>
                    {role && <Text data-testid="contact-role" className={classNames.role}>{`(${role})`}</Text>}
                </Stack>
            </DefaultButton>
            <ScreenReaderText id={srContactButtonDescriptionID}>
                {translate('CONTACT_BUTTON_DESCRIPTION', { contactName: contactName })}
            </ScreenReaderText>
        </>
    );
};

export default Contact;
