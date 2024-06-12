namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using ErrorMessages.Localization;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Localization;
    using Logger;
    using LoggingMock;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;
    using System.ComponentModel;
    using Xrm.Sdk.PluginTelemetry;

    public abstract class BasePlugin : IPlugin
    {
        protected abstract string OperationName();
        protected string ErrorFileName => PluginErrorMessagesIds.Infra.ResourceFileName;

        public void Execute(IServiceProvider serviceProvider)
        {
            PluginParameters pluginParameters = default;
            try
            {
                pluginParameters = ExtractAndValidatePluginParameters(serviceProvider);
                this.RunBusinessLogic(pluginParameters);
            }
            catch (Exception exception) when (!(exception is InvalidPluginExecutionException))
            {
                var errorCode = (int)FSIErrorCodes.FSIErrorCode_UnexpectedError;
                pluginParameters?.LoggerService?.LogError($"An unexpected error occurred. Details: {exception.Message}", errorCode);

                throw new InvalidPluginExecutionException(
                    OperationStatus.Failed,
                    errorCode,
                    pluginParameters?.PluginResourceService.GetResourceValueFromId(
                        PluginErrorMessagesIds.Infra.UnexpectedError,
                        PluginErrorMessagesIds.Infra.ResourceFileName));
            }
        }

        private PluginParameters ExtractAndValidatePluginParameters(IServiceProvider serviceProvider)
        {
            if (serviceProvider == null)
            {
                throw new InvalidPluginExecutionException("ServiceProvider cannot be null.");
            }

            var orgServiceFactory =
                (serviceProvider.GetService(typeof(IOrganizationServiceFactory))) as IOrganizationServiceFactory ??
                throw new InvalidPluginExecutionException("Failed to get OrganizationServiceFactory.");

            var executionContext = (serviceProvider.GetService(typeof(IPluginExecutionContext))) as IPluginExecutionContext ??
                throw new InvalidPluginExecutionException("Failed to get PluginExecutionContext.");

            var organizationService = (orgServiceFactory.CreateOrganizationService(executionContext?.UserId)) ??
                throw new InvalidPluginExecutionException(
                    $"Failed to get OrganizationService for UserId = {executionContext?.UserId}");

            var isDevelopment = executionContext.CorrelationId.Equals(Guid.Empty);
            var loggerService = this.GetLoggerServiceImplementation(isDevelopment, serviceProvider);

            var pluginResourceService =
                new PluginResourceService(executionContext, organizationService, loggerService);

            var pluginParameters = new PluginParameters()
            {
                ServiceProvider = serviceProvider,
                ExecutionContext = executionContext,
                OrganizationService = organizationService,
                LoggerService = loggerService,
                PluginResourceService = pluginResourceService,
                isDevelopment = isDevelopment,
            };

            if (executionContext.MessageName != this.OperationName())
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.WrongOperation,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new[] { this.OperationName() });
            }

            pluginParameters.LoggerService.AddCustomProperty(Constants.PluginNamePropertyName, this.ToString());
            this.ValidateInputParams(pluginParameters);

            return pluginParameters;
        }

        protected virtual void ValidateInputParams(PluginParameters pluginParameters)
        {
            var targetParameterName = Constants.TargetInputParamName;
            if (pluginParameters.ExecutionContext.InputParameters == null ||
                !pluginParameters.ExecutionContext.InputParameters.Contains(targetParameterName) ||
                pluginParameters.ExecutionContext.InputParameters[targetParameterName] == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.MissingInputParams,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new[] { this.OperationName(), targetParameterName });
            }
        }

        protected T GetPreviousEntityState<T>(PluginPreviousStateManager<T> previousStateManager, PluginParameters pluginParameters) where T : Entity
        {
            if (previousStateManager != null)
            {
                previousStateManager.InitPluginPreviousStateManager(pluginParameters);
            }

            if (previousStateManager?.PreviousEntityState == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.NullPreviousEntityState,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new object[] { typeof(T), previousStateManager.PreImageEntityAlias, pluginParameters.ExecutionContext.MessageName });
            }

            return previousStateManager.PreviousEntityState;
        }
        
        protected T RetrieveEntity<T>(T entity, ColumnSet columns, IOrganizationService organizationService) where T : Entity
        {
            return (T)organizationService.Retrieve(entity.LogicalName, entity.Id, columns);
        }

        protected ILoggerService GetLoggerServiceImplementation(bool isDevelopment, IServiceProvider serviceProvider)
        {
            if (!isDevelopment)
            {
                return new LoggerService(serviceProvider);
            }
            
            return LoggerServiceMock.Instance;
        }

        /// <summary>
        /// Given a list of other plugins names, checks if the current plugin was triggered by one of them.
        /// By comparing the parent process message with the messages given in otherPluginMessages.
        /// </summary>
        /// <param name="otherPluginsMessages">The messages that triggered the other plugins.</param>
        public bool CheckedByOtherPlugins(IList<string> otherPluginsMessages, IPluginExecutionContext executionContext)
        {
            return otherPluginsMessages.Contains(executionContext.ParentContext?.MessageName, StringComparer.OrdinalIgnoreCase)
                || otherPluginsMessages.Contains(executionContext.ParentContext?.ParentContext?.MessageName, StringComparer.OrdinalIgnoreCase);
        }

        protected abstract void RunBusinessLogic(PluginParameters pluginParameters);
    }
}