namespace Microsoft.CloudForFSI.Tables
{
    using ErrorMessages.Localization;
    using System;
    using System.Linq;
    using Infra;
    using Infra.CustomWorkflow;
    using Infra.ErrorManagers;
    using Infra.Plugins;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;
    using Xrm.Sdk.Query;

    public partial class msind_EntitytoCICustomerMapping : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        private ColumnSet _columns;

        public Tuple<string, string> GetCiDataSourceAndCiEntityNameForEntityType(string entityType, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(entityType, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingFSIConfigTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = nameof(this.msind_EntityType).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { entityType }
                    }
                }
            };

            var ciCustomerMappingQuery = new QueryExpression
            {
                EntityName = EntityLogicalName,
                ColumnSet = this.GetColumnSet(),
                Criteria = filterExpression
            };

            var entities = pluginParameters.OrganizationService.RetrieveMultiple(ciCustomerMappingQuery)?.Entities;
            
            var instance = entities?.FirstOrDefault()?.ToEntity<msind_EntitytoCICustomerMapping>();
            if (instance == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.MissingConfigurationInChurnConfig,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msind_EntitytoCICustomerMapping) });
            }

            var ciDatasourceName = instance.msind_CIDatasourceName;
            var ciEntityName = instance.msind_CIEntityName;
            pluginParameters.LoggerService.LogInformation($"Acquired CI Datasource Name: {ciDatasourceName}, ciEntityName: {ciEntityName}", this.GetType().Name);

            if (string.IsNullOrWhiteSpace(ciDatasourceName))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.CiDataSourceAcquireFailed,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msind_EntitytoCICustomerMapping) });
            }

            if (string.IsNullOrWhiteSpace(ciEntityName))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.CiEntityNameNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msind_EntitytoCICustomerMapping) });
            }

            return Tuple.Create(ciDatasourceName, ciEntityName);
        }

        private ColumnSet GetColumnSet()
        {
            return this._columns ?? (this._columns = new ColumnSet(nameof(this.msind_CIDatasourceName).ToLower(), nameof(this.msind_CIEntityName).ToLower()));
        }
    }
}
