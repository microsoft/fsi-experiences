namespace Microsoft.CloudForFSI.Tables
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Infra.CI.Services;
    using Infra.CustomWorkflow;
    using Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;
    using Xrm.Sdk.Query;

    public partial class msdynci_prediction : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public string GetCiModelOutputs(string customerId, string modelName, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(customerId, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(modelName, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new object[] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation($"Starting GetCiModelOutputs() with parameters [customerId = {customerId}, modelName = {modelName}]", this.GetType().Name);

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = nameof(this.msdynci_customerid).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { customerId }
                    },
                    new ConditionExpression
                    {
                        AttributeName = nameof(this.msdynci_model).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { modelName }
                    }
                }
            };

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(
                    new QueryExpression
                    {
                        EntityName = EntityLogicalName,
                        ColumnSet = new ColumnSet(nameof(this.msdynci_values).ToLower()),
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
                    new [] { nameof(msdynci_prediction), exception.Message });
            }

            var modelResultJson =
                entities
                .Where(entity => entity != null)
                .Select(entity => entity.ToEntity<msdynci_prediction>())
                .Select(entity => entity.msdynci_values)
                .FirstOrDefault();

            pluginParameters.LoggerService.LogInformation($"Resulted CI model outputs: \n{modelResultJson}", this.GetType().Name);

            return modelResultJson;
        }

        public IEnumerable<CustomerInsightsColumns> GetAllCustomerCiModelOutputs(string customerId, List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(customerId, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation($"Starting GetCiModelOutputs() with parameters [customerId = {customerId}]", this.GetType().Name);

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
                        ColumnSet = new ColumnSet(nameof(this.msdynci_model).ToLower(), nameof(this.msdynci_values).ToLower(), nameof(this.ModifiedOn).ToLower()),
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
                    new [] { nameof(msdynci_prediction), exception.Message });
            }

            return this.ExtractPredictionDictionary(entities, pluginParameters.LoggerService);
        }

        public IEnumerable<CustomerInsightsColumns> GetAllCiModelOutputs(List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }
            
            var queryExpression = new QueryExpression
            {
                EntityName = EntityLogicalName,
                ColumnSet = new ColumnSet(nameof(this.msdynci_model), nameof(this.msdynci_values).ToLower(), nameof(this.ModifiedOn).ToLower()),
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
                    new [] { nameof(msdynci_prediction), exception.Message });
            }

            return this.ExtractPredictionDictionary(entities, pluginParameters.LoggerService);
        }

        public IEnumerable<CustomerInsightsColumns> ExtractPredictionDictionary(DataCollection<Entity> entities, ILoggerService loggerService)
        {
            return entities
                .Select(entity => {
                    var prediction = entity?.ToEntity<msdynci_prediction>();
                    var dictionary = CiArtifactManager.ParseJsonToDictionary(prediction?.msdynci_values, loggerService);

                    if (dictionary != null)
                    {
                        dictionary.Add(nameof(prediction.msdynci_model), prediction?.msdynci_model);

                        return new CustomerInsightsColumnsBuilder()
                                .WithCiValueDictionaryAndCustomerId(dictionary, this.CustomerIdJsonFieldColumn())
                                .WithModifiedOn(prediction.ModifiedOn)
                                .Build();
                    }

                    return null;
                });
        }

        private string CustomerIdJsonFieldColumn() => "CustomerID";
    }
}