namespace Microsoft.CloudForFSI.Tables
{
    using System;
    using Infra;
    using Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using OptionSets;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public partial class msfsi_Group : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public static msfsi_GroupType GetGroupType(Guid groupId, PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(EntityLogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingEntityTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { EntityLogicalName });
            }

            msfsi_GroupType? groupType = default;
            try
            {
                groupType = ((msfsi_Group)pluginParameters.OrganizationService.Retrieve(
                    EntityLogicalName,
                    groupId,
                    new ColumnSet(nameof(msfsi_Type).ToLower()))).msfsi_Type;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { EntityLogicalName, exception.Message });
            }

            if (!groupType.HasValue)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.GroupTypeIsEmpty,
                    FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new object[] { groupId });
            }

            return groupType.Value;
        }
    }
}
