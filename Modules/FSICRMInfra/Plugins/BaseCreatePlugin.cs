namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using System;
    using ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Xrm.Sdk;

    public abstract class BaseCreatePlugin : BasePlugin
    {
        protected override string OperationName() => Constants.OperationTypes.Create;

        protected T GetEntityToBeCreated<T>(PluginParameters pluginParameters) where T : Entity
        {
            var entity = pluginParameters.ExecutionContext.InputParameters[Constants.TargetInputParamName] as Entity;
            if (entity == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.InputParameterIsNotAnEntity,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new [] { Constants.TargetInputParamName });
            }
            
            T specificEntity = default;
            try
            {
                specificEntity = entity.ToEntity<T>();
            }
            catch (Exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.InputParameterIsNotOfCorrectType,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new object[] { Constants.TargetInputParamName, typeof(T) });
            }

            return (T)specificEntity;
        }

        protected sealed override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            this.RunPluginsCreateBusinessLogic(pluginParameters);
        }

        protected abstract void RunPluginsCreateBusinessLogic(PluginParameters pluginParameters);
    }
}
