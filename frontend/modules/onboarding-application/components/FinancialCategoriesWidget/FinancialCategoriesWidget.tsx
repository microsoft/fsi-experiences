import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC, Ref } from 'react';
import { ApplicantFinancialCategoryOption } from '../../constants/FinancialCategories.const';
import { ASSETS_AND_LIABILITIES } from '../../constants/namespaces.const';
import PartyAssetsAndLiabilities from '../AssetsAndLiabilities/PartyAssetsAndLiabilities';
import { PartyIncomeAndExpenses } from '../IncomeAndExpenses/PartyWithIncomeAndExpenses';

interface FinancialCategoriesWidgetProps {
    financialItemsType: string;
    hasFinancialItemPrivilege?: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
    isLoading: boolean;
    isError: boolean;
    applicantName: string;
    commandBtnRef?: Ref<HTMLButtonElement>;
    currencyId: string;
    showOnlyCombinedData?: boolean;
    applicantsCount: number;
    snapshot: {
        totalAssets;
        totalLiabilities;
        applicantTotalAssets;
        applicantTotalLiabilities;
        totalNetBalance;
        applicantNetBalance;
    };
}

const FinancialCategoriesWidget: FC<FinancialCategoriesWidgetProps> = ({
    financialItemsType,
    hasFinancialItemPrivilege,
    snapshot,
    isLoading,
    isError,
    applicantName,
    commandBtnRef,
    currencyId,
    applicantsCount,
    showOnlyCombinedData = false,
}) => {
    return (
        <Stack>
            {financialItemsType === ASSETS_AND_LIABILITIES ? (
                <PartyAssetsAndLiabilities
                    applicantName={applicantName}
                    allPartiesAssets={snapshot.totalAssets}
                    allPartiesLiabilities={snapshot.totalLiabilities}
                    applicantAssets={snapshot.applicantTotalAssets}
                    applicantLiabilities={snapshot.applicantTotalLiabilities}
                    currencyId={currencyId}
                    isLoading={isLoading}
                    isError={isError}
                    hasPrivilege={hasFinancialItemPrivilege}
                    showOnlyCombinedData={showOnlyCombinedData}
                />
            ) : (
                <PartyIncomeAndExpenses
                    totalNetBalance={snapshot.totalNetBalance}
                    applicantNetBalance={snapshot.applicantNetBalance}
                    numberOfApplicants={applicantsCount || 1}
                    applicantName={applicantName}
                    isLoading={isLoading}
                    isError={isError}
                    currencyId={currencyId}
                    ref={commandBtnRef}
                    hasPrivilege={hasFinancialItemPrivilege}
                />
            )}
        </Stack>
    );
};

const FinancialCategoriesWidgetWrapper = props => {
    return <FinancialCategoriesWidget {...props} />;
};

export default FinancialCategoriesWidgetWrapper;
