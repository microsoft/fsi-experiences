namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.OnboardingForm
{
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer;
    using Microsoft.CloudForFSI.OptionSets;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Messages;
    using Microsoft.Xrm.Sdk.Metadata;
    using Microsoft.Xrm.Sdk.Query;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class OnboardingFormDal : BasePluginDal, IOnboardingFormDal
    {
        public OnboardingFormDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext)
            : base(logger, organizationService, executionContext)
        {
        }

        public IEnumerable<string> RetrieveExtensionEntitiesName(string entityName, string referencingAttribute)
        {
            RetrieveEntityRequest retrieveEntityRequest = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.Relationships,
                LogicalName = entityName
            };
            RetrieveEntityResponse retrieveEntityResponse =
                (RetrieveEntityResponse)organizationService.Execute(retrieveEntityRequest);
            return retrieveEntityResponse.EntityMetadata.ManyToOneRelationships
                .Where(relationship => relationship.ReferencingAttribute == referencingAttribute)
                .Select(relationship => relationship.ReferencedEntity);
        }

        public IEnumerable<SystemForm> GetFormEntities(Guid formId = default(Guid))
        {
            var query = new QueryExpression(SystemForm.EntityLogicalName);
            query.ColumnSet.AddColumns("type", "objecttypecode", "name", "formid");
            query.Criteria.AddCondition("type", ConditionOperator.Equal, (int)SystemForm_Type.Main);
            List<string> entities = new List<string> { msfsi_application.EntityLogicalName, msfsi_relatedpartycontract.EntityLogicalName };
            entities = entities.Concat(this.RetrieveExtensionEntitiesName(msfsi_application.EntityLogicalName, msfsi_application.DetailsIdFieldName)).ToList();
            entities = entities.Concat(this.RetrieveExtensionEntitiesName(msfsi_relatedpartycontract.EntityLogicalName, msfsi_relatedpartycontract.ContactFieldName)).ToList();
            query.Criteria.AddCondition(
                "objecttypecode", 
                ConditionOperator.In, 
                entities.ToArray()
            );

            if (formId != default(Guid))
            {
                query.Criteria.AddCondition("formid", ConditionOperator.Equal, formId.ToString());
            }

            var formsCollection = organizationService.RetrieveMultiple(query);
            return formsCollection.Entities.OfType<SystemForm>();
        }

        public Entity GetOnboardingFormEntity(SystemForm systemFormEntity)
        {
            var entity = new Entity(msfsi_onboardingform.EntityLogicalName);
            entity[msfsi_onboardingform.PrimaryIdAttribute] = systemFormEntity.Id;
            entity[nameof(msfsi_onboardingform.msfsi_name)] = systemFormEntity.Name;
            entity[nameof(msfsi_onboardingform.msfsi_entityname)] = systemFormEntity.ObjectTypeCode;
            entity[nameof(msfsi_onboardingform.msfsi_formid)] = systemFormEntity.FormId.ToString();
            return entity;
        }
    }
}