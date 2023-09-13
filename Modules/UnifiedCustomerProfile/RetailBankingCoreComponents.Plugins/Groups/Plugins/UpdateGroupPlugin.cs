namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Plugins
{
    using System;
    using System.Linq;
    using Infra;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using OptionSets;
    using Tables;
    using Newtonsoft.Json;
    using Requests;
    using Xrm.Sdk;
    using Xrm.Sdk.Messages;
    using Xrm.Sdk.Query;
    using System.Collections.Generic;

    public class UpdateGroupPlugin : GroupBasePlugin<UpdateGroupRequest>, IPlugin
    {
        protected override void ExecuteAction(PluginParameters pluginParameters, UpdateGroupRequest request)
        {
            var oldGroup = request.OldGroup;
            var updatedGroup = request.UpdatedGroup;
            var otherMembers = request.OtherMembers;

            this.ValidateGroupVersion(updatedGroup.Id, updatedGroup.Version, pluginParameters);

            foreach (var gm in updatedGroup.Members)
            {
                if (gm.Id == gm.Customer.Id)
                {
                    gm.Id = Guid.NewGuid();
                }

                if (gm.Customer.Id == updatedGroup.PrimaryMember)
                {
                    updatedGroup.PrimaryMember = gm.Id;
                }
            }

            var requestWithResults = new ExecuteTransactionRequest
            {
                Requests = new OrganizationRequestCollection(),
                ReturnResponses = true
            };

            var entityUpdate = new msfsi_Group
            {
                Id = updatedGroup.Id,
                RowVersion = updatedGroup.Version.ToString(),
                msfsi_Name = updatedGroup.Name
            };

            requestWithResults.Requests.Add(new UpdateRequest
            {
                Target = entityUpdate,
                ConcurrencyBehavior = ConcurrencyBehavior.IfRowVersionMatches
            });

            groupMembersUpdate(oldGroup, updatedGroup, otherMembers, requestWithResults, pluginParameters);
            groupFinancialHoldingsUpdate(oldGroup, updatedGroup, requestWithResults, pluginParameters);
            finalizeGroupUpdate(updatedGroup, requestWithResults, pluginParameters);
        }

        protected void groupMembersUpdate(GroupRequest oldGroup, GroupRequest updatedGroup, ICollection<GroupMemberRequest> otherMembers, ExecuteTransactionRequest requestWithResults, PluginParameters pluginParameters)
        {
            var membersDiff = new CollectionDifference<GroupMemberRequest>(oldGroup.Members, updatedGroup.Members, new IdComparer());

            foreach (var gm in membersDiff.Deleted)
            {
                var entityToDelete = new msfsi_GroupMember { Id = gm.Id };
                requestWithResults.Requests.Add(new DeleteRequest
                {
                    Target = entityToDelete.ToEntityReference()
                });

                if (gm.IsPrimaryGroup)
                {
                    var updateRequest = this.GetCustomerPrimaryGroupUpdateRequest(gm.Customer.Id, updatedGroup.Type, pluginParameters);
                    if (updateRequest != null)
                    {
                        requestWithResults.Requests.Add(updateRequest);
                    }
                }
            }

            var newMembers = this.GetNewGroupMembersEntities(updatedGroup.Name, updatedGroup.Id, updatedGroup.Type, membersDiff.Added, pluginParameters, isNewGroup: false);
            requestWithResults.Requests.AddRange(newMembers.Select(newGroupMember => new CreateRequest { Target = newGroupMember }));

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

            requestWithResults.Requests.AddRange(membersDiff.Updated.Select(gm =>
                new UpdateRequest
                {
                    Target = new msfsi_GroupMember
                    {
                        Id = gm.Id,
                        msfsi_Name = $"{updatedGroup.Name}_GM_{gm.Customer.Name}",
                        msfsi_Role = (msfsi_GroupMemberRole)gm.Role,
                        msfsi_IsPrimaryGroup = gm.IsPrimaryGroup,
                    }
                }
            ));
        }

        protected void groupFinancialHoldingsUpdate(GroupRequest oldGroup, GroupRequest updatedGroup, ExecuteTransactionRequest requestWithResults, PluginParameters pluginParameters)
        {
            var groupHoldingsDiff = new CollectionDifference<FinancialHoldingRequest>(oldGroup.FinancialHoldings, updatedGroup.FinancialHoldings, new IdComparer());

            requestWithResults.Requests.AddRange(groupHoldingsDiff.Deleted.Select(groupHolding =>
            {
                var entityToDelete = new msfsi_GroupFinancialHolding { Id = groupHolding.GroupHoldingId };
                return new DeleteRequest { Target = entityToDelete.ToEntityReference() };
            }));

            var newHoldings = this.GetNewGroupFinancialHoldingsEntities(updatedGroup.Name, updatedGroup.Id, groupHoldingsDiff.Added, pluginParameters, isNewGroup: false);
            requestWithResults.Requests.AddRange(newHoldings.Select(newGroupHolding => new CreateRequest { Target = newGroupHolding }));

            requestWithResults.Requests.AddRange(groupHoldingsDiff.Updated.Select(groupHolding =>
                new UpdateRequest
                {
                    Target = new msfsi_GroupFinancialHolding
                    {
                        Id = groupHolding.GroupHoldingId,
                        msfsi_Name = $"{updatedGroup.Name}_GH_{groupHolding.Name}"
                    }
                }
            ));
        }

        protected void finalizeGroupUpdate(GroupRequest updatedGroup, ExecuteTransactionRequest requestWithResults, PluginParameters pluginParameters)
        {
            requestWithResults.Requests.Add(new UpdateRequest
            {
                Target = this.GetUpdatedGroupWithPrimaryMember(updatedGroup.Id, updatedGroup.PrimaryMember)
            });

            requestWithResults.Requests.Add(new RetrieveRequest
            {
                ColumnSet = new ColumnSet("versionnumber"),
                Target = new EntityReference(msfsi_Group.EntityLogicalName, updatedGroup.Id)
            });

            this.CheckGroupFieldsBeforeSentToOperation(updatedGroup, pluginParameters);

            var groupRetrieved = this.InvokeTransactionRequest(requestWithResults, pluginParameters);
            updatedGroup.Version = long.Parse(groupRetrieved.RowVersion);
            pluginParameters.ExecutionContext.OutputParameters[Groups.Constants.OutputParameterName] = JsonConvert.SerializeObject(updatedGroup);
        }
    }
}