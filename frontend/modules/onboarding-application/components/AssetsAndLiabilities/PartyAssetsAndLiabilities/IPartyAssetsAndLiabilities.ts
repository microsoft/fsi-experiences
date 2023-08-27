import { ApplicantFinancialCategoryOption } from '../../../constants/FinancialCategories.const';

export interface IAssetsAndLiabilitiesWidget {
    applicantName?: string;
    allPartiesAssets: number;
    allPartiesLiabilities: number;
    applicantAssets: number;
    applicantLiabilities: number;
    isLoading?: boolean;
    isError?: boolean;
    currencyId?: string;
    showOnlyCombinedData?: boolean;
    hasPrivilege?: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
}
