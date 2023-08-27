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

    public partial class msind_industrymeasure : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public IEnumerable<msind_industrymeasure> GetProcessedCiMeasuresForAllCustomers(List<string> ciArtifactNames, List<ConditionExpression> conditions, PluginParameters pluginParameters)
        {
            ciArtifactNames.ForEach(artifactName => ParameterHandler.ThrowIfNullOrEmpty(artifactName, pluginParameters));
            pluginParameters.LoggerService.LogInformation($"Starting GetProcessedCiMeasuresForAllCustomers() with parameters [conditions.Count = {conditions?.Count}, ciArtifactNames = {ciArtifactNames.Aggregate("", (before, after) => before + "," + after)}]", this.GetType().Name);
            
            FilterExpression filterExpression = default;
            if (ciArtifactNames != null || conditions != null)
            {
                filterExpression = new FilterExpression();
            }

            if (ciArtifactNames != null && ciArtifactNames.Count > 0)
            {
                filterExpression.AddCondition(new ConditionExpression(nameof(this.msind_ValueType).ToLower(), ConditionOperator.In, ciArtifactNames));
                pluginParameters.LoggerService.LogInformation($"Added new condition: {nameof(this.msind_ValueType).ToLower()}  IN  [{ciArtifactNames.Aggregate("", (before, after) => before + "," + after)}]", this.GetType().Name);
            }

            if (conditions != null && conditions.Count > 0)
            {
                filterExpression.Conditions.AddRange(conditions);
                pluginParameters.LoggerService.LogInformation($"Added external {conditions.Count} conditions", this.GetType().Name);
            }
            
            return this.ExecuteQuery(filterExpression, pluginParameters);
        }

        public IEnumerable<msind_industrymeasure> GetProcessedCiMeasuressForContactId(Guid contactId, List<string> ciArtifactNames, PluginParameters pluginParameters)
        {
            ciArtifactNames.ForEach(artifactName => ParameterHandler.ThrowIfNullOrEmpty(artifactName, pluginParameters));

            pluginParameters.LoggerService.LogInformation($"Starting GetProcessedCiMeasuressForContactId() with parameters [contactId = {contactId}, ciArtifactNames = [{ciArtifactNames.Aggregate("", (before, after) => before + "," + after)}]]", this.GetType().Name);
            
            var filterExpression = new FilterExpression();
            filterExpression.AddCondition(new ConditionExpression(nameof(this.msind_ContactId), ConditionOperator.Equal, contactId));
            
            return this.ExecuteQuery(filterExpression, pluginParameters);
        }

        private IEnumerable<msind_industrymeasure> ExecuteQuery(FilterExpression filterExpression, PluginParameters pluginParameters)
        {
            pluginParameters.LoggerService.LogInformation($"Querying {EntityLogicalName}.", this.GetType().Name);
            var queryExpression = new QueryExpression
            {
                EntityName = EntityLogicalName,
                ColumnSet = new ColumnSet(
                    nameof(this.msind_ContactId).ToLower(),
                    nameof(this.msind_CustomerID).ToLower(),
                    nameof(this.msind_industrymeasureId).ToLower(),
                    nameof(this.msind_Value).ToLower(),
                    nameof(this.msind_ValueType).ToLower()),
            };

            if (filterExpression != null)
            {
                queryExpression.Criteria = filterExpression;
            }

            try
            {
                var result = pluginParameters.OrganizationService.RetrieveMultiple(queryExpression)
                    .Entities
                    .Select(entity => entity?.ToEntity<msind_industrymeasure>())
                    .Where(entity => entity != null);

                pluginParameters.LoggerService.LogInformation($"Query resulted with {result.Count()} entities", this.GetType().Name);
                return result;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msind_industrymeasure), exception.Message });
                throw;
            }
        }
    }
}
