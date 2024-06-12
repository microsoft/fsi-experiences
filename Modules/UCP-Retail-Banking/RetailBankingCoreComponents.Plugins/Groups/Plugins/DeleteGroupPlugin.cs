namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Plugins
{
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Tables;
    using Requests;
    using Xrm.Sdk;
    using Xrm.Sdk.Messages;

    public class DeleteGroupPlugin : GroupBasePlugin<DeleteGroupRequest>, IPlugin
    {
        protected override void ExecuteAction(PluginParameters pluginParameters, DeleteGroupRequest request)
        {
            var group = request.Group;

            this.ValidateGroupVersion(group.Id, group.Version, pluginParameters);

            var groupToDelete = new msfsi_Group
            {
                Id = group.Id,
                RowVersion = group.Version.ToString()
            };

            var requestWithResults = new ExecuteTransactionRequest
            {
                Requests = new OrganizationRequestCollection(),
                ReturnResponses = true
            };

            requestWithResults.Requests.Add(new DeleteRequest
            {
                Target = groupToDelete.ToEntityReference(),
                ConcurrencyBehavior = ConcurrencyBehavior.IfRowVersionMatches
            });

            foreach (var gm in group.Members.Where(member => member.IsPrimaryGroup))
            {
                var updateRequest = this.GetCustomerPrimaryGroupUpdateRequest(gm.Customer.Id, group.Type, pluginParameters);
                if (updateRequest != null)
                {
                    requestWithResults.Requests.Add(updateRequest);
                }
            }

            pluginParameters.OrganizationService.Execute(requestWithResults);
            pluginParameters.ExecutionContext.OutputParameters[Constants.OutputParameterName] = true;
        }
    }
}