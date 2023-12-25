import { FINANCIAL_CATEGORY_TYPES } from '@fsi/onboarding-application/interfaces/IFinancialCategory';

export const PartyContractEntityName = 'msfsi_relatedpartycontract';
export const PartyContractId = 'msfsi_relatedpartycontractid';
export const ApplicationEntityName = 'msfsi_application';
export const OnboardingFinancialTypeEntityName = 'msfsi_onboardingfinancialtype';
export const PartyContractMetadata = {
    entity: 'msfsi_relatedpartycontract',
    id: 'msfsi_relatedpartycontractid',
    connectedApplication: 'msfsi_contractpart',
    name: 'msfsi_name',
};

export const FinancialCategoriesOptionSet = {
    [FINANCIAL_CATEGORY_TYPES.ASSET]: '104800000',
    [FINANCIAL_CATEGORY_TYPES.LIABILITY]: '104800001',
    [FINANCIAL_CATEGORY_TYPES.INCOME]: '104800002',
    [FINANCIAL_CATEGORY_TYPES.EXPENSE]: '104800003',
} as const;
