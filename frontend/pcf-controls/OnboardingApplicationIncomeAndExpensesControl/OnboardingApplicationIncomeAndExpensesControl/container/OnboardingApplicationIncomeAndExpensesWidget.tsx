import { ApplicantFetcher } from '@fsi-pcf/onboarding-application-common/Applicant';
import { FinancialCategoryFetcher } from '@fsi-pcf/onboarding-application-common/FinancialCategory';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DialogServiceProvider } from '@fsi/core-components/dist/services/DialogService/DialogService';
import IncomeAndExpensesWidget from '@fsi/onboarding-application/components/IncomeAndExpenses/IncomeAndExpensesWidget/IncomeAndExpensesWidget';
import { INCOME_AND_EXPENSES } from '@fsi/onboarding-application/constants/namespaces.const';
import { FINANCIAL_CATEGORY_TYPES } from '@fsi/onboarding-application/interfaces/IFinancialCategory';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/dist/containers/PCFContainer';
import React from 'react';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

const OnboardingApplicationIncomeAndExpensesWidgetContainer: React.FC<PCFContainerProps> = props => {
    const { context } = props;
    const loggerService = usePCFLoggerService();
    const translate = useTranslation();
    if (!context.parameters.applicantId) {
        return <div>{translate('MISSING_APPLICANT_INFO')}</div>;
    }

    const incomeFetcher = new FinancialCategoryFetcher(context, FINANCIAL_CATEGORY_TYPES.INCOME, loggerService);
    const expenseFetcher = new FinancialCategoryFetcher(context, FINANCIAL_CATEGORY_TYPES.EXPENSE, loggerService);
    const applicantFetcher = new ApplicantFetcher(context, loggerService);

    return (
        <PCFContainer context={context}>
            <DialogServiceProvider>
                <IncomeAndExpensesWidget
                    financialCategoryFetchers={[incomeFetcher, expenseFetcher]}
                    applicantFetcher={applicantFetcher}
                    financialItemsType={INCOME_AND_EXPENSES}
                    applicantId={context.parameters.applicantId.raw}
                />
            </DialogServiceProvider>
        </PCFContainer>
    );
};

export default OnboardingApplicationIncomeAndExpensesWidgetContainer;
