namespace Microsoft.CloudForFSI.RetailBankingCoreDataModel.Plugins.Group
{
    using Infra;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Tables;

    public class UpdateGroupPlugin : BaseUpdatePlugin
    {
        protected new string ErrorFileName => PluginErrorMessagesIds.RetailBanking.ResourceFileName;

        protected override void RunPluginsUpdateBusinessLogic(PluginParameters pluginParameters)
        {
            var groupToUpdate = this.GetEntityToBeUpdated<msfsi_Group>(pluginParameters);

            if (groupToUpdate.Contains(nameof(msfsi_Group.msfsi_Type).ToLower()))
            {
                var groupBeforeUpdate = this.GetPreviousEntityState(new PluginPreviousStateManager<msfsi_Group>(Constants.UpdatePreImageAliasName, pluginParameters), pluginParameters);

                if (!groupBeforeUpdate.Contains(nameof(msfsi_Group.msfsi_Type).ToLower()))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBanking.GroupDoesNotContainType,
                        FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                        this.ErrorFileName,
                        new object[] { groupBeforeUpdate.msfsi_GroupId });
                }
                
                if (!groupToUpdate.msfsi_Type.Equals(groupBeforeUpdate.msfsi_Type))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBanking.GroupTypeCannotBeModified,
                        FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                        this.ErrorFileName,
                        new object[] { groupBeforeUpdate.msfsi_GroupId });
                }
            }
        }
    }
}
