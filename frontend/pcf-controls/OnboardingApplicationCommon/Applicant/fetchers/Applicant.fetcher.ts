import { ApplicantFinancialCategoryOption } from '@fsi/onboarding-application/constants/FinancialCategories.const';
import { IApplicantFetcher } from '@fsi/onboarding-application/interfaces/IApplicantFetcher';
import { IApplicationParty } from '@fsi/onboarding-application/interfaces/IApplicationParty';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { OnboardingApplicationCommonFetcher } from '../../OnboardingApplicationCommonFetcher';
import { FinancialItemRelatedEntitiesNames } from './Applicant.const';
import { getApplicationMetadata } from './Applicant.query';
import { ILoggerService, FSIErrorTypes } from '@fsi/core-components/context/telemetry';

export class ApplicantFetcher extends OnboardingApplicationCommonFetcher implements IApplicantFetcher {
    public constructor(context: CommonPCFContext, protected logger: ILoggerService) {
        super(context, logger);
    }

    public async getApplicationParty(): Promise<IApplicationParty> {
        const partyContractId = extractEntityId(this.context.parameters.applicantId);
        const encodedFetchXml = encodeURIComponent(getApplicationMetadata(partyContractId));
        try {
            const result = await this.context.webAPI.retrieveMultipleRecords('msfsi_relatedpartycontract', `?fetchXml=${encodedFetchXml}`);
            const record = result.entities?.[0];
            if (!record) {
                return { applicationId: '', partyName: '', businessScenario: '', status: 1, partyStatus: 1, statusReason: 0 };
            }
            return {
                applicationId: record['applicationId'],
                partyName: record['applicantName'],
                businessScenario: record['type'],
                status: record['status'],
                statusReason: record['statusReason'],
                partyStatus: record['partyStatus'],
            };
        } catch (e) {
            this.logger.logError(
                ApplicantFetcher.name,
                'get Application Info',
                'An error occurred while retrieving application Info',
                FSIErrorTypes.ServerError,
                e
            );
            return Promise.reject(e);
        }
    }
    public hasFinancialItemPrivilege(category: ApplicantFinancialCategoryOption, operation: number): boolean {
        return this.hasEntitiesPrivilege(FinancialItemRelatedEntitiesNames[category], operation);
    }

    public async getApplicantFirstName(): Promise<string> {
        const applicationParty = await this.getApplicationParty();
        const applicantName = applicationParty?.partyName;
        return applicantName?.split(' ')[0];
    }
}
