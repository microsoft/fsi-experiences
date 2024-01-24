import { ONBOARDING_APPLICATION_TASKS } from '../constants/namespaces.const';
import { IRelatedParty } from '../interfaces/ITask';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export const useRelatedPartyInfo = () => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const primary = translate('PRIMARY_APPLICANT');

    return {
        getRelatedPartyRole: (relatedParty: IRelatedParty) => (relatedParty.isPrimary ? primary : relatedParty.role!),
    };
};
