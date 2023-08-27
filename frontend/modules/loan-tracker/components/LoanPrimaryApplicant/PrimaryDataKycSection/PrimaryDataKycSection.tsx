import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { DataBox } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { dataBoxTokens, headerMainTextStyle } from '../../../styles/Common.style';
import { LoanPrimaryApplicantMetadata } from '../../../interfaces/ILoanPrimaryApplicant/ILoanPrimaryApplicant';

export const PrimaryDataKycSection: FC<{ kycStatus: string; metadata: LoanPrimaryApplicantMetadata | undefined }> = ({ kycStatus, metadata }) => {
    if (!kycStatus) return null;

    return (
        <>
            <Divider />
            <DataBox boxDetails={{ label: metadata?.kycStatus?.displayName }} stackTokens={dataBoxTokens}>
                <Text styles={headerMainTextStyle}>{kycStatus}</Text>
            </DataBox>
        </>
    );
};

export default PrimaryDataKycSection;
