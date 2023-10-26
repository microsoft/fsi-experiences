namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public abstract class BaseRetrieveMultiple : BasePlugin
    {
        protected override string OperationName() => Constants.OperationTypes.RetrieveMultiple;

        protected sealed override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            var retrieveQuery = pluginParameters.ExecutionContext.InputParameters[Constants.RetrieveMultipleInputParamName] as QueryExpression;

            this.RunPluginsRetrieveBusinessLogic(pluginParameters, retrieveQuery);
        }

        protected override void ValidateInputParams(PluginParameters pluginParameters)
        {
            var parameterName = Constants.RetrieveMultipleInputParamName;
            if (pluginParameters.ExecutionContext.InputParameters == null ||
                !pluginParameters.ExecutionContext.InputParameters.Contains(parameterName) ||
                pluginParameters.ExecutionContext.InputParameters[parameterName] == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.MissingInputParams,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new [] { this.OperationName(), parameterName });
            }

            if (!(pluginParameters.ExecutionContext.InputParameters[parameterName] is QueryExpression) && 
                !(pluginParameters.ExecutionContext.InputParameters[parameterName] is FetchExpression))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleMalformedInputParameter,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new [] { this.OperationName(), parameterName });
            }
        }

        protected abstract void RunPluginsRetrieveBusinessLogic(PluginParameters pluginParameters, QueryExpression retrievedQuery);
    }
}
