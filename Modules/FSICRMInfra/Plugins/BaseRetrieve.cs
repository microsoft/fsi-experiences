namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using System;
    using Xrm.Sdk;

    public abstract class BaseRetrieve : BasePlugin
    {
        protected override string OperationName() => Constants.OperationTypes.Retrieve;

        protected sealed override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            this.RunPluginsRetrieveBusinessLogic(pluginParameters, pluginParameters.ExecutionContext.PrimaryEntityId);
        }

        protected override void ValidateInputParams(PluginParameters pluginParameters)
        {
            if (pluginParameters.ExecutionContext.PrimaryEntityId == null || Guid.Empty == pluginParameters.ExecutionContext.PrimaryEntityId)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.PrimaryEntityIdNotValue,
                    FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                    this.ErrorFileName,
                    new [] { this.OperationName() });
            }
        }

        protected abstract void RunPluginsRetrieveBusinessLogic(PluginParameters pluginParameters, Guid entityId);
    }
}
