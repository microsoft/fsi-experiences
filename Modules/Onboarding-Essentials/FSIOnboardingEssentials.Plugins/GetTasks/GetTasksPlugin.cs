namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.GetTasks
{
    using System;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;

    public class GetTasksPlugin : BaseCustomApiPlugin
    {
        protected override string OperationName() => GetTasksConstants.OperationName;

        protected override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            try
            {
                var dal = new GetTasksDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);
                var businessLogic = new GetTasksBusinessLogic(dal, pluginParameters.LoggerService);
                var result = businessLogic.Execute();
                if (result.IsFailure)
                {
                    ErrorManager.UnLocalizedTraceAndThrow(result.ErrorMessage, pluginParameters.LoggerService);
                }
            }
            catch (Exception ex)
            {
                ErrorManager.UnLocalizedTraceAndThrow(ex.Message, pluginParameters.LoggerService);
            }
        }
    }
}