import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { ApplicantFinancialCategoryOption } from '../../constants/ApplicantFinancialItemCategories.consts';
import { IAsset, ILiability } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilities';
import { ILoanApplicationCustomer } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';
import { ILoanApplicationAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanApplicationAssetsAndLiabilitiesFetcher';
import { useAssetsAndLiabilities, IUseAssetsAndLiabilitiesResponse } from '../useAssetsAndLiabilities/useAssetsAndLiabilities';
import useLoanCustomerLookup, { IUseLoanCustomerLookupOutput } from '../useLoanCustomer/useLoanCustomer';
import { customerWithAssetsAndLiabilitiesQuery } from '../../constants/LoanQueries.consts';

interface IUseLoanCustomerAssetsAndLiabilities {
    fetcher: ILoanApplicationAssetsAndLiabilitiesFetcher;
    loanApplicationId: string;
}

interface IUseLoanCustomerAssetsAndLiabilitiesOutput extends IUseLoanCustomerLookupOutput, IUseAssetsAndLiabilitiesResponse {
    assets?: IAsset[];
    liabilities?: ILiability[];
    selectedApplicant?: ILoanApplicationCustomer;
    assetTypes: IDropdownOption[];
    liabilityTypes: IDropdownOption[];
    hasFinancialItemPrivilege: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
}

const useLoanCustomerAssetsAndLiabilities = ({
    fetcher,
    loanApplicationId,
}: IUseLoanCustomerAssetsAndLiabilities): IUseLoanCustomerAssetsAndLiabilitiesOutput => {
    const {
        isLoanLocked,
        applicants,
        selectedApplicantId,
        onChangeApplicant,
        onVerifyToggle,
        isLoading: isLoadingParty,
        isError: isErrorParty,
        hasApplicantPrivilege,
    } = useLoanCustomerLookup({ queryName: customerWithAssetsAndLiabilitiesQuery, fetcher, loanApplicationId });
    const {
        isLoading: IsLoadingAssetsAndLiabilities,
        assets,
        liabilities,
        loanAssetsAndLiabilities,
        isError: assetsAndLiabilitiesIsError,
    } = useAssetsAndLiabilities({
        assetsAndLiabilitiesFetcherFunc: async () => await fetcher.getAssetsAndLiabilities(),
        applicantId: selectedApplicantId,
    });

    const {
        isLoading: assetAndLiabilityIsLoading,
        data,
        isError: assetAndLiabilityTypeError,
    } = useQuery('loanAssetsAndLiabilitiesTypes', () => fetcher.getAssetsAndLiabilitiesTypes());

    const isError = assetsAndLiabilitiesIsError || isErrorParty || assetAndLiabilityTypeError;
    const isLoading = IsLoadingAssetsAndLiabilities || isLoadingParty || assetAndLiabilityIsLoading;
    const selectedApplicant = useMemo(() => applicants?.find(applicant => applicant.id === selectedApplicantId), [applicants, selectedApplicantId]);

    const applicantAssets = useMemo(() => assets?.filter(asset => asset.customerId === selectedApplicant?.id), [assets, selectedApplicant]);

    const applicantLiabilities = useMemo(
        () => liabilities?.filter(asset => asset.customerId === selectedApplicant?.id),
        [liabilities, selectedApplicant]
    );

    const hasFinancialItemPrivilege = useCallback(
        (category: ApplicantFinancialCategoryOption, operation: number) => fetcher.hasFinancialItemPrivilege(category, operation) && !isLoanLocked,
        [isLoanLocked, fetcher]
    );

    return {
        loanAssetsAndLiabilities,
        isError,
        assets: applicantAssets,
        liabilities: applicantLiabilities,
        isLoading,
        onChangeApplicant,
        onVerifyToggle,
        selectedApplicantId,
        selectedApplicant,
        applicants,
        isLoanLocked,
        assetTypes: data?.assetTypes || [],
        liabilityTypes: data?.liabilityTypes || [],
        hasApplicantPrivilege,
        hasFinancialItemPrivilege,
    };
};

export default useLoanCustomerAssetsAndLiabilities;
