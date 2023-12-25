namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.GetTasks
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using static GetTasksConstants;
    using static GetTasksMapper;

    public static class GetTasksUtils
    {
        public static Guid GetTaskNavigationId(msfsi_tasknavigation taskNavigation)
        => taskNavigation.GetAttributeValue<Guid>(msfsi_tasknavigation.PrimaryIdAttribute);

        public static Guid GetOnboardingFormId(msfsi_onboardingform onboardingForm)
        => Guid.Parse
            (
            onboardingForm.GetAttributeValue<string>(msfsi_onboardingform.FormIdFieldName)
            );

        public static string GetTaskFormEntityName(Guid taskFormId, IEnumerable<msfsi_onboardingform> onBoardingFormEntities)
        {
            var onboardingFormEntity = onBoardingFormEntities.ToList().Find(onboardingForm => GetOnboardingFormId(onboardingForm) == taskFormId);
            if (onboardingFormEntity == null)
            {
                return null;
            }

            onboardingFormEntity.TryGetAttributeValue<string>(msfsi_onboardingform.EntityNameFieldName, out var entityName);
            return entityName;
        }

        public static msfsi_tasknavigation GetTaskNavigation(Task task, IEnumerable<msfsi_tasknavigation> forms = default)
        {
            var key = $@"{TaskNavigationAlias}.{msfsi_tasknavigation.PrimaryIdAttribute}";
            var taskNavigationId = FieldMapper[key].GetData(task, key);
            if (!(taskNavigationId is TryGetAttributeValueError))
            {
                return forms.ToList().Find(taskNavigation => GetTaskNavigationId(taskNavigation) == (Guid)taskNavigationId);
            }

            return null;
        }

        public static Guid GetTaskNavigationFormId(msfsi_tasknavigation taskNavigation)
        {
            taskNavigation.TryGetAttributeValue<EntityReference>(msfsi_tasknavigation.TaskFormFieldName, out var taskForm);
            if (taskForm == null)
            {
                return default(Guid);
            }

            return taskForm.Id;
        }

        public static string FetchTasksQuery(string application, string processStage, bool shouldGetCanceledTasks)
        {
            var cancelFilter = shouldGetCanceledTasks ? "" :
                $@"<filter>
                    <condition attribute=""{Task.StateCodeFieldName}"" operator=""ne"" value=""2"" />
                </filter>";

            var processStageFilter = string.IsNullOrEmpty(processStage) ? "" :
                $@"<filter type=""or"">
                    <condition attribute=""{msfsi_taskdefinition.ProcessStageFieldName}"" operator=""eq"" value=""{processStage}"" />
                    <condition attribute=""{msfsi_taskdefinition.ProcessStageFieldName}"" operator=""null"" />
                </filter>";


            return $@"
                <fetch>
                    <entity name=""{Task.EntityLogicalName}"">
                        <attribute name=""{Task.PrimaryIdAttribute}"" />
                        <attribute name=""{Task.StatusCodeFieldName}"" />
                        <attribute name=""{Task.ModifiedOnFieldName}"" />
                        <attribute name=""{Task.CreatedOnFieldName}"" />
                        <attribute name=""{Task.CommentNameFieldName}"" />
                        <attribute name=""{Task.CommentModifiedOnFieldName}"" />
                        <attribute name=""{Task.CommentModifiedByFieldName}"" />
                        <filter>
                            <condition attribute=""{Task.RegardingObjectIdFieldName}"" operator=""eq"" value=""{application}"" />
                        </filter>
                        {cancelFilter}
                        <link-entity name=""{msfsi_taskdefinition.EntityLogicalName}"" from=""{msfsi_taskdefinition.PrimaryIdAttribute}"" to=""{Task.TaskDefinitionFieldName}"" alias=""{TaskDefinitionAlias}"">
                            <attribute name=""{msfsi_taskdefinition.PrimaryIdAttribute}"" />
                            <attribute name=""{msfsi_taskdefinition.NameFieldName}"" />
                            <attribute name=""{msfsi_taskdefinition.AssociationTypeFieldName}"" />
                            <attribute name=""{msfsi_taskdefinition.ProcessStageFieldName}"" />
                            <attribute name=""{msfsi_taskdefinition.TaskTypeName}"" />
                            {processStageFilter}
                            <link-entity name=""{msfsi_taskgroup.EntityLogicalName}"" from=""{msfsi_taskgroup.PrimaryIdAttribute}"" to=""{msfsi_taskdefinition.TaskGroupFieldName}"" alias=""{TaskGroupAlias}"">
                                <attribute name=""{msfsi_taskgroup.NameFieldName}"" />
                                <attribute name=""{msfsi_taskgroup.OrderFieldName}"" />
                            </link-entity>
                            <link-entity name=""{msfsi_tasknavigation.EntityLogicalName}"" from=""{msfsi_tasknavigation.PrimaryIdAttribute}"" to=""{msfsi_taskdefinition.TaskNavigationFieldName}"" alias=""{TaskNavigationAlias}"" link-type=""outer"">
                                <attribute name=""{msfsi_tasknavigation.PrimaryIdAttribute}"" />
                                <attribute name=""{msfsi_tasknavigation.TypeFieldName}"" />
                                <attribute name=""{msfsi_tasknavigation.DetailsFieldName}"" />
                            </link-entity>
                        </link-entity>
                        <link-entity name=""{SystemUser.EntityLogicalName}"" from=""{SystemUser.PrimaryIdAttribute}"" to=""{SystemUser.ModifiedByFieldName}"" alias=""{ModifiedByAlias}"">
                            <attribute name=""{SystemUser.FullNameFieldName}"" />
                        </link-entity>
                        <link-entity name=""{msfsi_relatedpartycontract.EntityLogicalName}"" from=""{msfsi_relatedpartycontract.PrimaryIdAttribute}"" to=""{Task.RelatedPartyContractFieldName}"" alias=""{RelatedPartyContractAlias}"" link-type=""outer"">
                            <attribute name=""{msfsi_relatedpartycontract.NameFieldName}"" />
                            <attribute name=""{msfsi_relatedpartycontract.PrimaryIdAttribute}"" />
                            <attribute name=""{msfsi_relatedpartycontract.ContactFieldName}"" />
                            <link-entity name=""{msfsi_relatedpartyrole.EntityLogicalName}"" from=""{msfsi_relatedpartyrole.PrimaryIdAttribute}"" to=""{msfsi_relatedpartycontract.RoleFieldName}"" alias=""{RoleAlias}"" link-type=""outer"">
                                <attribute name=""{msfsi_relatedpartyrole.NameFieldName}"" />
                            </link-entity>
                        </link-entity>
                        <link-entity name=""{msfsi_application.EntityLogicalName}"" from=""{msfsi_application.PrimaryIdAttribute}"" to=""{Task.RegardingObjectIdFieldName}"" alias=""{ApplicationAlias}"">
                            <attribute name=""{msfsi_application.DetailsIdFieldName}"" />
                            <attribute name=""{msfsi_application.PrimaryNameAttribute}"" />
                            <attribute name=""{msfsi_application.PrimaryApplicantFieldName}"" />
                        </link-entity>
                    </entity>
                </fetch>
            ";
        }
    }
}