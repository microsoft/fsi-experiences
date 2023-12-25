namespace Microsoft.CloudForFSI.LoanOnboardingStarterRibbon.Plugins
{
    using ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;

    public class ApplicationArchivingPlugin : BaseUpdatePlugin
    {

        protected override void RunPluginsUpdateBusinessLogic(PluginParameters pluginParameters)
        {
            var dal = new ApplicationArchivingDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);           
            var businessLogic = new ApplicationArchivingPluginBusinessLogic(pluginParameters.LoggerService, dal);
            var result = businessLogic.Execute();
            if (result.IsFailure)
            {
                ErrorManager.TraceAndThrow(pluginParameters, result.ErrorMessage ,result.ErrorCode, result.ErrorFileName, result.StringArgs);
            }
        }
    }
}
