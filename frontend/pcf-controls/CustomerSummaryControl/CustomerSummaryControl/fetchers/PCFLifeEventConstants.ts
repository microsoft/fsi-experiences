export const LIFE_EVENT_TABLE_NAME = 'msfsi_lifemoment';
export const FINANCIAL_GOAL_TABLE_NAME = 'msfsi_financialgoal';
export const CONTACT_TABLE_NAME = 'contact';

// Config tables
export const LIFE_EVENT_CONFIGURATIONS_TABLE = 'msfsi_lifemomentsconfigurations';
export const LIFE_EVENT_CATEGORY_CONFIG_TABLE = 'msfsi_lifemomentcategoryconfig';
export const LIFE_EVENT_TYPE_CONFIG_TABLE = 'msfsi_lifemomenttypeconfig';
export const CATEGORY_TYPES_RELATIONS_TABLE = 'msfsi_categorytypesrelations';
export const THEME_TABLE = 'theme';

export interface ExternalLifeEvents {
    birthDate: Date | null;
    education: number | null;
}
