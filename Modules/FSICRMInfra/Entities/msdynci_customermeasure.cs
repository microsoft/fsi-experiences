namespace Microsoft.CloudForFSI.Tables
{
    using ErrorMessages.Localization;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Infra.CI.Services;
    using Infra.CustomWorkflow;
    using Infra.ErrorManagers;
    using Infra.Plugins;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;
    using Xrm.Sdk.Query;
    using Microsoft.CloudForFSI.Infra.Logger;

    public partial class msdynci_customermeasure : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public IEnumerable<CustomerInsightsColumns> GetCiCustomerMeasures(string customerId, List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(customerId, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new object[] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation($"Starting GetCiCustomerMeasures() with parameter customerId = {customerId}", this.GetType().Name);

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
                        ColumnSet = new ColumnSet(nameof(this.msdynci_measures).ToLower(), nameof(this.ModifiedOn).ToLower()),
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
                    new [] { nameof(msdynci_customermeasure), exception.Message });
            }

            return entities
                .Where(entity => entity != null)
                .Select(entity => entity.ToEntity<msdynci_customermeasure>())
                .Select(entity => new CustomerInsightsColumnsBuilder().WithCiValueDictionaryAndCustomerId(
                    CiArtifactManager.ParseJsonToDictionary(entity.msdynci_measures, pluginParameters.LoggerService), this.CustomerIdJsonFieldColumn())
                    .WithModifiedOn(entity.ModifiedOn)
                    .Build());
        }

        public IEnumerable<CustomerInsightsColumns> GetAllCiCustomerMeasures(List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters, 
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation("Starting GetAllCiCustomerMeasures()", this.GetType().Name);

            var queryExpression = new QueryExpression
            {
                EntityName = EntityLogicalName,
                ColumnSet = new ColumnSet(nameof(this.msdynci_measures).ToLower(), nameof(this.ModifiedOn).ToLower())
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
                    new [] { nameof(msdynci_customermeasure), exception.Message });
            }

            pluginParameters.LoggerService.LogInformation($"entities retrieved: {entities.Count}", this.GetType().Name);
            return entities
                .Select(entity => entity?.ToEntity<msdynci_customermeasure>())
                .Select(entity => this.convertToCustomerInsightsTableColumns(entity, pluginParameters.LoggerService));
        }

        private CustomerInsightsColumns convertToCustomerInsightsTableColumns(msdynci_customermeasure entityObject, ILoggerService loggerService)
        {
            var measuresDictionary = CiArtifactManager.ParseJsonToDictionary(entityObject.msdynci_measures, loggerService);
            return new CustomerInsightsColumnsBuilder().WithCiValueDictionaryAndCustomerId(
                                measuresDictionary, this.CustomerIdJsonFieldColumn())
                                .WithModifiedOn(entityObject.ModifiedOn)
                                .Build();
        }

        private string CustomerIdJsonFieldColumn() => "CustomerId";
    }
}
