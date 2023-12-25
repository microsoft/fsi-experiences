import { FirstGroup, SecondGroup } from '../constants/FinancialCategories.const';
import { ASSETS_AND_LIABILITIES_QUERY, INCOME_AND_EXPENSES_QUERY } from '../constants/FinancialCategoriesQueries.const';
import { IFinancialCategoryFetcher } from '../interfaces/IFinancialCategoryFetcher';
import { useFinancialData } from './useFinancialData';

export interface IUseGridDataProps {
    fetchers: IFinancialCategoryFetcher[];
    applicantId: string;
    queryName: string;
}

export interface IUseGridDataResponse {
    isError: boolean;
    isLoading: boolean;
    financialItems: [[], []];
    currencyId: string;
    snapshot: any;
    financialItemsTypes: {};
}

const category = {
    assetsAndLiabilitiesQuery: ['ASSET', 'LIABILITY'],
    incomeAndExpensesQuery: ['INCOME', 'EXPENSE'],
};

export const useGridData: (props: IUseGridDataProps) => IUseGridDataResponse = ({ fetchers, applicantId, queryName }) => {
    const {
        calculatedData: firstGroupData,
        categorizedDataPerApplicant: firstGroupCategorizedData,
        currencyId,
        dataTypes: firstGroupTypes,
        isLoading: loadingFirstGroup,
        isError: errorFirstGroup,
    } = useFinancialData({
        fetcher: fetchers[FirstGroup],
        applicantId,
        category: category[queryName][FirstGroup],
        queryName: queryName,
    });

    const {
        calculatedData: secondGroupData,
        categorizedDataPerApplicant: secondGroupCategorizedData,
        dataTypes: secondGroupTypes,
        isLoading: loadingSecondGroup,
        isError: errorSecondGroup,
    } = useFinancialData({
        fetcher: fetchers[SecondGroup],
        applicantId,
        category: category[queryName][SecondGroup],
        queryName: queryName,
    });

    const financialItemsTypes =
        queryName === ASSETS_AND_LIABILITIES_QUERY
            ? { ASSET: firstGroupTypes, LIABILITY: secondGroupTypes }
            : { INCOME: firstGroupTypes, EXPENSE: secondGroupTypes };

    return {
        financialItems: [firstGroupCategorizedData || [], secondGroupCategorizedData || []],
        financialItemsTypes: financialItemsTypes,
        snapshot:
            (queryName === ASSETS_AND_LIABILITIES_QUERY && {
                totalAssets: firstGroupData.total,
                totalLiabilities: secondGroupData.total,
                applicantTotalAssets: firstGroupData.applicantTotal,
                applicantTotalLiabilities: secondGroupData.applicantTotal,
            }) ||
            (queryName === INCOME_AND_EXPENSES_QUERY && {
                totalNetBalance: firstGroupData.total - secondGroupData.total,
                totalExpenses: secondGroupData.total,
                applicantNetBalance: firstGroupData.applicantTotal - secondGroupData.applicantTotal,
                applicantTotalExpenses: secondGroupData.applicantTotal,
            }),
        currencyId: currencyId || '',
        isError: errorFirstGroup || errorSecondGroup,
        isLoading: loadingFirstGroup || loadingSecondGroup,
    };
};

export default useGridData;
