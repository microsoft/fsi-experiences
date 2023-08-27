import React, { FC } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { ILoanPrimaryApplicant, LoanPrimaryApplicantMetadata } from '../../../interfaces/ILoanPrimaryApplicant/ILoanPrimaryApplicant';
import { summaryDataStyles } from '../../../styles/Common.style';
import { PrimaryDataMainSection } from '../PrimaryDataMainSection/PrimaryDataMainSection';
import { PrimaryDataLoanParties } from '../PrimaryDataLoanParties/PrimaryDataLoanParties';
import { PrimaryDataPhoneAndEmailSection } from '../PrimaryDataPhoneAndEmailSection/PrimaryDataPhoneAndEmailSection';
import { PrimaryDataKycSection } from '../PrimaryDataKycSection/PrimaryDataKycSection';

export interface IPrimaryApplicantDataProps {
    loanPrimaryApplicant: ILoanPrimaryApplicant;
    metadata: LoanPrimaryApplicantMetadata | undefined;
}

const stackTokens = { childrenGap: '20px' };

export const PrimaryApplicantData: FC<IPrimaryApplicantDataProps> = ({ loanPrimaryApplicant, metadata }) => {
    return (
        <Stack styles={summaryDataStyles} tokens={stackTokens} data-testid="primary-applicant-data">
            <PrimaryDataMainSection loanPrimaryApplicant={loanPrimaryApplicant} />
            <PrimaryDataPhoneAndEmailSection
                phone={loanPrimaryApplicant.contact.phoneNumber}
                email={loanPrimaryApplicant.contact.emailAddress}
                metadata={metadata}
            />
            <PrimaryDataKycSection kycStatus={loanPrimaryApplicant.kycStatus} metadata={metadata} />
            <PrimaryDataLoanParties parties={loanPrimaryApplicant.additionalParties} />
        </Stack>
    );
};

export default PrimaryApplicantData;
