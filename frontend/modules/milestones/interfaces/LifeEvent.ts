import { IFinancialGoal } from '../goals/interfaces/FinancialGoal.interface';

export interface LifeEvent {
    id: string;
    created_on: Date;
    modified_on?: Date;
    title: string;
    date?: Date;
    categoryCode: number;
    typeCode: number;
    isExternal?: boolean;
    financialGoal?: IFinancialGoal;
}

export type LifeEventByCategory = { [categoryCode: string]: LifeEvent[] };
