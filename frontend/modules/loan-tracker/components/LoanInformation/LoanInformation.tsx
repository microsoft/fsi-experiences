import { useQuery } from 'react-query';
import React, { FC, useEffect } from 'react';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ILoanInformationFetcher } from '../../interfaces/ILoanInformation/ILoanInformationFetcher';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { LoanData } from './LoanData';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';

export interface ILoanInformationProps {
    loanApplicationId: string;
    fetcher: ILoanInformationFetcher;
}
export const LoanInformation: FC<ILoanInformationProps> = ({ fetcher, loanApplicationId }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);
    const {
        isLoading,
        data: loanInformation,
        isError,
        refetch,
    } = useQuery(translate('LOAN_INFO_MAIN_SECTION_TITLE'), () => fetcher.getLoanInformation());
    const {
        isLoading: isLoanMetadataLoading,
        data: loanInformationMetadata,
        isError: isLoanMetadataError,
    } = useQuery('loanInformationMetadataQuery', () => fetcher.getLoanInformationMetadata());

    const { messages: saveChangesMessages } = useBrowserCommunication(`loanapp-change-${loanApplicationId}`);

    useEffect(() => {
        if (saveChangesMessages[saveChangesMessages.length - 1] === loanApplicationId) {
            refetch();
        }
    }, [saveChangesMessages, loanApplicationId]);

    return (
        <InfoSection
            mainTitle={translate('LOAN_INFO_MAIN_SECTION_TITLE')}
            isError={isError || isLoanMetadataError}
            isLoading={isLoading || isLoanMetadataLoading}
        >
            {loanInformation && <LoanData loanInformation={loanInformation} metadata={loanInformationMetadata} />}
        </InfoSection>
    );
};

export default LoanInformation;
