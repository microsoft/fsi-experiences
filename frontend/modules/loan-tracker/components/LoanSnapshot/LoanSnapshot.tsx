import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { LoanInformation } from '../LoanInformation';
import { ILoanInformationFetcher } from '../../interfaces/ILoanInformation/ILoanInformationFetcher';
import { ILoanPrimaryApplicantFetcher } from '../../interfaces/ILoanPrimaryApplicant/ILoanPrimaryApplicantFetcher';
import { ILoanProgressOverviewFetcher } from '../../interfaces/ILoanProgressOverview/ILoanProgressOverviewFetcher';
import { LoanPrimaryApplicant } from '../LoanPrimaryApplicant/LoanPrimaryApplicant';
import { LoanProgressOverview } from '../LoanProgressOverview/LoanProgressOverview';
import { LoanAssetsAndLiabilities } from '../LoanAssetsAndLiabilities/LoanAssetsAndLiabilities';
import { ILoanAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanAssetsAndLiabilitiesFetcher';
import {
    baseCardWrapperStyles,
    LoanInformationPrimaryApplicantStackStyles,
    primaryInformationStyles,
    stackTokenMargins,
    summaryViewStackStyle,
} from './LoanSnapshot.style';
import { LoanIncomeAndExpenses } from '../IncomeAndExpenses/LoanIncomeAndExpenses';
import { ILoanIncomeAndExpensesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanIncomeAndExpensesFetcher';
import { SUMMARY_RESPONSIVE_CONTAINER } from '../../constants/StyleSelectors.consts';

interface ILoanSnapshotProps {
    loanInformationFetcher: ILoanInformationFetcher;
    loanPrimaryApplicantFetcher: ILoanPrimaryApplicantFetcher;
    loanProgressOverviewFetcher: ILoanProgressOverviewFetcher;
    loanAssetsAndLiabilitiesFetcher: ILoanAssetsAndLiabilitiesFetcher;
    loanIncomeAndExpensesFetcher: ILoanIncomeAndExpensesFetcher;
    loanApplicationId: string;
}

const LoanSnapshot: FC<ILoanSnapshotProps> = ({
    loanInformationFetcher,
    loanPrimaryApplicantFetcher,
    loanProgressOverviewFetcher,
    loanAssetsAndLiabilitiesFetcher,
    loanIncomeAndExpensesFetcher,
    loanApplicationId,
}) => {
    return (
        <ResponsiveContainer classPrefix={SUMMARY_RESPONSIVE_CONTAINER}>
            <Stack horizontal horizontalAlign="start" styles={summaryViewStackStyle} as="section">
                <Stack horizontal tokens={stackTokenMargins} styles={LoanInformationPrimaryApplicantStackStyles}>
                    <Stack.Item styles={primaryInformationStyles}>
                        <LoanInformation fetcher={loanInformationFetcher} loanApplicationId={loanApplicationId} />
                    </Stack.Item>
                    <Stack.Item styles={primaryInformationStyles}>
                        <LoanPrimaryApplicant fetcher={loanPrimaryApplicantFetcher} loanApplicationId={loanApplicationId} />
                    </Stack.Item>
                </Stack>
                <Stack tokens={stackTokenMargins}>
                    <Stack.Item align="stretch" styles={baseCardWrapperStyles}>
                        <LoanProgressOverview loanApplicationId={loanApplicationId} fetcher={loanProgressOverviewFetcher} />
                    </Stack.Item>
                    <Stack.Item align="stretch" styles={baseCardWrapperStyles}>
                        <LoanAssetsAndLiabilities fetcher={loanAssetsAndLiabilitiesFetcher} />
                    </Stack.Item>
                    <Stack.Item align="stretch" styles={baseCardWrapperStyles}>
                        <LoanIncomeAndExpenses fetcher={loanIncomeAndExpensesFetcher} />
                    </Stack.Item>
                </Stack>
            </Stack>
        </ResponsiveContainer>
    );
};
export default LoanSnapshot;
