import common from './assets/strings/common/common.1033.json';
import groupsControl from './assets/strings/GroupsControl/GroupsControl.1033.json';
import relationship from './assets/strings/Relationship/Relationship.1033.json';
import detailedFHControl from './assets/strings/DetailedFHControl/DetailedFHControl.1033.json';
import lifeEventBar from './assets/strings/LifeEventBar/LifeEventBar.1033.json';
import mainHousehold from './assets/strings/MainHousehold/MainHousehold.1033.json';
import customerSnapshotControl from './assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';
import cards from './assets/strings/Cards/Cards.1033.json';
import financialHoldings from './assets/strings/FinancialHoldings/FinancialHoldings.1033.json';
import loanCustomerLookupControl from './assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';
import loanApplicationFilesControl from './assets/strings/LoanApplicationFilesControl/LoanApplicationFilesControl.1033.json';
import loanOnboardingControl from './assets/strings/LoanOnboardingControl/LoanOnboardingControl.1033.json';
import loanSnapshotControl from './assets/strings/LoanSnapshotControl/LoanSnapshotControl.1033.json';
import partyAssetsAndLiabilities from './assets/strings/PartyAssetsAndLiabilities/PartyAssetsAndLiabilities.1033.json';
import verificationStatusControl from './assets/strings/VerificationStatusControl/VerificationStatusControl.1033.json';
import aiChurnExplainability from './assets/strings/AIChurnExplainability/AIChurnExplainability.1033.json';
import { ITranslations, translations } from './context/localization/TranslationFunction';
import financialCategoriesFormFields from './assets/strings/FinancialCategoriesFormFields/FinancialCategoriesFormFields.1033.json';
import keyObservations from './assets/strings/KeyObservations/KeyObservations.1033.json';
import financialHoldingSelectorControl from './assets/strings/FinancialHoldingSelectorControl/FinancialHoldingSelectorControl.1033.json';

import { namespaces } from './constants/namespaces';

export interface ITranslationFile {
    namespace: string;
    file: any;
}
export const setup = (additionalFiles: ITranslationFile[] = []): ITranslations => {
    const {
        COMMON,
        GROUPS_CONTROL,
        LIFE_EVENT_BAR,
        CUSTOMER_SNAPSHOT_CONTROL,
        CARDS,
        MAIN_HOUSEHOLD,
        FINANCIAL_HOLDINGS,
        DETAILED_FH_CONTROL,
        RELATIONSHIP,
        LOAN_CUSTOMER_LOOKUP,
        LOAN_APPLICATION_FILES_CONTROL,
        LOAN_ONBOARDING_CONTROL,
        LOAN_SNAPSHOT_CONTROL,
        PARTY_ASSETS_AND_LIABILITIES,
        VERIFICATION_STATUS_CONTROL,
        AI_CHURN_EXPLAINABILITY,
        FINANCIAL_CATEGORIES_FORM_FIELDS,
        KEY_OBSERVATIONS,
        FINANCIAL_HOLDING_SELECTOR_CONTROL,
    } = namespaces;

    const translationsObj = {
        [COMMON]: common,
        [GROUPS_CONTROL]: groupsControl,
        [LIFE_EVENT_BAR]: lifeEventBar,
        [CUSTOMER_SNAPSHOT_CONTROL]: customerSnapshotControl,
        [CARDS]: cards,
        [MAIN_HOUSEHOLD]: mainHousehold,
        [FINANCIAL_HOLDINGS]: financialHoldings,
        [DETAILED_FH_CONTROL]: detailedFHControl,
        [LOAN_CUSTOMER_LOOKUP]: loanCustomerLookupControl,
        [RELATIONSHIP]: relationship,
        [LOAN_APPLICATION_FILES_CONTROL]: loanApplicationFilesControl,
        [LOAN_ONBOARDING_CONTROL]: loanOnboardingControl,
        [LOAN_SNAPSHOT_CONTROL]: loanSnapshotControl,
        [PARTY_ASSETS_AND_LIABILITIES]: partyAssetsAndLiabilities,
        [VERIFICATION_STATUS_CONTROL]: verificationStatusControl,
        [AI_CHURN_EXPLAINABILITY]: aiChurnExplainability,
        [FINANCIAL_CATEGORIES_FORM_FIELDS]: financialCategoriesFormFields,
        [KEY_OBSERVATIONS]: keyObservations,
        [FINANCIAL_HOLDING_SELECTOR_CONTROL]: financialHoldingSelectorControl,
    };

    Object.keys(translationsObj).forEach(key => {
        translations[key] = translationsObj[key];
    });

    additionalFiles.forEach(additionalFile => {
        translations[additionalFile.namespace] = additionalFile.file;
    });

    return translations;
};
