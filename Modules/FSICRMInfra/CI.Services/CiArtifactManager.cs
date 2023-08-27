namespace Microsoft.CloudForFSI.Infra.CI.Services
{
    using System;
    using System.Collections.Generic;
    using Xrm.Sdk;
    using Infra;
    using Tables;
    using ErrorManagers;
    using ErrorMessages.Localization;
    using Logger;
    using Newtonsoft.Json.Linq;
    using Plugins;
    using Xrm.Sdk.PluginTelemetry;

    public class CiArtifactManager
    {
        public Dictionary<string, string> _ciCustomerIdToContactMapping;

        public virtual string GetCiCustomerId(string contactId, string entityType, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(contactId, pluginParameters);
            ParameterHandler.ThrowIfNullOrEmpty(entityType, pluginParameters);

            pluginParameters.LoggerService.LogInformation($"Starting {nameof(this.GetCiCustomerId)}() with parameters [{nameof(contactId)} = {contactId}, {nameof(entityType)} = {entityType}", this.GetType().Name);

            var result = new msind_EntitytoCICustomerMapping().GetCiDataSourceAndCiEntityNameForEntityType(entityType, pluginParameters);

            var ciDataSourceName = result.Item1;
            var ciEntityName = result.Item2;

            var ciCustomerId = new msdynci_alternatekey().GetCustomerId(contactId, ciDataSourceName, ciEntityName, pluginParameters);
            if (string.IsNullOrWhiteSpace(ciCustomerId))
            {
                pluginParameters.LoggerService.LogWarning("Could not find CiCustomerId for input parameters: " +
                                                                    $"[contactId = {contactId}, dataSourceName = {ciDataSourceName}]");
                return ciCustomerId;
            }

            pluginParameters.LoggerService.LogInformation($"Received CI customer Id: {ciCustomerId}", this.GetType().Name);

            return ciCustomerId;
        }

        public virtual string GetContactId(string ciCustomerId, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(ciCustomerId, pluginParameters);

            if (this._ciCustomerIdToContactMapping == null)
            {
                pluginParameters.LoggerService.LogInformation("Filling CI Customer Id to Contact Id mapping cache", this.GetType().Name);
                this.FillTheMappingCache(pluginParameters);
            }

            if (!this._ciCustomerIdToContactMapping.ContainsKey(ciCustomerId))
            {
                pluginParameters.LoggerService.LogWarning($"{nameof(this.GetContactId)}(): Could not find contactId for ciCustomerId {ciCustomerId}");
                return null;
            }

            pluginParameters.LoggerService.LogInformation($"GetContactId(): Resulted with {this._ciCustomerIdToContactMapping[ciCustomerId]} for CI Customer Id {ciCustomerId}", this.GetType().Name);

            return this._ciCustomerIdToContactMapping[ciCustomerId];
        }

        public string ExtractCiCustomerId(string contactId, PluginParameters pluginParameters)
        {
            if (string.IsNullOrWhiteSpace(contactId))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.ContactQueryIdNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_UnsupportedQueryExpression,
                    PluginErrorMessagesIds.Infra.ResourceFileName);
            }

            var ciCustomerId = this.GetCiCustomerId(
                contactId.ToString(),
                Constants.ContactTableLogicalName,
                pluginParameters);

            if (string.IsNullOrWhiteSpace(ciCustomerId))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.CiCustomerIdWasNotFound,
                    FSIErrorCodes.FSIErrorCode_CiCustomerIdNotFound,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { contactId.ToString() });
            }

            return ciCustomerId;
        }

        public void FillTheMappingCache(PluginParameters pluginParameters)
        {
            var dataSourceAndCiEntityName = new msind_EntitytoCICustomerMapping().GetCiDataSourceAndCiEntityNameForEntityType("contact", pluginParameters);

            var ciDataSourceName = dataSourceAndCiEntityName.Item1;
            var ciEntityName = dataSourceAndCiEntityName.Item2;

            this._ciCustomerIdToContactMapping = new msdynci_alternatekey().GetAllCiCustomersToContactsMapping(ciDataSourceName, ciEntityName, pluginParameters);

            if (this._ciCustomerIdToContactMapping == null)
            {
                ErrorManager.TraceAndThrow(
                    pluginParameters,
                    PluginErrorMessagesIds.Infra.MissingMappingDataInCi,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName);
            }
        }

        public static Dictionary<string, string> ParseJsonToDictionary(string dictionaryJson, ILoggerService loggerService)
        {
            try
            {
                return dictionaryJson == null ? null : JObject.Parse(dictionaryJson).ToObject<Dictionary<string, string>>();
            }
            catch (Exception exception)
            {
                loggerService.LogWarning($"Failed to parse measure json: {dictionaryJson}. Exception: {exception.Message}");
                return null;
            }
        }
    }
}
