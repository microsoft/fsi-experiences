namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.UpdateTaskComment
{
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using System;
    using Microsoft.Xrm.Sdk;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;

    internal class UpdateTaskCommentBusinessLogic : IPluginBusinessLogic
    {
        private IBaseDal dal;
        private PluginParameters pluginParameters;
        private Task taskToUpdate;
        protected string ErrorFileName = PluginErrorMessagesIds.OnboardingEssentialsTasks.ResourceFileName;

        public UpdateTaskCommentBusinessLogic(IBaseDal dal, Task taskToUpdate, PluginParameters pluginParameters)
        {
            this.dal = dal;
            this.taskToUpdate = taskToUpdate;
            this.pluginParameters = pluginParameters;
        }

        public PluginResult Execute()
        {
            taskToUpdate.msfsi_commentmodifiedon = DateTime.UtcNow;
            taskToUpdate.msfsi_commentmodifiedby = new EntityReference(SystemUser.EntityLogicalName, pluginParameters.ExecutionContext.UserId);
            var updateResult = dal.Update(taskToUpdate);

            if (updateResult.IsFailure)
            {
                return PluginResult.Fail(PluginErrorMessagesIds.OnboardingEssentialsTasks.FailedToUpdateTaskComment, Infra.FSIErrorCodes.FSIErrorCode_FailedToUpdateModel, this.ErrorFileName);
            }

            return updateResult;

        }
    }
}