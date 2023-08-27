namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorManagers;
    using ErrorMessages.Localization;
    using System;
    using Xrm.Sdk;

    public abstract class BaseCustomApiPlugin : BasePlugin
    {
        protected T ParseInputParameter<T>(PluginParameters pluginParameters, string parameterName)
        {
            if (pluginParameters.ExecutionContext.InputParameters.TryGetValue(parameterName, out var parameterValue) && parameterValue is T value)
            {
                return value;
            }
        
            return default;
        }

        protected void OptionalParameterTypeCheck<T>(PluginParameters pluginParameters, string parameterName)
        {
            if (pluginParameters.ExecutionContext.InputParameters.TryGetValue(parameterName, out var parameterValue) &&
                parameterValue != default && !(pluginParameters.ExecutionContext.InputParameters[parameterName] is T))
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.Infra.InputParameterIsNotOfCorrectType,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { parameterName, typeof(T).ToString() });
            }
        }

        protected DateTime ValidateDateTimeParameter(PluginParameters pluginParameters, string dateTimeParameterName)
        {
            var dateTimeParameter = this.ParseInputParameter<DateTime>(pluginParameters, dateTimeParameterName);

            if (dateTimeParameter == default)
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.Infra.InputParameterIsNotOfCorrectType,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    this.ErrorFileName,
                    new[] { dateTimeParameterName, typeof(DateTime).ToString() });
            }

            return dateTimeParameter;
        }

        protected EntityReference ValidateEntityReferenceParameter(PluginParameters pluginParameters, string entityReferenceParameterName)
        {
            var entityReferenceParameter = this.ParseInputParameter<EntityReference>(pluginParameters, entityReferenceParameterName);

            if (entityReferenceParameter == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.Infra.MissingInputParams,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    this.ErrorFileName,
                    new[] { this.OperationName(), entityReferenceParameterName });
            }

            return entityReferenceParameter;
        }

        protected bool ValidateBoolParameter(PluginParameters pluginParameters, string boolParameterName)
        {
            if (!(pluginParameters.ExecutionContext.InputParameters.TryGetValue(boolParameterName, out var boolParameter) || !(boolParameter is bool)))
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.Infra.InputParameterIsNotOfCorrectType,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    this.ErrorFileName,
                    new[] { boolParameterName, typeof(bool).ToString() });
            }

            return (bool)boolParameter;
        }

        protected EntityCollection ValidateEntityCollectionParameter(PluginParameters pluginParameters, string entityCollectionParameterName)
        {
            var entityCollectionParameter = this.ParseInputParameter<EntityCollection>(pluginParameters, entityCollectionParameterName);

            if (entityCollectionParameter == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.Infra.MissingInputParams,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    this.ErrorFileName,
                    new[] { this.OperationName(), entityCollectionParameterName });
            }

            return entityCollectionParameter;
        }

        protected string ValidateStringParameter(PluginParameters pluginParameters, string stringParameterName)
        {
            if (!(pluginParameters.ExecutionContext.InputParameters.TryGetValue(stringParameterName, out var stringParameter) || !(stringParameter is string)))
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.Infra.InputParameterIsNotOfCorrectType,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    this.ErrorFileName,
                    new[] { stringParameterName, typeof(string).ToString() });
            }

            return (string)stringParameter;
        }

        protected override void ValidateInputParams(PluginParameters pluginParameters) { }
    }
}