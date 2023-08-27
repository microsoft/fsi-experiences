import React, { FC } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { DataBox } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { dataBoxTokens, phoneAndEmailStackTokens, sectionTextStyle } from '../../../styles/Common.style';
import { LoanPrimaryApplicantMetadata } from '../../../interfaces/ILoanPrimaryApplicant/ILoanPrimaryApplicant';
import { primaryDataPhoneEmailSectionStyle } from './PrimaryDataPhoneAndEmailSection.style';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';

const TextSection: FC<{ label: string | undefined; text: string }> = ({ label, text }) => (
    <DataBox boxDetails={{ label }} stackTokens={dataBoxTokens}>
        <OverflowText styles={sectionTextStyle} text={text} />
    </DataBox>
);

export const PrimaryDataPhoneAndEmailSection: FC<{ phone: string; email: string; metadata: LoanPrimaryApplicantMetadata | undefined }> = ({
    phone,
    email,
    metadata,
}) => {
    if (!phone && !email) return null;

    return (
        <>
            <Divider />
            <Stack styles={primaryDataPhoneEmailSectionStyle} tokens={phoneAndEmailStackTokens} data-testid="phone-email-data">
                {phone && <TextSection label={metadata?.phoneNumber?.displayName} text={phone} />}
                {email && <TextSection label={metadata?.emailAddress?.displayName} text={email} />}
            </Stack>
        </>
    );
};

export default PrimaryDataPhoneAndEmailSection;
