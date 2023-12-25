namespace Microsoft.CloudForFSI.LoanOnboardingStarterRibbon.Plugins
{
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using System;
    using System.Collections.Generic;

    public class ApplicationArchivingDal : BasePluginDal, IApplicationArchivingDal
    {
        public ApplicationArchivingDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext) 
            : base(logger, organizationService, executionContext)
        {
            TryGetTarget<msfsi_application>(out var application);
            Application = application;
        }

        public msfsi_application Application { get; }
         
        public List<Entity> GetRelatedEntities(string entityName, string relationFieldName, string[] columns)
            => QueryByGuid(entityName, relationFieldName, Application.Id, columns);

        public List<Entity> GetSubRelatedEntities(string entityName, List<Guid> entitiesIds, string relationFieldName, string[] columns)
            => QueryByGuidList(entityName, relationFieldName, entitiesIds, columns);
    }
}
