namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.UpdateTaskComment
{
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;

    public class UpdateTaskCommentPlugin : BaseUpdatePlugin
    {
        protected override void RunPluginsUpdateBusinessLogic(PluginParameters pluginParameters)
        {

            IBaseDal dal = new BaseDal(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext);
            Task taskToUpdate = this.GetEntityToBeUpdated<Task>(pluginParameters);
            var businessLogic = new UpdateTaskCommentBusinessLogic(dal, taskToUpdate, pluginParameters);
            var updateResult = businessLogic.Execute();
            if (updateResult.IsFailure)
            {
                ErrorManager.TraceAndThrow(pluginParameters, updateResult.ErrorMessage, updateResult.ErrorCode, updateResult.ErrorFileName);
            }
        }
    }
}