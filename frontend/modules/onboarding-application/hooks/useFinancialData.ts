import { useQuery } from 'react-query';
import { ApplicantFinancialCategoryOption } from '../constants/FinancialCategories.const';
import { GET_TYPES_QUERY } from '../constants/FinancialCategoriesQueries.const';
import { calculateFinancialValues } from '../helpers/calculateFinancialValues';
import { getCategorizedFinancialItems } from '../helpers/getCategorizedFinancialItems';
import { FINANCIAL_CATEGORY_TYPES } from '../interfaces/IFinancialCategory';
import { IFinancialCategoryFetcher } from '../interfaces/IFinancialCategoryFetcher';

export interface IUseFinancialDataProps {
    fetcher: IFinancialCategoryFetcher;
    applicantId: string;
    category: ApplicantFinancialCategoryOption;
    queryName: string;
}

export const useFinancialData = ({ fetcher, applicantId, queryName, category }: IUseFinancialDataProps) => {
    const { data, isLoading, isError } = useQuery([queryName, applicantId, category], () => fetcher.getItems());

    const calculatedData = calculateFinancialValues(data || [], applicantId);
    const dataPerApplicant = data?.filter(item => item.customerId == applicantId);
    const categorizedDataPerApplicant = getCategorizedFinancialItems({ items: dataPerApplicant, category });
    const currencyId = categorizedDataPerApplicant[0]?.currencyId;
    const {
        data: dataTypes,
        isLoading: isDataTypesLoading,
        isError: isDataTypesError,
    } = useQuery([GET_TYPES_QUERY, category, applicantId], () => fetcher.getFinancialCategoriesTypes(FINANCIAL_CATEGORY_TYPES[category]));

    return {
        calculatedData,
        categorizedDataPerApplicant,
        currencyId,
        dataTypes,
        isLoading: isLoading || isDataTypesLoading,
        isError: isError || isDataTypesError,
    };
};
