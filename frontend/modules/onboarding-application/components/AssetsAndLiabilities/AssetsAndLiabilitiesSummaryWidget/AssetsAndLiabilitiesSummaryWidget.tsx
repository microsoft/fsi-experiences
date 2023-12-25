import React, { FC } from 'react';
import { FinancialCategories } from '../../../constants/FinancialCategories.const';
import { useApplicantData } from '../../../hooks/useApplicantData';
import useGridData from '../../../hooks/useGridData';
import { IApplicantFetcher } from '../../../interfaces/IApplicantFetcher';
import { IFinancialCategoryFetcher } from '../../../interfaces/IFinancialCategoryFetcher';
import FinancialCategoriesWidget from '../../FinancialCategoriesWidget/FinancialCategoriesWidget';

interface AssetsAndLiabilitiesWidgetWidgetProps {
    financialCategoryFetchers: IFinancialCategoryFetcher[];
    applicantFetcher: IApplicantFetcher;
    applicantId: string;
    financialItemsType: string;
}

const AssetsAndLiabilitiesSummaryWidget: FC<AssetsAndLiabilitiesWidgetWidgetProps> = ({
    applicantId,
    applicantFetcher,
    financialItemsType,
    financialCategoryFetchers,
}) => {
    const { snapshot, isLoading, isError, currencyId } = useGridData({
        fetchers: financialCategoryFetchers,
        applicantId,
        queryName: FinancialCategories[financialItemsType].query,
    });

    const {
        applicantName,
        isError: isErrorApplicantData,
        isLoading: isLoadingApplicantData,
    } = useApplicantData({
        fetcher: applicantFetcher,
        applicantId,
    });

    return (
        <FinancialCategoriesWidget
            financialItemsType={financialItemsType}
            isLoading={isLoading || isLoadingApplicantData}
            isError={isError || isErrorApplicantData}
            applicantName={applicantName}
            currencyId={currencyId}
            snapshot={snapshot}
            showOnlyCombinedData
        />
    );
};

export default AssetsAndLiabilitiesSummaryWidget;
