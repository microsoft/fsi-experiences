namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.Crm.Sdk.Messages;
    using Microsoft.Xrm.Sdk.Messages;
    using Microsoft.Xrm.Sdk.Metadata;
    using System.Linq;

    public static class RequestsDAO
    {
        public static bool GetEntityAccessRights(string privilegeName, PluginParameters pluginParameters)
        {
            if (pluginParameters.isDevelopment)
            {
                return RetrieveUserPriviledgeByPriviledgeNameMock.RetrieveUserPriviledgeInstances(GetMockInstanceId(pluginParameters))
                    .GetAccessRight(privilegeName);
            }
            else
            {
                var retrieveUserPrivilegesRequest = new RetrieveUserPrivilegeByPrivilegeNameRequest()
                {
                    UserId = pluginParameters.ExecutionContext.UserId,
                    PrivilegeName = privilegeName
                };

                var accessRights = (RetrieveUserPrivilegeByPrivilegeNameResponse)pluginParameters.OrganizationService.Execute(retrieveUserPrivilegesRequest);
                return accessRights.RolePrivileges.Length > 0;
            }
        }

        public static int[] getFhOptionSet(PluginParameters pluginParameters, string optionsetName)
        {
            if (pluginParameters.isDevelopment)
            {
                return RetrieveOptionSetMock.RetrieveOptionSetInstances(GetMockInstanceId(pluginParameters))
                    .GetOptions();
            }
            else
            {
                RetrieveOptionSetRequest retrieveOptionSetRequest =
                new RetrieveOptionSetRequest
                {
                    Name = optionsetName
                };

                var retrieveOptionSetResponse = (RetrieveOptionSetResponse)pluginParameters.OrganizationService.Execute(retrieveOptionSetRequest);
                var retrievedOptionSetMetadata = (OptionSetMetadata)retrieveOptionSetResponse.OptionSetMetadata;
                return retrievedOptionSetMetadata.Options.ToArray().Select(option => option.Value ?? 0).ToArray();
            }
        }

        private static string GetMockInstanceId(PluginParameters pluginParameters)
        {
            return pluginParameters.ExecutionContext.InitiatingUserId.ToString();
        }
    }
}
