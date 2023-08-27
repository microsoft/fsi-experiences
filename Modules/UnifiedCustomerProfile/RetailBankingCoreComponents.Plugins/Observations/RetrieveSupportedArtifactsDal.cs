namespace Microsoft.CloudForFSI.FSIRetailBankingCoreComponents.Plugins.Observations
{
    using System;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Metadata;

    public class RetrieveSupportedArtifactsDal : BaseCustomApiDal, IRetrieveSupportedArtifactsDal
    {
        public RetrieveSupportedArtifactsDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext)
            : base(logger, organizationService, executionContext)
        {
            observationsEntities = this.GetExistingSchemas(ObservationsConstants.ObservationsEntities)?.ToArray();
        }

        public EntityMetadata[] observationsEntities { get; }

        public bool IsEntityExists(string entityLogicalName)
        {
            return Array.Exists(observationsEntities,
                entityMetaData => entityMetaData.LogicalName.Equals(entityLogicalName));
        }
    }
}
