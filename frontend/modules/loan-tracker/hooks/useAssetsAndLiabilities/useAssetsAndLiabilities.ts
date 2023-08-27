import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IAsset, ILoanApplicationAssetsAndLiabilities, ILiability } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilities';
import { calculateFinancialValues } from '../../helpers/calculateFinancialValues/calculateFinancialValues';
import { assetsAndLiabilitiesQuery } from '../../constants/ApplicantFinancialItemCategories.consts';

export interface IUseAssetsAndLiabilitiesProps {
    assetsAndLiabilitiesFetcherFunc: () => Promise<ILoanApplicationAssetsAndLiabilities>;
    applicantId?: string;
}

export interface IUseAssetsAndLiabilitiesResponse {
    loanAssetsAndLiabilities: {
        totalAssets: number;
        totalLiabilities: number;
        applicantTotalAssets: number;
        applicantTotalLiabilities: number;
        currencyId: string;
    };
    isError: boolean;
    isLoading: boolean;
    assets?: IAsset[];
    liabilities?: ILiability[];
}

export const useAssetsAndLiabilities: (props: IUseAssetsAndLiabilitiesProps) => IUseAssetsAndLiabilitiesResponse = ({
    assetsAndLiabilitiesFetcherFunc,
    applicantId,
}) => {
    const { isLoading, data: assetsAndLiabilities, isError } = useQuery(assetsAndLiabilitiesQuery, () => assetsAndLiabilitiesFetcherFunc());

    const assetsData = useMemo(() => calculateFinancialValues(assetsAndLiabilities?.assets || [], applicantId), [assetsAndLiabilities, applicantId]);
    const liabilitiesData = useMemo(
        () => calculateFinancialValues(assetsAndLiabilities?.liabilities || [], applicantId),
        [assetsAndLiabilities, applicantId]
    );

    const loanAssetsAndLiabilities = {
        totalAssets: assetsData.total,
        totalLiabilities: liabilitiesData.total,
        applicantTotalAssets: assetsData.applicantTotal,
        applicantTotalLiabilities: liabilitiesData.applicantTotal,
        currencyId: assetsAndLiabilities?.currencyId || '',
    };

    return { assets: assetsAndLiabilities?.assets, liabilities: assetsAndLiabilities?.liabilities, loanAssetsAndLiabilities, isError, isLoading };
};

export default useAssetsAndLiabilities;
