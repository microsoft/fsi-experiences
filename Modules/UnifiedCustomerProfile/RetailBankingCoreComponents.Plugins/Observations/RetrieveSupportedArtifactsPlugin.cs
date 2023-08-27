namespace Microsoft.CloudForFSI.FSIRetailBankingCoreComponents.Plugins.Observations
{
    using Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.Xrm.Sdk;

    public class RetrieveSupportedArtifactsPlugin : BaseCustomApiPlugin
    {
        protected new string ErrorFileName => PluginErrorMessagesIds.RetailBankingComponents.ResourceFileName; 

        protected override string OperationName() => ObservationsConstants.MessageName;
        
        protected override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            var dal = new RetrieveSupportedArtifactsDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);
            var businessLogic = new RetrieveSupportedArtifactsBusinessLogic(pluginParameters.LoggerService, dal);
            var result = businessLogic.Execute();
            if (result.IsFailure)
            {
                ErrorManager.TraceAndThrow(pluginParameters, result.ErrorMessage, result.ErrorCode, result.ErrorFileName, result.StringArgs);
            }
        }

        protected override void ValidateInputParams(PluginParameters pluginParameters)
        {
            this.OptionalParameterTypeCheck<OptionSetValue>(pluginParameters, ObservationsConstants.ArtifactTypeParameter);
            this.OptionalParameterTypeCheck<OptionSetValue>(pluginParameters, ObservationsConstants.InternalNameParameter);
        }
    }
}
