namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.DeleteTaskDefinition
{
    using System;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;

    public class DeleteTaskDefinitionPlugin : BaseDeletePlugin
    {
        protected override void RunPluginsDeleteBusinessLogic(PluginParameters pluginParameters)
        {
            var dal = new DeleteTaskDefinitionDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);
            var businessLogic = new DeleteTaskDefinitionPluginBusinessLogic(dal, pluginParameters.LoggerService);
            var deleteResult = businessLogic.Execute();
            if (deleteResult.IsFailure)
            {
                ErrorManager.TraceAndThrow(pluginParameters, deleteResult.ErrorMessage, deleteResult.ErrorCode, deleteResult.ErrorFileName);
            }
        }
    }
}