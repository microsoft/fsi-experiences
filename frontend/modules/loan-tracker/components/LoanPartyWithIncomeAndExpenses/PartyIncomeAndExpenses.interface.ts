import { ApplicantFinancialCategoryOption } from '../../constants/ApplicantFinancialItemCategories.consts';

export interface IPartyIncomeAndExpensesProps {
    applicantName: string;
    numberOfApplicants: number;
    applicantNetBalance: number;
    totalNetBalance?: number;
    isLoading?: boolean;
    isError?: boolean;
    currencyId?: string;
    hasPrivilege?: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
}
