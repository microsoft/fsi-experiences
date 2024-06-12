namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.DeleteTaskDefinition
{
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;

    public class DeleteTaskDefinitionPluginBusinessLogic : IPluginBusinessLogic
    {
        private IDeleteTaskDefinitionDal dal;
        private ILoggerService loggerService;
        protected string ErrorFileName = PluginErrorMessagesIds.OnboardingEssentialsTasks.ResourceFileName;

        public DeleteTaskDefinitionPluginBusinessLogic(IDeleteTaskDefinitionDal dal, ILoggerService loggerService)
        {
            this.dal = dal;
            this.loggerService = loggerService;
        }

        public PluginResult Execute() 
        {
            if (dal.HasRelatedTasks())
            {
                this.loggerService.LogError("The task definition cannot be deleted because there is at least 1 task associated with it.");
                return PluginResult.Fail(PluginErrorMessagesIds.OnboardingEssentialsTasks.FailedToDeleteTaskDefinition, Infra.FSIErrorCodes.FSIErrorCode_Unauthorized, this.ErrorFileName);
            }

            return PluginResult.Ok();
        }
    }
}
