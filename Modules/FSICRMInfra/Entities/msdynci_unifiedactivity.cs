namespace Microsoft.CloudForFSI.Tables
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Infra;
    using Infra.CI.Services;
    using Infra.CustomWorkflow;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;
    using Crm.Sdk.Messages;
    using ErrorMessages.Localization;
    using Infra.ErrorManagers;
    using Infra.Logger;
    using Infra.Plugins;
    using Xrm.Sdk.PluginTelemetry;

    public partial class msdynci_unifiedactivity : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public const string sourceEntityName = "msind_industryunifiedactivity";
        public const string targetEntityName = "msdynci_unifiedactivity";
        public const string contactAttributeName = "msind_contactid";
        public const string customerProfileAttributeName = "msdynci_customerid";

        private readonly CiArtifactManager _manager = new CiArtifactManager();
        private readonly EntityCollection filteredContacts = new EntityCollection() { EntityName = Contact.EntityLogicalName, TotalRecordCount = 0 };

        public EntityCollection GetCiUnifiedActivities(QueryExpression sourceQuery, string[] transformedColumns, FilterExpression transformedFilter, OrderExpression[] transformedOrders, PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new object[] { this.LogicalName });
            }

            this.TraceFetchXML(sourceQuery, pluginParameters.OrganizationService, pluginParameters.LoggerService);

            var targetColumnSet = new ColumnSet();
            targetColumnSet.AddColumns(transformedColumns);

            foreach (var le in sourceQuery.LinkEntities)
            {
                if (le.LinkToEntityName == Contact.EntityLogicalName)
                {
                    //--Found a link to the Contact, need to execute this as a seperate query to get the applicable contact ids
                    this.RetrieveContacts(le, 1, pluginParameters.OrganizationService, pluginParameters.LoggerService);
                }
            }

            if (this.filteredContacts.TotalRecordCount > 0)
            {
                var contactCondition = new ConditionExpression() { AttributeName = contactAttributeName, Operator = ConditionOperator.In };
                this._manager.FillTheMappingCache(pluginParameters);

                foreach (var contact in this.filteredContacts.Entities)
                {
                    var fKeyVal = this._manager._ciCustomerIdToContactMapping.Where(k => k.Value == contact.Id.ToString());
                    if (fKeyVal.Count() > 0)
                    {
                        contactCondition.Values.Add(new Guid(fKeyVal.First().Key));
                    } 
                }

                var contactFilter = new FilterExpression() { FilterOperator = LogicalOperator.And };
                contactFilter.Conditions.Add(contactCondition);
                sourceQuery.Criteria.AddFilter(contactFilter);

                this.TraceFetchXML(sourceQuery, pluginParameters.OrganizationService, pluginParameters.LoggerService);
            }

            //--Platform fixed the bug that was affecting Subgrid Paging
            //var bugFixCondition = new ConditionExpression() { AttributeName = targetEntityName + "id", Operator = ConditionOperator.NotNull };
            //transformedFilter.AddCondition(bugFixCondition);

            EntityCollection results = default;
            try
            {
                var targetQuery = new QueryExpression
                {
                    ColumnSet = targetColumnSet,
                    EntityName = targetEntityName,
                    Criteria = transformedFilter,
                    PageInfo = sourceQuery.PageInfo
                };
                targetQuery.PageInfo.ReturnTotalRecordCount = true;
                targetQuery.Orders.AddRange(transformedOrders);
                this.TraceFetchXML(targetQuery, pluginParameters.OrganizationService, pluginParameters.LoggerService);

                results = pluginParameters.OrganizationService.RetrieveMultiple(targetQuery);
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msdynci_unifiedactivity), exception.Message });
            }

            var tResults = this.TransformEntities(results, pluginParameters);

            return tResults;
        }

        public Entity GetCiUnifiedActivity(EntityReference sourceRef, string[] transformedColumns, PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation($"Starting GetCiUnifiedActivitiy() for id = {sourceRef.Id}", this.GetType().Name);

            var targetColumnSet = new ColumnSet();
            targetColumnSet.AddColumns(transformedColumns);

            var transformedEntity = new Entity() { LogicalName = sourceEntityName, Id = sourceRef.Id, Attributes = new AttributeCollection() };

            try
            {
                var target = pluginParameters.OrganizationService.Retrieve(targetEntityName, sourceRef.Id, targetColumnSet);
                transformedEntity = this.TransformEntity(target, pluginParameters);
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msdynci_unifiedactivity), exception.Message });
            }

            return transformedEntity;
        }

        private void RetrieveContacts(LinkEntity linkEntity, int pageNumber, IOrganizationService organizationService, ILoggerService loggerService)
        {
            var contactQuery = new QueryExpression() { EntityName = Contact.EntityLogicalName, ColumnSet = new ColumnSet() };
            contactQuery.ColumnSet.AddColumn(Contact.PrimaryIdAttribute);
            contactQuery.Criteria = linkEntity.LinkCriteria;
            contactQuery.PageInfo = new PagingInfo() { Count = 5000, PageNumber = pageNumber, ReturnTotalRecordCount = true };

            var contactResults = organizationService.RetrieveMultiple(contactQuery);
            this.filteredContacts.Entities.AddRange(contactResults.Entities);
            this.filteredContacts.TotalRecordCount = contactResults.TotalRecordCount;

            if (contactResults.MoreRecords)
            {
                var nextPage = pageNumber + 1;
                this.RetrieveContacts(linkEntity, nextPage, organizationService, loggerService);
            }
        }

        public EntityCollection TransformEntities(EntityCollection entityCollection, PluginParameters pluginParameters)
        {
            var outputCollection = new EntityCollection() { EntityName = sourceEntityName };
            pluginParameters.LoggerService.LogInformation(entityCollection.TotalRecordCount.ToString(), this.GetType().Name);
            outputCollection.TotalRecordCount = entityCollection.TotalRecordCount;
            outputCollection.MoreRecords = entityCollection.MoreRecords;
            outputCollection.PagingCookie = entityCollection.PagingCookie;
            outputCollection.MinActiveRowVersion = entityCollection.MinActiveRowVersion;
            outputCollection.TotalRecordCountLimitExceeded = entityCollection.TotalRecordCountLimitExceeded;

            foreach (var orginalEntity in entityCollection.Entities)
            {
                var outputEntity = this.TransformEntity(orginalEntity, pluginParameters);
                outputCollection.Entities.Add(outputEntity);
            }

            return outputCollection;
        }

        public Entity TransformEntity(Entity inputEntity, PluginParameters pluginParameters)
        {
            var invalidAttributes = new List<string>(new string[]
            { "createdby", "createdon", "createdonbehalfby", "importsequencenumber", "modifiedby", "modifiedon", "modifiedonbehalfby",
                "msdynci_lookupfield_customer", "overriddencreatedon", "partitionid", "ttlinseconds", "versionnumber" });

            var outputEntity = new Entity(sourceEntityName) { Id = inputEntity.Id };

            var transformedAttributes = new AttributeCollection();
            var filteredAttributes = inputEntity.Attributes.Where(a => !invalidAttributes.Contains(a.Key));

            foreach (var origAttr in filteredAttributes)
            {
                var transformedAttr = new KeyValuePair<string, object>();
                var addAttribute = true;
                var targetPrimaryKeyAttr = string.Concat(targetEntityName, "id");
                var sourcePrimaryKeyAttr = string.Concat(sourceEntityName, "id");

                if (origAttr.Key != targetPrimaryKeyAttr && origAttr.Key != customerProfileAttributeName)
                {
                    transformedAttr = new KeyValuePair<string, object>(origAttr.Key.Replace("msdynci", "msind"), origAttr.Value);
                }
                else if (origAttr.Key == targetPrimaryKeyAttr)
                {
                    transformedAttr = new KeyValuePair<string, object>(sourcePrimaryKeyAttr, origAttr.Value);
                }
                else if (origAttr.Key == customerProfileAttributeName)
                {
                    var contactid = this._manager.GetContactId(((string)origAttr.Value), pluginParameters);

                    if (contactid != null && contactid != string.Empty)
                    {
                        transformedAttr = new KeyValuePair<string, object>(contactAttributeName, new EntityReference() { LogicalName = "contact", Id = new Guid(contactid) });
                    }
                    else
                    {
                        addAttribute = false;
                    } 
                }

                if (addAttribute)
                {
                    transformedAttributes.Add(transformedAttr);
                }
            }

            outputEntity.Attributes = transformedAttributes;

            return outputEntity;
        }

        private void TraceFetchXML(QueryExpression query, IOrganizationService organizationService, ILoggerService loggerService)
        {
            var qfRequest = new QueryExpressionToFetchXmlRequest {Query = query};
            var qfResponse = (QueryExpressionToFetchXmlResponse)organizationService.Execute(qfRequest);

            loggerService.LogInformation(qfResponse.FetchXml, this.GetType().Name);
        }
    }
}
