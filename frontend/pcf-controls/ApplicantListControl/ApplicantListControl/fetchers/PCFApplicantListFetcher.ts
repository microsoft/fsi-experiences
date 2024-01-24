import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { PCFOnboardingApplicationTasksFetcher, TASK_ALIAS, TASK_DEFINITION_ALIAS } from '@fsi-pcf/oa-tasks-common/fetchers';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { IApplicantListFetcher } from '@fsi/onboarding-application/interfaces/IApplicantListFetcher';
import { IApplicantWithTask } from '@fsi/onboarding-application/interfaces/IApplicantWithTask';
import { fetchApplicantsAndTasksQuery } from '@fsi-pcf/oa-tasks-common/fetchers';
import { TASK_FIELD_NAMES } from '@fsi-pcf/oa-tasks-common/fetchers';
import { TASK_TYPE } from '@fsi/onboarding-application/constants/Fields.const';
import { CONFIGURATION_ERROR } from '@fsi/onboarding-application/constants/TaskVerification.const';

export class PCFApplicantListFetcher extends PCFOnboardingApplicationTasksFetcher implements IApplicantListFetcher {
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    private getLinkedKey = (fieldName: string, tableName: string): string => {
        return `${tableName}.${fieldName}`;
    };

    public async fetchApplicants(applicationId: string, taskDefinitionId?: string): Promise<IApplicantWithTask[]> {
        try {
            const encodedFetchXml = encodeURIComponent(fetchApplicantsAndTasksQuery({ applicationId, taskDefinitionId }));

            const result = await this.context.webAPI.retrieveMultipleRecords('msfsi_relatedpartycontract', `?fetchXml=${encodedFetchXml}`);

            const linkedTaskId = this.getLinkedKey(TASK_FIELD_NAMES.TASK_ID, TASK_ALIAS);
            const linkedTaskSubject = this.getLinkedKey(TASK_FIELD_NAMES.TASK_NAME, TASK_DEFINITION_ALIAS);
            const linkedTaskStatusCode = this.getLinkedKey(TASK_FIELD_NAMES.STATUS_CODE, TASK_ALIAS);
            const linkedTaskStateCode = this.getLinkedKey(TASK_FIELD_NAMES.STATE_CODE, TASK_ALIAS);
            const linkedTaskProcessStage = this.getLinkedKey(TASK_FIELD_NAMES.PROCESS_STAGE, TASK_DEFINITION_ALIAS);
            const linkedTaskType = this.getLinkedKey(TASK_FIELD_NAMES.TASK_TYPE, TASK_DEFINITION_ALIAS);
            const linkedTaskAssociationLevel = this.getLinkedKey(TASK_FIELD_NAMES.ASSOCIATION_LEVEL, TASK_DEFINITION_ALIAS);

            if (result.entities.length > 0 && result.entities[0][linkedTaskType] !== TASK_TYPE.Verification) {
                throw new Error(CONFIGURATION_ERROR);
            }

            return result.entities.map(record => {
                const task = taskDefinitionId
                    ? {
                          id: record[linkedTaskId],
                          name: record[linkedTaskSubject],
                          status: record[linkedTaskStatusCode],
                          state: record[linkedTaskStateCode],
                          associationType: record[linkedTaskAssociationLevel],
                          updateStatus: async (updatedStatus, updatedState) => {},
                          processStage: record[linkedTaskProcessStage],
                          taskType: record[linkedTaskType],
                      }
                    : undefined;

                return {
                    id: record.msfsi_relatedpartycontractid,
                    name: record.msfsi_name,
                    isPrimary: record.msfsi_isprimary,
                    role: record['_msfsi_relatedparty_role_value@OData.Community.Display.V1.FormattedValue'],
                    task,
                };
            });
        } catch (e) {
            this.loggerService.logError(
                PCFApplicantListFetcher.name,
                'fetchApplicants',
                'An error accrued getting the applicants',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }
}
