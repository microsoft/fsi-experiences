import React, { FC } from 'react';
import { useApplicantData } from '../../../hooks/useApplicantData';
import { IApplicantFetcher } from '../../../interfaces/IApplicantFetcher';
import { IncomeAndExpensesSnapshot } from './IncomeAndExpensesSnapshot/IncomeAndExpensesSnapshot';
import { useQuery } from 'react-query';
import { APPLICANTS_QUERY } from '../../../constants/FinancialCategoriesQueries.const';
import { IFinancialCategoryFetcher } from '../../../interfaces/IFinancialCategoryFetcher';
import useGridData from '../../../hooks/useGridData';
import { FinancialCategories } from '../../../constants/FinancialCategories.const';

interface IIncomeAndExpensesProps {
    financialCategoryFetchers: IFinancialCategoryFetcher[];
    applicantFetcher: IApplicantFetcher;
    applicantId: string;
    financialItemsType: string;
}
const IncomeAndExpensesWidget: FC<IIncomeAndExpensesProps> = ({
    financialCategoryFetchers,
    financialItemsType,
    applicantFetcher,
    applicantId,
}) => {
    const {
        snapshot,
        isLoading: isLoadingIncomeAndExpenses,
        isError: isErrorIncomeAndExpenses,
        currencyId,
    } = useGridData({
        fetchers: financialCategoryFetchers,
        applicantId,
        queryName: FinancialCategories[financialItemsType].query,
    });

    const {
        applicantName,
        applicationId,
        isLoading: isLoadingApplicantData,
        isError: isErrorApplicantData,
    } = useApplicantData({
        fetcher: applicantFetcher,
        applicantId,
    });

    const {
        data: applicantsCount,
        isLoading: isLoadingApplicantsCount,
        isError: isErrorApplicantsCount,
    } = useQuery([APPLICANTS_QUERY, applicationId], () => {
        return applicantFetcher.getApplicantsCount(applicationId);
    });

    return (
        <IncomeAndExpensesSnapshot
            currencyId={currencyId}
            totalNetBalance={snapshot.totalNetBalance}
            applicantNetBalance={snapshot.totalNetBalance}
            applicantsCount={applicantsCount || 1}
            selectedApplicant={{
                id: applicantId,
                name: applicantName!,
            }}
            isLoading={isLoadingIncomeAndExpenses || isLoadingApplicantData || isLoadingApplicantsCount}
            isError={isErrorIncomeAndExpenses || isErrorApplicantData || isErrorApplicantsCount}
        />
    );
};

export default IncomeAndExpensesWidget;
