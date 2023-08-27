import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { ILoanPrimaryApplicantFetcher } from '../../interfaces/ILoanPrimaryApplicant/ILoanPrimaryApplicantFetcher';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { PrimaryApplicantData } from './PrimaryApplicantData/PrimaryApplicantData';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';

export interface ILoanPrimaryApplicantProps {
    fetcher: ILoanPrimaryApplicantFetcher;
    loanApplicationId: string;
}

export const LoanPrimaryApplicant: FC<ILoanPrimaryApplicantProps> = ({ fetcher, loanApplicationId }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);
    const {
        isLoading,
        data: loanPrimaryApplicant,
        isError,
        refetch,
    } = useQuery('primaryApplicantSectionQuery', () => fetcher.getLoanPrimaryApplicant());
    const {
        isLoading: isLoanMetadataLoading,
        data: loanPrimaryApplicantMetadata,
        isError: isLoanMetadataError,
    } = useQuery('primaryApplicantSectionMetadataQuery', () => fetcher.getLoanPrimaryApplicantMetadata());

    const { messages: saveChangesMessages } = useBrowserCommunication(`loanapp-change-${loanApplicationId}`);
    useEffect(() => {
        if (saveChangesMessages[saveChangesMessages.length - 1] === loanApplicationId) {
            refetch();
        }
    }, [saveChangesMessages, loanApplicationId]);
    return (
        <InfoSection
            mainTitle={translate('LOAN_PRIMARY_APPLICANT_SECTION_TITLE')}
            isError={isError || isLoanMetadataError}
            isLoading={isLoading || isLoanMetadataLoading}
        >
            {loanPrimaryApplicant && <PrimaryApplicantData loanPrimaryApplicant={loanPrimaryApplicant} metadata={loanPrimaryApplicantMetadata} />}
        </InfoSection>
    );
};

export default LoanPrimaryApplicant;
