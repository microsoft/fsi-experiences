namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Plugins
{
    using ErrorMessages.Localization;
    using System;
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using OptionSets;
    using Tables;
    using Newtonsoft.Json;
    using Requests;
    using Xrm.Sdk;
    using Xrm.Sdk.Messages;
    using Xrm.Sdk.Query;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using System.Collections.Generic;

    public class AddGroupPlugin : GroupBasePlugin<AddGroupRequest>, IPlugin
    {
        protected override void ExecuteAction(PluginParameters pluginParameters, AddGroupRequest request)
        {
            var group = request.Group;
            var otherMembers = request.OtherMembers;

            group.Id = Guid.NewGuid();
            foreach (var groupMember in group.Members)
            {
                groupMember.Id = Guid.NewGuid();
                if (groupMember.Customer.Id == group.PrimaryMember)
                {
                    group.PrimaryMember = groupMember.Id;
                }
            }

            var requestWithResults = new ExecuteTransactionRequest
            {
                Requests = new OrganizationRequestCollection(),
                ReturnResponses = true
            };

            createGroup(group, otherMembers, requestWithResults, pluginParameters);
            finalizeGroupCreation(group, requestWithResults, pluginParameters);
        }

        protected void createGroup(GroupRequest group, ICollection<GroupMemberRequest> otherMembers, ExecuteTransactionRequest requestWithResults, PluginParameters pluginParameters)
        {
            requestWithResults.Requests.AddRange(otherMembers.Select(gm =>
                new UpdateRequest
                {
                    Target = new msfsi_GroupMember
                    {
                        Id = gm.Id,
                        msfsi_IsPrimaryGroup = gm.IsPrimaryGroup,
                    }
                }
            ));

            requestWithResults.Requests.Add(new CreateRequest
            {
                Target = new msfsi_Group
                {
                    Id = group.Id,
                    msfsi_Name = group.Name,
                    msfsi_Type = (msfsi_GroupType)group.Type,
                    msfsi_GroupMember_Group_msfsi_Group = this.GetNewGroupMembersEntities(group.Name, group.Id, group.Type, group.Members, pluginParameters),
                    msfsi_GroupFinancialHolding_Group_msfsi_Group = this.GetNewGroupFinancialHoldingsEntities(group.Name, group.Id, group.FinancialHoldings, pluginParameters)
                }
            });

            requestWithResults.Requests.Add(new UpdateRequest
            {
                Target = this.GetUpdatedGroupWithPrimaryMember(group.Id, group.PrimaryMember)
            });

            requestWithResults.Requests.Add(new RetrieveRequest
            {
                ColumnSet = new ColumnSet("versionnumber", "createdon"),
                Target = new EntityReference(msfsi_Group.EntityLogicalName, group.Id)
            });
        }

        protected void finalizeGroupCreation(GroupRequest group, ExecuteTransactionRequest requestWithResults, PluginParameters pluginParameters)
        {
            this.CheckGroupFieldsBeforeSentToOperation(group, pluginParameters);

            var groupRetrieved = this.InvokeTransactionRequest(requestWithResults, pluginParameters);
            if (!groupRetrieved.Attributes.ContainsKey("createdon") || !(groupRetrieved.Attributes["createdon"] is DateTime creationDate))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupRetrieveCreationDateFailed,
                    Infra.FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                    this.ErrorFileName,
                    new object[] { group.Id });
                return;
            }

            group.CreationDate = creationDate.ToString();
            group.Version = long.Parse(groupRetrieved.RowVersion);
            pluginParameters.ExecutionContext.OutputParameters[Constants.OutputParameterName] = JsonConvert.SerializeObject(group);
        }
    }
}