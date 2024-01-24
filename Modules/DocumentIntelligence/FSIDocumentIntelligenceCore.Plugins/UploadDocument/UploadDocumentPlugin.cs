namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.UploadDocument
{
    using Infra.Plugins;
    using Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;

    public class UploadDocumentPlugin : BaseCustomApiPlugin
    {
        protected override string OperationName() => DocumentsConstants.UploadMessageName;

        protected override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            var documentDal = new DocumentDal(pluginParameters);
            var uploadDocumentBusinessLogic = new UploadDocumentBusinessLogic(documentDal, pluginParameters.LoggerService);
            var executionResult = uploadDocumentBusinessLogic.Execute();
            if (executionResult.IsFailure)
            {
                var errorMessage = executionResult.ErrorMessage;
                var loggerService = pluginParameters.LoggerService;

                ErrorManager.UnLocalizedTraceAndThrow(errorMessage, loggerService);
            }
        }
    }
}