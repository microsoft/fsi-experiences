import React, { FC } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { DataBox } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { ILoanParty } from '../../../interfaces/ILoanParty/ILoanParty';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { basicStackTokens, partyPersonaNameTextStyle } from '../../../styles/Common.style';

const tokensStyle = { childrenGap: 6 };

const onRenderPrimaryText = props => <Text styles={partyPersonaNameTextStyle}>{props?.text}</Text>;

export const PrimaryDataLoanParties: FC<{ parties: ILoanParty[] }> = ({ parties }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);

    if (parties.length === 0) return null;

    return (
        <>
            <Divider />
            <DataBox boxDetails={{ label: translate('LOAN_PRIMARY_APPLICANT_ADDITIONAL_PARTIES_TEXT') }} stackTokens={tokensStyle}>
                <Stack tokens={basicStackTokens} data-testid="parties-data">
                    {parties.map(party => (
                        <Persona
                            data-testid="persona"
                            key={party.id}
                            size={PersonaSize.size32}
                            text={party.name}
                            onRenderPrimaryText={onRenderPrimaryText}
                            secondaryText={party.role}
                            showSecondaryText
                        />
                    ))}
                </Stack>
            </DataBox>
        </>
    );
};

export default PrimaryDataLoanParties;
