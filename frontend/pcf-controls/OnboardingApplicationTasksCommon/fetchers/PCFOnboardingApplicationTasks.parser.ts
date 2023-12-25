import { ITask } from '@fsi/onboarding-application/interfaces/ITask';

export const parseTasksEntity = (tasks): ITask[] => {
    const formatTask = task => ({
        id: task.id,
        modifiedBy: task.modifiedOn === task.createdOn ? undefined : task.modifiedBy,
        status: task.status,
        ...(task.applicationContactId && {
            relatedParty: {
                id: task.applicationContactId,
                name: task.associatedContact,
                ...(task.applicantRole && { role: task.applicantRole }),
                isPrimary: task.primaryRelatedParty === task.applicationContactId,
            },
        }),
        comment: task.comment,
        commentModifiedOn: task.commentModifiedOn,
        commentModifiedBy: task.commentModifiedBy,
        taskDefinition: {
            id: task.taskDefinitionId,
            name: task.name,
            applicationName: task.applicationName,
            group: {
                name: task.groupName,
                order: task.groupOrder,
            },
            taskType: task.taskType,
            associationType: task.associationType,
            processStage: task.processStage,
            ...(task.navigationType
                ? {
                      taskNavigation: {
                          type: task.navigationType,
                          details: task.navigationDetails,
                          taskForm: task.formId &&
                              task.entityName && {
                                  formId: task.formId,
                                  entityName: task.entityName,
                                  contactDetails: task.contactDetails,
                                  applicationDetails: task.applicationDetails,
                              },
                      },
                  }
                : {}),
        },
    });
    return tasks.map(task => formatTask(task));
};
