namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorManagers;
    using ErrorMessages.Localization;
    using Xrm.Sdk;

    public class PluginPreviousStateManager<T> where T : Entity
    {
        public T PreviousEntityState { get; set; }

        public string PreImageEntityAlias { get; }

        public PluginPreviousStateManager(string preImageEntityAlias, PluginParameters pluginParameters)
        {
            if (string.IsNullOrWhiteSpace(preImageEntityAlias))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.PreviousStateManagerNullPreImage,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    PluginErrorMessagesIds.Infra.ResourceFileName);
            }

            this.PreImageEntityAlias = preImageEntityAlias;
        }

        public void InitPluginPreviousStateManager(PluginParameters pluginParameters)
        {
            if (pluginParameters.ExecutionContext == null)
            {
                throw new InvalidPluginExecutionException("executionContext cannot be null");
            }

            if (pluginParameters.ExecutionContext.PreEntityImages == null ||
                !pluginParameters.ExecutionContext.PreEntityImages.ContainsKey(this.PreImageEntityAlias) ||
                pluginParameters.ExecutionContext.PreEntityImages[this.PreImageEntityAlias] == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.PreviousStateManagerStateNotAvailable,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.PreImageEntityAlias });
            }

            try
            {
                this.PreviousEntityState = pluginParameters.ExecutionContext.PreEntityImages?[this.PreImageEntityAlias]?.ToEntity<T>();
            }
            catch
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.PreviousStateManagerStateForEntityNotAvailable,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { typeof(T) });
            }
        }
    }
}