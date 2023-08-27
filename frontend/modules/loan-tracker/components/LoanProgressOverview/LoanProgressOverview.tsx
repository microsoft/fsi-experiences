import React, { FC } from 'react';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { ILoanProgressOverviewFetcher } from '../../interfaces/ILoanProgressOverview/ILoanProgressOverviewFetcher';
import { LoanProgressOverviewData } from './LoanProgressOverviewData';
import { useLoanProgressOverview, useLoanProgressOverviewProps } from '../../hooks/useLoanProgressOverview/useLoanProgressOverview';

export interface ILoanProgressOverviewProps extends useLoanProgressOverviewProps {
    fetcher: ILoanProgressOverviewFetcher;
    loanApplicationId: string;
}

export const LoanProgressOverview: FC<ILoanProgressOverviewProps> = ({ fetcher, loanApplicationId }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);
    const { isError, isLoading, loanProgressData } = useLoanProgressOverview({ fetcher, loanApplicationId });

    return (
        <InfoSection mainTitle={translate('LOAN_PROGRESS_SECTION_TITLE')} isError={isError} isLoading={isLoading}>
            {loanProgressData && <LoanProgressOverviewData loanProgressData={loanProgressData} />}
        </InfoSection>
    );
};

export default LoanProgressOverview;
