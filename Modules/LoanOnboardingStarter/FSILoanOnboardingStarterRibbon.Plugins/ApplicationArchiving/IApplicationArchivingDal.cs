namespace Microsoft.CloudForFSI.LoanOnboardingStarterRibbon.Plugins
{
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using System;
    using System.Collections.Generic;

    public interface IApplicationArchivingDal : IBasePluginDal
    {
        msfsi_application Application { get; }
        List<Entity> GetRelatedEntities(string entityName, string relationFieldName, string[] columns);
        List<Entity> GetSubRelatedEntities(string entityName, List<Guid> entitiesIds , string relationFieldName, string[] columns);
    }
}
