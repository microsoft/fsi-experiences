namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using System;
    using Xrm.Sdk;

    public abstract class BaseUpdatePlugin : BasePlugin
    {
        protected override string OperationName() => Constants.OperationTypes.Update;

        protected T GetEntityToBeUpdated<T>(PluginParameters pluginParameters) where T : Entity
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

            T specificEntity = null;
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
            this.RunPluginsUpdateBusinessLogic(pluginParameters);
        }
        
        protected abstract void RunPluginsUpdateBusinessLogic(PluginParameters pluginParameters);
    }
}
