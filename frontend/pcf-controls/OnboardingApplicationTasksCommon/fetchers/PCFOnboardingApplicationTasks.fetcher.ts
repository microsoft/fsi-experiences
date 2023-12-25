import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { OnboardingApplicationCommonFetcher } from '@fsi-pcf/onboarding-application-common/OnboardingApplicationCommonFetcher';
import { IOnboardingApplicationTasksFetcher } from '@fsi/onboarding-application/interfaces/IOnboardingApplicationTasksFetcher';
import { ITask, ITaskForm } from '@fsi/onboarding-application/interfaces/ITask';
import { UciErrorCodes } from '@fsi/pcf-common/utilities/UciErrorCodes';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import {
    ACTIVITY_ENTITY,
    APPLICATION_CONTACT_ENTITY,
    APPLICATION_ENTITY,
    FORM_PAGE_TYPE,
    TASK_DEFINITION_ALIAS,
    TASK_ENTITY,
    TASK_FIELD_NAMES,
} from './PCFOnboardingApplicationTasks.const';
import { parseTasksEntity } from './PCFOnboardingApplicationTasks.parser';
import { TaskStateType, TaskStatusType } from '@fsi/onboarding-application/constants/Fields.const';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { fetchTaskByTaskDefinitionIdQuery } from './PCFOnboardingApplicationTasks.query';
import { IVerificationTask } from '@fsi/onboarding-application/interfaces/IVerificationTask.interface';
import { CONFIGURATION_ERROR } from '@fsi/onboarding-application/constants/TaskVerification.const';

export class PCFOnboardingApplicationTasksFetcher extends OnboardingApplicationCommonFetcher implements IOnboardingApplicationTasksFetcher {
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    public async isRecordInEntity(entityName: string, recordId: string): Promise<boolean> {
        try {
            const result = await this.context.webAPI.retrieveRecord(entityName, recordId);
            return !!result;
        } catch (error) {
            this.loggerService.logError(
                PCFOnboardingApplicationTasksFetcher.name,
                'fetchClientData',
                'An error occured fetching client data.',
                FSIErrorTypes.ServerError,
                error
            );
            return false;
        }
    }

    public async getEntityId(form: ITaskForm, contactId?: string): Promise<string | null> {
        if (contactId && form.entityName === APPLICATION_CONTACT_ENTITY) {
            return contactId;
        } else if (form.entityName === APPLICATION_ENTITY) {
            return this.context.parameters.applicationId?.raw;
        } else {
            const isApplicationContactExtension = form.contactDetails && (await this.isRecordInEntity(form.entityName, form.contactDetails));
            const isApplicationExtension = form.applicationDetails && (await this.isRecordInEntity(form.entityName, form.applicationDetails));
            if (isApplicationContactExtension) {
                return form.contactDetails!;
            }
            if (isApplicationExtension) {
                return form.applicationDetails!;
            }
            return null;
        }
    }

    public async setEntityIdForAttachedForm(parsedTasks: ITask[]) {
        const promises = parsedTasks
            .filter((task: ITask) => task.taskDefinition.taskNavigation?.taskForm)
            .map(async (task: ITask) =>
                this.getEntityId(task.taskDefinition.taskNavigation!.taskForm!, task.relatedParty!.id).then(
                    entityId => (task.taskDefinition.taskNavigation!.taskForm = { ...task.taskDefinition.taskNavigation?.taskForm!, entityId })
                )
            );
        await Promise.all(promises);
    }

    public async fetchTasks({ shouldGetForms, processStage }: { shouldGetForms: boolean; processStage?: string }): Promise<ITask[]> {
        try {
            const action = this.createActionWithMultipleParams(
                [
                    { paramName: 'Application', data: this.context.parameters.applicationId?.raw, type: 'Edm.String' },
                    ...(processStage ? [{ paramName: 'ProcessStage', data: processStage, type: 'Edm.String' }] : []),
                    { paramName: 'ShouldGetForms', data: shouldGetForms, type: 'Edm.Boolean' },
                ],
                'msfsi_GetTasks'
            );
            const response = await this.ExecuteAndLog(
                PCFOnboardingApplicationTasksFetcher.name,
                'getTasks',
                'Calling retrieve tasks custom api.',
                'Successfully executed retrieve tasks custom api.',
                { action },
                () => this.execute(action)
            );
            const parsedTasks = parseTasksEntity(response.value);
            await this.setEntityIdForAttachedForm(parsedTasks);
            return parsedTasks;
        } catch (error) {
            this.loggerService.logError(
                PCFOnboardingApplicationTasksFetcher.name,
                'fetchClientData',
                'An error occured fetching client data.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    public async updateTaskStatus(updatedStatus: TaskStatusType, updatedState: TaskStateType, taskId: string): Promise<TaskStatusType> {
        const taskUpdate = {
            [TASK_FIELD_NAMES.STATUS_CODE]: updatedStatus,
            [TASK_FIELD_NAMES.STATE_CODE]: updatedState,
        };

        try {
            await this.context.webAPI.updateRecord(TASK_ENTITY, taskId, taskUpdate);
            return updatedStatus;
        } catch (error) {
            this.loggerService.logError(
                PCFOnboardingApplicationTasksFetcher.name,
                'updateClientData',
                'An error occured updating client data.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    public openForm(form: ITaskForm) {
        if (form.entityId) {
            this.context.navigation.navigateTo(
                {
                    entityName: form.entityName,
                    entityId: form.entityId,
                    formId: form.formId,
                    pageType: FORM_PAGE_TYPE as any,
                },
                { target: 2, width: { value: 80, unit: '%' as any }, height: { value: 80, unit: '%' as any }, position: 1 }
            );
        }
    }

    public hasTasksPrivilege(): boolean {
        return this.hasEntitiesPrivilege([ACTIVITY_ENTITY], PrivilegeType.Write);
    }

    public async updateTaskComment(comment: string, taskId: string): Promise<void> {
        const taskUpdate = {
            [TASK_FIELD_NAMES.COMMENT]: comment,
        };
        try {
            await this.context.webAPI.updateRecord(TASK_ENTITY, taskId, taskUpdate);
        } catch (error) {
            this.loggerService.logError(
                PCFOnboardingApplicationTasksFetcher.name,
                'updateCommentPerTask',
                'An error occured updating client data.',
                FSIErrorTypes.ServerError,
                error
            );
            throw error;
        }
    }

    public async fetchTaskByTaskDefinitionId({ applicationId, taskDefinitionId, level }): Promise<IVerificationTask> {
        try {
            const encodedFetchXml = encodeURIComponent(fetchTaskByTaskDefinitionIdQuery({ applicationId, taskDefinitionId, level }));
            const result = await this.context.webAPI.retrieveMultipleRecords('task', `?fetchXml=${encodedFetchXml}`);
            if (result?.entities?.length > 1) {
                throw new Error(CONFIGURATION_ERROR);
            }

            const entity = result.entities?.[0] || {};
            return {
                id: entity.activityid,
                name: entity[`${TASK_DEFINITION_ALIAS}.msfsi_name`],
                status: entity.statuscode,
                state: entity.statecode,
                regardingId: entity.regardingobject,
                regarding: entity['regardingobject@OData.Community.Display.V1.FormattedValue'],
                processStage: entity[`${TASK_DEFINITION_ALIAS}.msfsi_processstage`],
            };
        } catch (e) {
            this.loggerService.logError(
                PCFOnboardingApplicationTasksFetcher.name,
                'fetchTaskByTaskDefinitionId',
                'An error occurred getting task by definition id',
                FSIErrorTypes.ServerError,
                e
            );
            if ((e as any).errorCode === UciErrorCodes.InvalidArgument) {
                (e as Error).message = CONFIGURATION_ERROR;
            }
            throw e;
        }
    }
}
