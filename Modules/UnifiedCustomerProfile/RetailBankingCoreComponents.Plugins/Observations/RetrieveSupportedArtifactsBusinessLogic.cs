namespace Microsoft.CloudForFSI.FSIRetailBankingCoreComponents.Plugins.Observations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class RetrieveSupportedArtifactsBusinessLogic : IPluginBusinessLogic
    {
        private readonly IRetrieveSupportedArtifactsDal dal;
        private readonly ILoggerService logger;

        public RetrieveSupportedArtifactsBusinessLogic(ILoggerService logger, IRetrieveSupportedArtifactsDal dal)
        {
            this.dal = dal;
            this.logger = logger;
        }

        public PluginResult Execute()
        {
            var supportedArtifacts = new EntityCollection();

            if (this.dal.IsEntityExists(msfsi_artifactmapping.EntityLogicalName))
            {
                supportedArtifacts.EntityName = msfsi_artifactmapping.EntityLogicalName;
                var artifacts = this.dal.RetrieveRecords<msfsi_artifactmapping>(
                    msfsi_artifactmapping.EntityLogicalName,
                     new string[]
                     {
                        nameof(msfsi_artifactmapping.msfsi_artifacttype).GetAttributeLogicalName<msfsi_artifactmapping>(),
                        nameof(msfsi_artifactmapping.msfsi_fsiartifactname).GetAttributeLogicalName<msfsi_artifactmapping>(),
                        nameof(msfsi_artifactmapping.msfsi_ciartifactname).GetAttributeLogicalName<msfsi_artifactmapping>()
                     },
                     GetFilters());
                
                supportedArtifacts.Entities.AddRange(artifacts?.Where(artifact => artifact.msfsi_artifacttype != default &&
                    this.dal.IsEntityExists(ObservationsConstants.ArtifactTypeToEntityName[artifact.msfsi_artifacttype]))
                    ?.Select(artifact => artifact.ToEntity<Entity>()));
            }
            else
            {
                supportedArtifacts.EntityName = "entity";
            }

            this.dal.SetOutput(ObservationsConstants.OutputParameterName, supportedArtifacts);
            return PluginResult.Ok();
        }

        private Dictionary<string, object> GetFilters()
        {
            var filters = new Dictionary<string, object>();
            OptionSetValue typeFilter;
            OptionSetValue internalNameFilter;

            if (this.dal.TryGetInputParameter(ObservationsConstants.ArtifactTypeParameter, out typeFilter))
            {
                filters.Add(nameof(msfsi_artifactmapping.msfsi_artifacttype).GetAttributeLogicalName<msfsi_artifactmapping>(),
                    typeFilter.Value);
            }

            if (this.dal.TryGetInputParameter(ObservationsConstants.InternalNameParameter, out internalNameFilter))
            {
                filters.Add(nameof(msfsi_artifactmapping.msfsi_fsiartifactname).GetAttributeLogicalName<msfsi_artifactmapping>(),
                    internalNameFilter.Value);
            }

            return filters;
        }
    }
}
