import { LifeEvent } from '@fsi/milestones/interfaces/LifeEvent';
import { ILifeEventsConfigTable, IRawCategoryConfig, ITypeConfig } from '@fsi/milestones/interfaces/Configuration';
import { IFinancialGoal } from '@fsi/milestones/goals/interfaces/FinancialGoal.interface';

export type JoinedCategoryConfigTypes = IRawCategoryConfig &
    ITypeConfig & {
        id: string;
        typeDisplayOrder?: number;
    };

export const parseLifeEventEntity = (entity: any): LifeEvent => {
    const id: string = entity['msfsi_lifemomentid'];
    const created_on: Date = new Date(entity['createdon']);
    const modified_on: Date = entity['msfsi_modifiedon'] && new Date(entity['msfsi_modifiedon']);
    const title: string = entity['msfsi_lifemomenttitle'];
    const date: Date = entity['msfsi_lifemomentdate'] && new Date(entity['msfsi_lifemomentdate']);
    const categoryCode: number = entity['msfsi_lifemomentcategory'];
    const typeCode: number = entity['msfsi_lifemomenttype'];
    return { id, created_on, modified_on, title, date, categoryCode, typeCode };
};

export const parseFinancialGoalEntity = (entity: any): IFinancialGoal => {
    const id: string = entity['FG.msfsi_financialgoalid'];
    const targetName: string = entity['FG.msfsi_name'];
    const targetValue: number = entity['FG.msfsi_targetvaluedefault'];
    const progressValue: number = entity['FG.msfsi_progressvaluedefault'];
    const targetDate: Date = new Date(entity['FG.msfsi_targetdate']);
    const isCompleted: boolean = entity['FG.msfsi_iscompleted'];
    const lifeEventId: string = entity['FG.msfsi_lifeevent_value'];
    return { id, targetName, targetValue, progressValue, targetDate, isCompleted, lifeEventId };
};

export const parseEventFinancialGoalEntity = (entity: any): LifeEvent => {
    const lifeEvent = parseLifeEventEntity(entity);
    const financialGoal = parseFinancialGoalEntity(entity);
    return financialGoal.id ? { ...lifeEvent, financialGoal: financialGoal } : lifeEvent;
};

export const parseLifeEventJoinedConfigEntity = (entity: any): JoinedCategoryConfigTypes => {
    const id: string = entity['msfsi_lifemomentcategoryconfigid'];
    const name: string = entity['msfsi_name'];
    const categoryCode: number = +entity['msfsi_categorycode'];
    const icon: string = entity['msfsi_icon'];
    const displayOrder: number = +entity['msfsi_displayorder'];
    // type table
    const typeName: string = entity['msfsi_lifemomenttypeconfig2.msfsi_name'];
    const typeCode: number = +entity['msfsi_lifemomenttypeconfig2.msfsi_typecode'];
    const typeDisplayOrder: number = +entity['msfsi_lifemomenttypeconfig2.msfsi_displayorder'];

    return {
        id,
        displayOrder,
        icon,
        name,
        categoryCode,
        typeName,
        typeCode,
        typeDisplayOrder: isNaN(typeDisplayOrder) ? undefined : typeDisplayOrder,
    };
};

export const parseLifeEventConfigEntity = (entity: any): ILifeEventsConfigTable => {
    return {
        birthdayCategoryCode: +entity['msfsi_birthdaycategorycode'],
        birthdayTypeCode: +entity['msfsi_birthdaytypecode'],
        educationCategoryCode: +entity['msfsi_educationcategorycode'],
        otherCategoryCode: +entity['msfsi_othercategorycode'],
        otherTypeCode: +entity['msfsi_othertypecode'],
        newIndicationDisplayInDays: +entity['msfsi_newmomentindicationperioddays'],
        focusIndicationDisplayInDays: +entity['msfsi_focusindicationperioddays'],
    };
};
