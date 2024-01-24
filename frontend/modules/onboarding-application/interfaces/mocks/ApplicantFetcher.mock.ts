import { ApplicantFinancialCategoryOption } from '../../constants/FinancialCategories.const';
import { IApplicantFetcher } from '../IApplicantFetcher';
import { IApplicationParty } from '../IApplicationParty';
import { mockApplicationParty } from './ApplicationParty.mock';
import { mockFinancialCategoriesApplicants } from './IApplicant.mock';

export class MockApplicantFetcher implements IApplicantFetcher {
    public async getApplicantsCount(applicationId): Promise<number> {
        return await mockFinancialCategoriesApplicants.length;
    }
    public async getApplicationParty(): Promise<IApplicationParty> {
        return mockApplicationParty;
    }

    public hasFinancialItemPrivilege(category: ApplicantFinancialCategoryOption, operation: number): boolean {
        return true;
    }

    public async getApplicantFirstName(): Promise<string> {
        const applicant = mockFinancialCategoriesApplicants || [];
        return applicant[0]?.name || '';
    }
}
