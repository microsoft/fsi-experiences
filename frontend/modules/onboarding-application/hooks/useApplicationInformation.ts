import { useQuery } from 'react-query';
import { StatesValues } from '../constants/ApplicationStateMap.const';
import { APPLICATION_INFORMATION } from '../constants/FinancialCategoriesQueries.const';
import { isLocked } from '../helpers/ApplicationInformationHelper/applicationPartyHelper';

import { IApplicantFetcher } from '../interfaces/IApplicantFetcher';

interface IUseApplicantPartyProps {
    fetcher: IApplicantFetcher;
    applicantId: string;
}

interface IUseApplicationParty {
    isApplicationPartyLocked: boolean;
    applicationId: string;
    isLoading: boolean;
    isError: boolean;
}
export const useApplicationParty = ({ fetcher: fetcher, applicantId }: IUseApplicantPartyProps): IUseApplicationParty => {
    const {
        data: applicationInformation,
        isLoading,
        isError,
    } = useQuery([APPLICATION_INFORMATION, applicantId], () => fetcher.getApplicationParty());

    const isApplicationPartyLocked = isLocked({
        status: applicationInformation?.status as StatesValues,
        partyStatus: applicationInformation?.partyStatus as StatesValues,
    });

    return {
        isApplicationPartyLocked,
        applicationId: applicationInformation?.applicationId || '',
        isLoading,
        isError,
    };
};
