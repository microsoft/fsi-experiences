namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.OnboardingForm
{
    using System;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;

    public class OnboardingFormRetrievePlugin : BaseRetrieve
    {
        protected override void RunPluginsRetrieveBusinessLogic(PluginParameters pluginParameters, Guid entityId)
        {
            var dal = new OnboardingFormDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);
            var businessLogic = new OnboardingFormRetrievePluginBusinessLogic(entityId, pluginParameters.LoggerService, pluginParameters.ExecutionContext, dal);
            var result = businessLogic.Execute();
            if (result.IsFailure)
            {
                ErrorManager.TraceAndThrow(pluginParameters, result.ErrorMessage, result.ErrorCode, result.ErrorFileName, result.StringArgs);
            }
        }
    }
}
