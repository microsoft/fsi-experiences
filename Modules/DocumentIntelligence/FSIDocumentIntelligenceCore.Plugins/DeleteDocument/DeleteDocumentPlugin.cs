namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.DeleteDocument
{
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;

    public class DeleteDocumentPlugin : BaseCustomApiPlugin
    {
        protected override string OperationName() => DocumentsConstants.DeleteMessageName;

        protected override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            var documentDal = new DocumentDal(pluginParameters);
            var deleteDocumentBusinessLogic = new DeleteDocumentBusinessLogic(documentDal, pluginParameters.LoggerService);
            var executionResult = deleteDocumentBusinessLogic.Execute();

            if (executionResult.IsFailure)
            {
                var errorMessage = executionResult.ErrorMessage;
                var loggerService = pluginParameters.LoggerService;

                ErrorManager.UnLocalizedTraceAndThrow(errorMessage, loggerService);
            }
        }
    }
}
