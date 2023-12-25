import { ApplicantFinancialCategoryOption } from '../constants/FinancialCategories.const';
import { IApplicant } from './IApplicant';
import { IApplicationParty } from './IApplicationParty';

export interface IApplicantFetcher {
    getApplicationParty(): Promise<IApplicationParty>;
    getApplicantFirstName(): Promise<string>;
    getApplicantsCount(applicationId: string): Promise<number>;
    hasFinancialItemPrivilege(category: ApplicantFinancialCategoryOption, operation: number): boolean;
}
