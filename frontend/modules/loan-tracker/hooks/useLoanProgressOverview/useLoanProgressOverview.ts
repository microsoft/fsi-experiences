import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import {
    customerWithAssetsAndLiabilitiesQuery,
    customerWithIncomeAndExpensesQuery,
    loanProgressOverviewQuery,
    loanPartiesQuery,
} from '../../constants/LoanQueries.consts';
import { ILoanProgressOverviewFetcher } from '../../interfaces/ILoanProgressOverview/ILoanProgressOverviewFetcher';
import { ILoanProgressData } from '../../interfaces/ILoanProgressOverview/ILoanProgressData';
import { DocumentsStatusChangeQuery } from '../../constants/LoanDocument.consts';

export interface useLoanProgressOverviewProps {
    fetcher: ILoanProgressOverviewFetcher;
    loanApplicationId: string;
}

export interface useLoanProgressOverviewOutput {
    loanProgressData: ILoanProgressData[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

const getUniqueQuery = (queryName: string, loanApplicationId: string) => `${queryName}-${loanApplicationId}`;

export const useLoanProgressOverview = ({ loanApplicationId, fetcher }: useLoanProgressOverviewProps): useLoanProgressOverviewOutput => {
    const queryClient = useQueryClient();
    const uniquePartiesInformationQueryNameQuery = getUniqueQuery(loanPartiesQuery, loanApplicationId);
    const uniqueAssetsAndLiabilitiesNameQuery = getUniqueQuery(customerWithAssetsAndLiabilitiesQuery, loanApplicationId);
    const uniqueIncomeAndExpensesNameQuery = getUniqueQuery(customerWithIncomeAndExpensesQuery, loanApplicationId);
    const uniqueDocumentsQuery = getUniqueQuery(DocumentsStatusChangeQuery, loanApplicationId);
    const uniqueLoanProgressOverviewQuery = getUniqueQuery(loanProgressOverviewQuery, loanApplicationId);
    const { messages: partiesMessages } = useBrowserCommunication(uniquePartiesInformationQueryNameQuery);
    const { messages: assetsAndLiabilitiesMessages } = useBrowserCommunication(uniqueAssetsAndLiabilitiesNameQuery);
    const { messages: incomeAndExpensesMessages } = useBrowserCommunication(uniqueIncomeAndExpensesNameQuery);
    const { messages: documentsMessages } = useBrowserCommunication(uniqueDocumentsQuery);
    const { messages: onSaveMessages } = useBrowserCommunication(`loanapp-change-${loanApplicationId}`);
    const { isLoading, data: loanProgressData, isError } = useQuery(uniqueLoanProgressOverviewQuery, () => fetcher.getLoanProgressOverviewData());

    useEffect(() => {
        queryClient.invalidateQueries(uniqueLoanProgressOverviewQuery);

        return () => {
            queryClient.cancelQueries([uniqueLoanProgressOverviewQuery]);
        };
    }, [
        partiesMessages,
        assetsAndLiabilitiesMessages,
        incomeAndExpensesMessages,
        uniqueIncomeAndExpensesNameQuery,
        uniqueLoanProgressOverviewQuery,
        onSaveMessages,
        documentsMessages,
        queryClient,
    ]);

    return { isLoading, loanProgressData, isError };
};
