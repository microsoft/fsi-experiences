namespace Microsoft.CloudForFSI.RetailBankingCoreDataModel.Plugins.GroupMember
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Localization;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using OptionSets;
    using Tables;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;

    public class CreateGroupMemberPlugin : BaseCreatePlugin
    {
        protected new string ErrorFileName => PluginErrorMessagesIds.RetailBanking.ResourceFileName;
        protected override void RunPluginsCreateBusinessLogic(PluginParameters pluginParameters)
        {
            // If this plugin was triggered by one of the custome plugins on group, 
            // that perform the same validations, it should be skipped.
            var groupPluginsMessages = new List<string>() { GroupConstants.AddGroupMessage, GroupConstants.UpdateGroupMessage };
            if (this.CheckedByOtherPlugins(groupPluginsMessages, pluginParameters.ExecutionContext))
            {
                pluginParameters.LoggerService.LogInformation("Validation was handled by UI plugin. Skipping...", this.GetType().Name);
                return;
            }

            var groupMemberToBeCreated = this.GetEntityToBeCreated<msfsi_GroupMember>(pluginParameters);

            if (groupMemberToBeCreated.msfsi_IsPrimaryGroup == true)
            {
                this.Validate(groupMemberToBeCreated, pluginParameters);
                var groupType = msfsi_Group.GetGroupType(groupMemberToBeCreated.msfsi_Group.Id, pluginParameters);
                if (this.HasOtherPrimaryGroup(groupMemberToBeCreated.msfsi_member.Id, groupType, pluginParameters))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBanking.CreateContactHasMoreThanOneMainHousehold,
                        FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                        this.ErrorFileName,
                        new object[] { groupMemberToBeCreated.msfsi_member.Id });
                }
            }
        }

        private void Validate(msfsi_GroupMember groupMemberToBeCreated, PluginParameters pluginParameters)
        {
            if (!groupMemberToBeCreated.Contains(nameof(msfsi_GroupMember.msfsi_Group).ToLower()) ||
                groupMemberToBeCreated.msfsi_Group.Id == default ||
                !groupMemberToBeCreated.Contains(nameof(msfsi_GroupMember.msfsi_member).ToLower()) ||
                groupMemberToBeCreated.msfsi_member.Id == default)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBanking.GroupMemberMissingFields,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new object[] { groupMemberToBeCreated.msfsi_GroupMemberId });
            }
        }

        private bool HasOtherPrimaryGroup(Guid customerId, msfsi_GroupType groupType, PluginParameters pluginParameters)
        {
            return msfsi_GroupMember
                .GetContactGroupMembers(customerId.ToString(), (int)groupType, isPrimary: true, pluginParameters)
                .Any();
        }
    }
}