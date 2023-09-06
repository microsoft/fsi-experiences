namespace Microsoft.CloudForFSI.Tables
{
    using System;
    using Infra;
    using Infra.ErrorManagers;
    using Infra.Plugins;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public partial class msfsi_GroupMember : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public static DataCollection<Entity> GetContactGroupMembers(string contactId, int groupType, bool isPrimary, PluginParameters pluginParameters)
        {
            ValidateSchemas(pluginParameters);

            var query = new QueryExpression(EntityLogicalName);
            query.ColumnSet.AddColumns(PrimaryIdAttribute);

            var groupLink = query.AddLink(Tables.msfsi_Group.EntityLogicalName,
                          nameof(msfsi_Group).ToLower(),
                          Tables.msfsi_Group.PrimaryIdAttribute);
            groupLink.EntityAlias = GroupConstants.GroupTableAlias;
            groupLink.Columns.AddColumns(Tables.msfsi_Group.PrimaryIdAttribute, nameof(Tables.msfsi_Group.CreatedOn).ToLower());

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = nameof(msfsi_member).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { contactId }
                    },
                    new ConditionExpression
                    {
                        AttributeName = nameof(msfsi_IsPrimaryGroup).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { isPrimary }
                    },
                    new ConditionExpression
                    {
                        AttributeName = nameof(Tables.msfsi_Group.msfsi_Type).ToLower(),
                        EntityName = groupLink.EntityAlias,
                        Operator = ConditionOperator.Equal,
                        Values = { (int)groupType }
                    }
                }
            };

            query.Criteria = filterExpression;

            try
            {
                return pluginParameters.OrganizationService.RetrieveMultiple(query).Entities;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleFailed,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { EntityLogicalName, exception.Message });
                throw;
            }
        }

        private static void ValidateSchemas(PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(EntityLogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.TableDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingEntityTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { EntityLogicalName });
            }

            if (!EntityMetadataServices.IsSchemaExists(Tables.msfsi_Group.EntityLogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.TableDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingEntityTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { Tables.msfsi_Group.EntityLogicalName });
            }
        }
    }
}
