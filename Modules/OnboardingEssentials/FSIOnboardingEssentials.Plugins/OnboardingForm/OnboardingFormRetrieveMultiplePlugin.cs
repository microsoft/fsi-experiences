namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.OnboardingForm
{
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.Xrm.Sdk.Query;

    public class OnboardingFormRetrieveMultiplePlugin : BaseRetrieveMultiple
    {
        protected override void RunPluginsRetrieveBusinessLogic(PluginParameters pluginParameters, QueryExpression retrievedQuery)
        {
            var dal = new OnboardingFormDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);
            var businessLogic = new OnboardingFormRetrieveMultiplePluginBusinessLogic(pluginParameters.LoggerService, pluginParameters.ExecutionContext, dal);
            var result = businessLogic.Execute();
            if (result.IsFailure)
            {
                ErrorManager.TraceAndThrow(pluginParameters, result.ErrorMessage, result.ErrorCode, result.ErrorFileName, result.StringArgs);
            }
        }
    }
}
