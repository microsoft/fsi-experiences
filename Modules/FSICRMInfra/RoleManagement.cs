namespace Microsoft.CloudForFSI.Infra
{
    using System;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public static class RoleManagement
    {
        public static bool HasAdminRole(Guid userId, IOrganizationService service)
        {
            return HasRole(userId, Constants.SystemAdministratorRoleId, service);
        }

        public static bool HasRole(Guid userId, Guid userRoleId, IOrganizationService service)
        {
            var query = new QueryExpression("role");
            query.Criteria.AddCondition("roletemplateid", ConditionOperator.Equal, userRoleId);
            var link = query.AddLink("systemuserroles", "roleid", "roleid");
            link.LinkCriteria.AddCondition("systemuserid", ConditionOperator.Equal, userId);

            return service.RetrieveMultiple(query).Entities.Count > 0;
        }
    }
}