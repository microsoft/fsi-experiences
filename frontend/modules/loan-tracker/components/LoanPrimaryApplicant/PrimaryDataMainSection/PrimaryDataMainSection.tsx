import React, { FC } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { ILoanPrimaryApplicant } from '../../../interfaces/ILoanPrimaryApplicant/ILoanPrimaryApplicant';
import { getAgeInYears } from '@fsi/core-components/dist/utilities/TimeUtils';
import { Communications } from '@fsi/core-components/dist/components/containers/Communications/Communications';
import { contactMethodToId } from '@fsi/core-components/dist/constants/ContactMethodToId';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import { basicStackTokens, headerMainTextStyle, headerSecondaryTextStyle } from '../../../styles/Common.style';
import { communicationStyles, innerWrapperStyles } from './PrimaryDataMainSection.styles';

const formatAgeAndFamilyStatus = (birthDate?: Date, familyStatus?: string) => {
    const age = getAgeInYears(birthDate);
    return [age, familyStatus].filter(item => !!item).join(', ');
};

export const PrimaryDataMainSection: FC<{ loanPrimaryApplicant: ILoanPrimaryApplicant }> = ({ loanPrimaryApplicant }) => {
    return (
        <Stack horizontalAlign="center" data-testid="main-section" tokens={basicStackTokens}>
            <Persona size={PersonaSize.size40} text={loanPrimaryApplicant.contact.fullName} hidePersonaDetails />
            <Stack styles={innerWrapperStyles} tokens={{ childrenGap: 2 }} horizontalAlign="center">
                <OverflowText styles={headerMainTextStyle} text={loanPrimaryApplicant.contact.fullName} />
                {loanPrimaryApplicant.contact.birthdate && loanPrimaryApplicant.contact.familyStatus && (
                    <Text styles={headerSecondaryTextStyle}>
                        {formatAgeAndFamilyStatus(loanPrimaryApplicant.contact.birthdate, loanPrimaryApplicant.contact.familyStatus)}
                    </Text>
                )}
                <Communications
                    doNotEmail={loanPrimaryApplicant.contact.doNotEmail}
                    doNotPhone={loanPrimaryApplicant.contact.doNotPhone}
                    contactMethodToId={contactMethodToId}
                    styles={communicationStyles}
                />
            </Stack>
        </Stack>
    );
};

export default PrimaryDataMainSection;
