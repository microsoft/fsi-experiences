import React, { FC } from 'react';
import { ILoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilitiesFetcher';
import { useQuery } from 'react-query';
import PartyAssetsLiabilities from '../LoanPartyWithAssetsLiabilities';
import useAssetsAndLiabilities from '../../hooks/useAssetsAndLiabilities/useAssetsAndLiabilities';

export interface ILoanAssetsAndLiabilitiesProps {
    fetcher: ILoanAssetsAndLiabilitiesFetcher;
}

export const LoanAssetsAndLiabilities: FC<ILoanAssetsAndLiabilitiesProps> = ({ fetcher }) => {
    const {
        isLoading: isPrimaryLoading,
        data: primaryApplicantData,
        isError: isPrimaryError,
    } = useQuery('getPrimaryApplicantQuery', () => fetcher.getPrimaryApplicantData());
    const { isLoading, loanAssetsAndLiabilities, isError } = useAssetsAndLiabilities({
        assetsAndLiabilitiesFetcherFunc: async () => await fetcher.getAssetsAndLiabilities(),
        applicantId: primaryApplicantData?.id,
    });

    return (
        <PartyAssetsLiabilities
            applicantName={primaryApplicantData?.firstName}
            allPartiesAssets={loanAssetsAndLiabilities.totalAssets}
            allPartiesLiabilities={loanAssetsAndLiabilities.totalLiabilities}
            applicantAssets={loanAssetsAndLiabilities.applicantTotalAssets}
            applicantLiabilities={loanAssetsAndLiabilities.applicantTotalLiabilities}
            currencyId={loanAssetsAndLiabilities?.currencyId}
            isError={isPrimaryError || isError}
            isLoading={isPrimaryLoading || isLoading}
            showOnlyCombinedData
        />
    );
};

export default LoanAssetsAndLiabilities;
