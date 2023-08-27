namespace Microsoft.CloudForFSI.Tables
{
    using ErrorMessages.Localization;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Infra.CustomWorkflow;
    using Infra.ErrorManagers;
    using Infra.Plugins;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;
    using Xrm.Sdk.Query;

    public partial class msdynci_alternatekey : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public string GetCustomerId(string contactId, string dataSourceName, string ciEntityName, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(contactId, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(dataSourceName, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(ciEntityName, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new object[] { this.LogicalName });
            }
            
            pluginParameters.LoggerService.LogInformation($"Starting GetCustomerId() with parameters [contactId = {contactId}, dataSourceName = {dataSourceName}]", this.GetType().Name);
            
            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_alternatevalue",
                        Operator = ConditionOperator.Equal,
                        Values = { contactId }
                    },
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_datasourcename",
                        Operator = ConditionOperator.Equal,
                        Values = { dataSourceName }
                    },
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_entityname",
                        Operator = ConditionOperator.Equal,
                        Values = { ciEntityName }
                    }
                }
            };

            var alternateKeyEntityColumnNames = new ColumnSet(
                "msdynci_customerid",
                "msdynci_entityname",
                "msdynci_datasourcename",
                "msdynci_alternatevalue");

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(
                    new QueryExpression
                    {
                        EntityName = EntityLogicalName,
                        ColumnSet = alternateKeyEntityColumnNames,
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
                    new [] { nameof(msdynci_alternatekey), exception.Message });
            }
            
            var ciCustomerId =
                entities
                    .Where(entity => entity != null)
                    .Select(entity => entity.ToEntity<msdynci_alternatekey>())
                    .Select(entity => entity.msdynci_customerid)
                    .FirstOrDefault();

            pluginParameters.LoggerService.LogInformation($"Resulted CI customer ID = {ciCustomerId}", this.GetType().Name);

            return ciCustomerId;
        }

        public string GetContactId(string ciCustomerId, string dataSourceName, string ciEntityName, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(ciCustomerId, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(dataSourceName, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(ciEntityName, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            pluginParameters.LoggerService.LogInformation($"Starting GetContactId() with parameters [ciCustomerId = {ciCustomerId}, dataSourceName = {dataSourceName}]", this.GetType().Name);

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_customerid",
                        Operator = ConditionOperator.Equal,
                        Values = { ciCustomerId }
                    },
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_datasourcename",
                        Operator = ConditionOperator.Equal,
                        Values = { dataSourceName }
                    },
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_entityname",
                        Operator = ConditionOperator.Equal,
                        Values = { ciEntityName }
                    }
                }
            };

            var alternateKeyEntityColumnNames = new ColumnSet(
                "msdynci_customerid",
                "msdynci_entityname",
                "msdynci_datasourcename",
                "msdynci_alternatevalue");

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(
                    new QueryExpression
                    {
                        EntityName = EntityLogicalName,
                        ColumnSet = alternateKeyEntityColumnNames,
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
                    new [] { nameof(msdynci_alternatekey), exception.Message });
            }

            var contactId =
                entities
                    .Where(entity => entity != null)
                    .Select(entity => entity.ToEntity<msdynci_alternatekey>())
                    .Select(entity => entity.msdynci_alternatevalue)
                    .FirstOrDefault();

            pluginParameters.LoggerService.LogInformation($"Resulted Contact Id = {contactId}", this.GetType().Name);

            return contactId;
        }
        
        public Dictionary<string, string> GetAllCiCustomersToContactsMapping(string dataSourceName, string ciEntityName, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(dataSourceName, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(ciEntityName, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            var result = new Dictionary<string, string>();
            pluginParameters.LoggerService.LogInformation($"Starting GetAllCiCustomersToContactsMapping() with parameters [ciEntityName = {ciEntityName}, dataSourceName = {dataSourceName}]", this.GetType().Name);

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_datasourcename",
                        Operator = ConditionOperator.Equal,
                        Values = { dataSourceName }
                    },
                    new ConditionExpression
                    {
                        AttributeName = "msdynci_entityname",
                        Operator = ConditionOperator.Equal,
                        Values = { ciEntityName }
                    }
                }
            };

            var columnNames = new ColumnSet("msdynci_customerid", "msdynci_alternatevalue");

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(
                    new QueryExpression
                    {
                        EntityName = EntityLogicalName,
                        ColumnSet = columnNames,
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
                    new [] { nameof(msdynci_alternatekey), exception.Message });
            }

            entities
                .Where(entity => entity != null)
                .Select(entity => entity.ToEntity<msdynci_alternatekey>())
                .ToList()
                .ForEach(entity => result.Add(entity.msdynci_customerid, entity.msdynci_alternatevalue));

            return result;
        }
    }
}
