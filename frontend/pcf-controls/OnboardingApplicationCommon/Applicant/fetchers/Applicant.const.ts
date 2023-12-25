import { ApplicantFinancialItemCategories as CATEGORIES } from '@fsi/onboarding-application/constants/FinancialCategories.const';

export const FinancialItemRelatedEntitiesNames = {
    [CATEGORIES.ASSET]: ['msfsi_applicationcontactasset'],
    [CATEGORIES.LIABILITY]: ['msfsi_applicationcontactliability'],
    [CATEGORIES.INCOME]: ['msfsi_applicationincome'],
    [CATEGORIES.EXPENSE]: ['msfsi_applicationexpense'],
};
