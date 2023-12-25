/**
 * This interface represents a configurations object interface
 */
export interface ILifeEventsConfigTable {
    birthdayCategoryCode: number;
    birthdayTypeCode: number;
    educationCategoryCode: number;
    otherCategoryCode: number;
    otherTypeCode: number;
    newIndicationDisplayInDays: number;
    focusIndicationDisplayInDays: number;
}
export interface ILifeEventConfigurations extends ILifeEventsConfigTable {
    categoryConfig: ICategoryConfig[];
    categoriesMap: ILifeEventCategoryMap;
}

export interface IRawCategoryConfig {
    name: string;
    categoryCode: number;
    icon: string;
    displayOrder: number;
}
export interface ICategoryConfig extends IRawCategoryConfig {
    types: ITypeConfig[];
}

export interface ITypeConfig {
    typeName: string;
    typeCode: number;
    displayOrder?: number;
}

export interface ILifeEventCategoryMap {
    [id: string]: ICategoryConfig;
}

export interface ILifeEventTypeMap {
    [id: string]: ITypeConfig[];
}

export interface ITypeCodePeriodWithValue {
    [typeCodeAndPeriod: string]: string;
}

export class TypeCodeAndTimePeriodPair {
    typeCode: number;
    period: PeriodReference;

    public constructor(typeCode: number, period: PeriodReference) {
        this.typeCode = typeCode;
        this.period = period;
    }

    public toString(): string {
        return this.typeCode + '_' + PeriodReference[this.period][0].toUpperCase() + PeriodReference[this.period].substring(1).toLowerCase();
    }
}

export enum PeriodReference {
    YEARS,
    YEAR,
    MONTHS,
    MONTH,
    WEEKS,
    WEEK,
    DAYS,
    DAY,
    NONE,
}
