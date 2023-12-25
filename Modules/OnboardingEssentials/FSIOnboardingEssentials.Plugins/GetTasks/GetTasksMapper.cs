namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.GetTasks
{
    using System;
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using static GetTasksConstants;

    public static class GetTasksMapper
    {
        public class OutputEntityData
        {
            public string Name;
            public Func<Task, string, object> GetData;
        }

        public class TryGetAttributeValueError
        {
        }

        public static Dictionary<string, OutputEntityData> FieldMapper = new Dictionary<string, OutputEntityData>()
        {
            {Task.PrimaryIdAttribute, new OutputEntityData() { Name = "id", GetData = GetData<Guid> }},
            {$@"{TaskDefinitionAlias}.{msfsi_taskdefinition.NameFieldName}", new OutputEntityData() { Name = "name", GetData = GetAliasedValueData }},
            {$@"{TaskDefinitionAlias}.{msfsi_taskdefinition.PrimaryIdAttribute}", new OutputEntityData() { Name = "taskDefinitionId", GetData = GetAliasedValueData }},
            {$@"{TaskDefinitionAlias}.{msfsi_taskdefinition.AssociationTypeFieldName}", new OutputEntityData() { Name = "associationType", GetData = GetAliasedOptionSetData }},
            {$@"{TaskDefinitionAlias}.{msfsi_taskdefinition.ProcessStageFieldName}", new OutputEntityData() { Name = "processStage", GetData = GetAliasedEntityReferenceData }},
            {$@"{TaskDefinitionAlias}.{msfsi_taskdefinition.TaskTypeName}", new OutputEntityData() { Name = "taskType", GetData = GetAliasedOptionSetData }},
            {$@"{RelatedPartyContractAlias}.{msfsi_relatedpartycontract.PrimaryIdAttribute}", new OutputEntityData() { Name = "applicationContactId", GetData = GetAliasedValueData }},
            {$@"{RelatedPartyContractAlias}.{msfsi_relatedpartycontract.NameFieldName}", new OutputEntityData() { Name = "associatedContact", GetData = GetAliasedValueData }},
            {$@"{RelatedPartyContractAlias}.{msfsi_relatedpartycontract.ContactFieldName}", new OutputEntityData() { Name = "contactDetails", GetData = GetAliasedEntityReferenceData }},
            {$@"{RoleAlias}.{msfsi_relatedpartyrole.NameFieldName}", new OutputEntityData() { Name = "applicantRole", GetData = GetAliasedValueData }},
            {Task.ModifiedOnFieldName, new OutputEntityData() { Name = "modifiedOn", GetData = GetData<DateTime> }},
            {Task.CreatedOnFieldName, new OutputEntityData() { Name = "createdOn", GetData = GetData<DateTime> }},
            {Task.CommentNameFieldName, new OutputEntityData() { Name = "comment", GetData = GetData<string> }},
            {Task.CommentModifiedOnFieldName, new OutputEntityData() { Name = "commentModifiedOn", GetData = GetData<DateTime> }},
            {Task.CommentModifiedByFieldName, new OutputEntityData() { Name = "commentModifiedBy", GetData = GetEntityReferenceData }},
            {Task.StatusCodeFieldName, new OutputEntityData() { Name = "status", GetData = GetOptionSetValueData }},
            {$@"{ModifiedByAlias}.{SystemUser.FullNameFieldName}", new OutputEntityData() { Name = "modifiedBy", GetData = GetAliasedValueData }},
            {$@"{TaskGroupAlias}.{msfsi_taskgroup.NameFieldName}", new OutputEntityData() { Name = "groupName", GetData = GetAliasedValueData }},
            {$@"{TaskGroupAlias}.{msfsi_taskgroup.OrderFieldName}", new OutputEntityData() { Name = "groupOrder", GetData = GetAliasedValueData }},
            {$@"{ApplicationAlias}.{msfsi_application.DetailsIdFieldName}", new OutputEntityData() { Name = "applicationDetails", GetData = GetAliasedEntityReferenceData }},
            {$@"{ApplicationAlias}.{msfsi_application.PrimaryNameAttribute}", new OutputEntityData() { Name = "applicationName", GetData = GetAliasedValueData }},
            {$@"{ApplicationAlias}.{msfsi_application.PrimaryApplicantFieldName}", new OutputEntityData() { Name = "primaryRelatedParty", GetData = GetAliasedEntityReferenceData }},
            {$@"{TaskNavigationAlias}.{msfsi_tasknavigation.PrimaryIdAttribute}", new OutputEntityData() { Name = "navigationId", GetData = GetAliasedValueData }},
            {$@"{TaskNavigationAlias}.{msfsi_tasknavigation.TypeFieldName}", new OutputEntityData() { Name = "navigationType", GetData = GetAliasedOptionSetData }},
            {$@"{TaskNavigationAlias}.{msfsi_tasknavigation.DetailsFieldName}", new OutputEntityData() { Name = "navigationDetails", GetData = GetAliasedValueData }},
        };

        private static object GetData<T>(Task task, string key)
        {
            var isGetSuccessful = task.TryGetAttributeValue(key, out T outVar);
            if (!isGetSuccessful)
            {
                return new TryGetAttributeValueError();
            }

            return outVar;
        }

        private static object GetAliasedValueData(Task task, string key)
        {
            var isGetSuccessful = task.TryGetAttributeValue(key, out AliasedValue outVar);
            if (!isGetSuccessful)
            {
                return new TryGetAttributeValueError();
            }

            return outVar.Value;
        }

        private static object GetOptionSetValueData(Task task, string key)
        {
            var isGetSuccessful = task.TryGetAttributeValue(key, out OptionSetValue outVar);
            if (!isGetSuccessful)
            {
                return new TryGetAttributeValueError();
            }

            return outVar.Value;
        }
        
        private static object GetAliasedEntityReferenceData(Task task, string key)
        {
            var isGetSuccessful = task.TryGetAttributeValue(key, out AliasedValue outVar);
            if (!isGetSuccessful)
            {
                return new TryGetAttributeValueError();
            }

            return ((EntityReference)outVar.Value).Id;
        }

        private static object GetAliasedOptionSetData(Task task, string key)
        {
            var isGetSuccessful = task.TryGetAttributeValue(key, out AliasedValue outVar);
            if (!isGetSuccessful)
            {
                return new TryGetAttributeValueError();
            }

            return ((OptionSetValue)outVar.Value).Value;
        }

        private static object GetEntityReferenceData(Task task, string key)
        {
            var isGetSuccessful = task.TryGetAttributeValue(key, out EntityReference outVar);
            if (!isGetSuccessful)
            {
                return new TryGetAttributeValueError();
            }

            return ((EntityReference)outVar).Name;
        }

    }
}