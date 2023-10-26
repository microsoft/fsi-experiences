import { PeriodReference } from '../interfaces/Configuration';

export const MAX_CRUD_OPERATION_RETRIES = 3;

export const MAX_COMPACT_NUMBER = 999999;

export const LIFE_EVENT_HIDE_LIST_CONFIGURATIONS = 'hideLifeEventCategories';

export const FINANCIAL_GOAL_PERIOD_MAP = {
    [PeriodReference.YEARS]: 'FINANCIAL_GOAL_AGE_YEARS',
    [PeriodReference.YEAR]: 'FINANCIAL_GOAL_AGE_YEAR',
    [PeriodReference.MONTHS]: 'FINANCIAL_GOAL_AGE_MONTHS',
    [PeriodReference.MONTH]: 'FINANCIAL_GOAL_AGE_MONTH',
    [PeriodReference.WEEKS]: 'FINANCIAL_GOAL_AGE_WEEKS',
    [PeriodReference.WEEK]: 'FINANCIAL_GOAL_AGE_WEEK',
    [PeriodReference.DAYS]: 'FINANCIAL_GOAL_AGE_DAYS',
    [PeriodReference.DAY]: 'FINANCIAL_GOAL_AGE_DAY',
    [PeriodReference.NONE]: 'FINANCIAL_GOAL_AGE_NONE',
};

export const enum EVENTS_TYPES {
    LIFE_EVENT = 'LifeEvent',
    FINANCIAL_GOAL = 'FinancialGoal',
    EVENT = 'Event',
}
