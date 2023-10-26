namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Xrm.Sdk;

    public abstract class BaseDeletePlugin : BasePlugin
    {
        protected EntityReference EntityReferenceToBeDeleted { get; private set; }

        protected override string OperationName() => Constants.OperationTypes.Delete;

        protected sealed override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            this.EntityReferenceToBeDeleted =
                pluginParameters.ExecutionContext.InputParameters[Constants.TargetInputParamName] as EntityReference;
            if (this.EntityReferenceToBeDeleted == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.InputParameterIsNotAnEntity,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new [] { Constants.TargetInputParamName });
            }

            this.RunPluginsDeleteBusinessLogic(pluginParameters);
        }
        
        protected abstract void RunPluginsDeleteBusinessLogic(PluginParameters pluginParameters);
    }
}
