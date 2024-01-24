namespace Microsoft.CloudForFSI.RetailBankingCoreDataModel.Plugins.GroupMember
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using OptionSets;
    using Tables;
    using Xrm.Sdk;

    public class UpdateGroupMemberPlugin : BaseUpdatePlugin
    {
        protected new string ErrorFileName => PluginErrorMessagesIds.RetailBanking.ResourceFileName;

        protected override void RunPluginsUpdateBusinessLogic(PluginParameters pluginParameters)
        {
            // If this plugin was triggered by one of the custome plugins on group, 
            // that perform the same validations, it should be skipped.
            var groupPluginsMessages = new List<string>() { GroupConstants.AddGroupMessage, GroupConstants.UpdateGroupMessage };
            if (this.CheckedByOtherPlugins(groupPluginsMessages, pluginParameters.ExecutionContext))
            {
                pluginParameters.LoggerService.LogInformation("Validation was handled by UI plugin. Skipping...", this.GetType().Name);
                return;
            }

            var groupMemberToUpdate = this.GetEntityToBeUpdated<msfsi_GroupMember>(pluginParameters);
            var groupMemberBeforeUpdate = this.GetPreviousEntityState(new PluginPreviousStateManager<msfsi_GroupMember>(Constants.UpdatePreImageAliasName, pluginParameters), pluginParameters);

            var isPrimaryGroup = groupMemberToUpdate.msfsi_IsPrimaryGroup ?? groupMemberBeforeUpdate.msfsi_IsPrimaryGroup;
            var group = groupMemberToUpdate.msfsi_Group ?? groupMemberBeforeUpdate.msfsi_Group;
            var member = groupMemberToUpdate.msfsi_member ?? groupMemberBeforeUpdate.msfsi_member;

            if (isPrimaryGroup == true)
            {
                this.Validate(group, member, groupMemberToUpdate.Id, pluginParameters);
                var groupType = msfsi_Group.GetGroupType(group.Id, pluginParameters);
                if (this.HasOtherPrimaryGroup(member.Id, groupType, groupMemberToUpdate.Id, pluginParameters))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBanking.UpdateContactHasMoreThanOneMainHousehold,
                        FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                        this.ErrorFileName,
                        new object[] { member.Id, groupType.ToString() });
                }
            }
        }

        private void Validate(EntityReference group, EntityReference member, Guid id, PluginParameters pluginParameters)
        {
            if (group?.Id == null || member?.Id == null || id == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBanking.GroupMemberMissingFields,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { id });
            }
        }

        private bool HasOtherPrimaryGroup(
            Guid customerId, 
            msfsi_GroupType groupType,
            Guid groupMemberId, 
            PluginParameters pluginParameters)
        {
            return msfsi_GroupMember
                .GetContactGroupMembers(customerId.ToString(), (int)groupType, isPrimary: true, pluginParameters)
                .Where(entity => !entity.Id.Equals(groupMemberId)).Any();
        }
    }
}