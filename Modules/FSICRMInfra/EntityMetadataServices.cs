namespace Microsoft.CloudForFSI.Infra
{
    using System;
    using Xrm.Sdk;
    using Xrm.Sdk.Messages;
    using Xrm.Sdk.Metadata.Query;
    using Xrm.Sdk.Query;

    public class EntityMetadataServices
    {
        public static bool IsSchemaExists(string entityName, IOrganizationService organizationService)
        {
            if (organizationService == null)
            {
                throw new ArgumentNullException("OrganizationService cannot be null");
            }

            if (string.IsNullOrWhiteSpace(entityName))
            {
                throw new ArgumentException("Entity name cannot be null, empty or composed of whitespaces.");
            }

            var entityFilter = new MetadataFilterExpression(LogicalOperator.And);
            entityFilter.Conditions.Add(new MetadataConditionExpression("LogicalName", MetadataConditionOperator.Equals, entityName));

            var properties = new MetadataPropertiesExpression()
            {
                AllProperties = false,
                PropertyNames = { "DisplayName" }
            };

            var entityQueryExpression = new EntityQueryExpression()
            {
                Criteria = entityFilter,
                Properties = properties
            };

            var retrieveMetadataChangesRequest = new RetrieveMetadataChangesRequest() 
            {
                Query = entityQueryExpression
            };

            return organizationService.Execute(retrieveMetadataChangesRequest) is RetrieveMetadataChangesResponse metadataResponse &&
                   metadataResponse.EntityMetadata.Count > 0;
        }
    }
}