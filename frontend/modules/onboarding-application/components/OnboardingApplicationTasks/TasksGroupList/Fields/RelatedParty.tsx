import { Icon } from '@fluentui/react/lib/components/Icon';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import OverflowText from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React from 'react';
import { ONBOARDING_APPLICATION_TASKS } from '../../../../constants/namespaces.const';
import { associatedWIconStyle, associatedWithRoleTextStyles, associatedWPersonaIconStyle } from '../TasksGroupList.style';
import { contactTitleStyles } from './Fields.style';
import { isApplicationTask } from '../../../../helpers/isApplicationLevel';

export const RelatedParty = ({ item }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    return (
        <Stack styles={contactTitleStyles}>
            {isApplicationTask(item.taskDefinition.associationType) ? (
                <>
                    <Icon iconName="TextDocument" styles={associatedWIconStyle}></Icon>
                    <OverflowText text={item.taskDefinition.applicationName} overflowModeSelf />
                </>
            ) : (
                <>
                    <Icon styles={associatedWPersonaIconStyle} iconName="Contact"></Icon>
                    <OverflowText text={`${item.relatedParty!.name} (${item.relatedParty!.role!})`} overflowModeSelf>
                        <span data-testid="associated-with-contact">{item.relatedParty!.name}</span>{' '}
                        <span style={associatedWithRoleTextStyles}>{`(${
                            item.relatedParty!.isPrimary ? translate('PRIMARY_APPLICANT') : item.relatedParty!.role!
                        })`}</span>
                    </OverflowText>
                </>
            )}
        </Stack>
    );
};
