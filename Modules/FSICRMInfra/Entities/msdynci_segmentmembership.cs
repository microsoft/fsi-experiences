using Microsoft.CloudForFSI.ErrorMessages.Localization;
using Microsoft.CloudForFSI.Infra;
using Microsoft.CloudForFSI.Infra.CI.Services;
using Microsoft.CloudForFSI.Infra.ErrorManagers;
using Microsoft.CloudForFSI.Infra.Plugins;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Microsoft.CloudForFSI.Tables
{
    public partial class msdynci_segmentmembership : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public IEnumerable<CustomerInsightsColumns> GetCiCustomerSegments(string customerId, List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(customerId, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation($"Starting GetCiCustomerSegments() with parameter customerId = {customerId}", this.GetType().Name);

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = nameof(this.msdynci_customerid).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { customerId }
                    }
                }
            };

            filterExpression.Conditions.AddRange(conditions);

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(
                    new QueryExpression
                    {
                        EntityName = EntityLogicalName,
                        ColumnSet = new ColumnSet(nameof(this.msdynci_segments).ToLower(), nameof(this.msdynci_customerid).ToLower()),
                        Criteria = filterExpression
                    })
                .Entities;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { nameof(msdynci_segmentmembership), exception.Message });
            }

            return entities
                .Where(entity => entity != null)
                .Select(entity => entity.ToEntity<msdynci_segmentmembership>())
                .Select(entity => this.convertToCICObj(entity));
        }

        public IEnumerable<CustomerInsightsColumns> GetAllCiCustomerSegments(List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation("Starting GetAllCiCustomerSegments()", this.GetType().Name);

            var queryExpression = new QueryExpression
            {
                EntityName = EntityLogicalName,
                ColumnSet = new ColumnSet(nameof(this.msdynci_segments).ToLower(), nameof(this.msdynci_customerid).ToLower())
            };

            if (conditions != null && conditions.Count > 0)
            {
                queryExpression.Criteria = new FilterExpression();
                queryExpression.Criteria.Conditions.AddRange(conditions);
            }

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(queryExpression).Entities;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { nameof(msdynci_segmentmembership), exception.Message });
            }

            pluginParameters.LoggerService.LogInformation($"entities retrieved: {entities.Count}", this.GetType().Name);
            return entities
                .Select(entity => this.convertToCICObj(entity));
        }

        private CustomerInsightsColumns convertToCICObj(Entity entity)
        {
            var segmentEntity = entity?.ToEntity<msdynci_segmentmembership>();
            var segmentsDictionary = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(segmentEntity?.msdynci_segments);
            var segmentsAndCustomer = new Dictionary<string, string> { { "CustomerId", segmentEntity?.msdynci_customerid } };
            segmentsDictionary.TryGetValue("Segments", out var segmentsList);
            foreach (var segment in segmentsList)
            {
                segmentsAndCustomer.Add(segment, "");
            }

            return new CustomerInsightsColumnsBuilder()
                        .WithCiValueDictionaryAndCustomerId(segmentsAndCustomer, this.CustomerIdJsonFieldColumn())
                        .Build();

        }

        private string CustomerIdJsonFieldColumn() => "CustomerId";
    }
}