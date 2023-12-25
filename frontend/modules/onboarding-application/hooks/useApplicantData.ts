import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { ApplicantFinancialCategoryOption } from '../constants/FinancialCategories.const';
import { APPLICANT_NAME } from '../constants/FinancialCategoriesQueries.const';
import { IApplicantFetcher } from '../interfaces/IApplicantFetcher';
import { useApplicationParty } from './useApplicationInformation';

export interface IUseApplicantDataProps {
    fetcher: IApplicantFetcher;
    applicantId: string;
}

interface IUseApplicantDataOutput {
    applicantName?: string;
    applicationId: string;
    hasFinancialItemPrivilege: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
    isLoading: boolean;
    isError: boolean;
}

export const useApplicantData: (props: IUseApplicantDataProps) => IUseApplicantDataOutput = ({ fetcher, applicantId }) => {
    const {
        isApplicationPartyLocked,
        applicationId,
        isLoading: isLoadingApplicationParty,
        isError: isErrorApplicationParty,
    } = useApplicationParty({
        fetcher,
        applicantId,
    });
    const {
        data: applicantName,
        isLoading: isLoadingName,
        isError: isErrorName,
    } = useQuery([APPLICANT_NAME, applicantId], () => fetcher.getApplicantFirstName());

    const hasFinancialItemPrivilege = useCallback(
        (category: ApplicantFinancialCategoryOption, operation: number) => {
            return !isApplicationPartyLocked && fetcher.hasFinancialItemPrivilege(category, operation);
        },
        [fetcher, isApplicationPartyLocked]
    );
    return {
        applicantName,
        applicationId,
        hasFinancialItemPrivilege,
        isLoading: isLoadingApplicationParty || isLoadingName,
        isError: isErrorApplicationParty || isErrorName,
    };
};
