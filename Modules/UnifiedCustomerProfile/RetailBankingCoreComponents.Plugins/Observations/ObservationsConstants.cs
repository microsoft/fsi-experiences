namespace Microsoft.CloudForFSI.FSIRetailBankingCoreComponents.Plugins.Observations
{
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.OptionSets;
    using Microsoft.CloudForFSI.Tables;

    public static class ObservationsConstants
    {
        public const string MessageName = "msfsi_RetrieveSupportedArtifacts";
        public const string ArtifactTypeParameter = "ArtifactType";
        public const string InternalNameParameter = "InternalArtifactName";
        public const string OutputParameterName = "SupportedArtifacts";

        public static readonly List<string> ObservationsEntities = new List<string>
        {
            msfsi_artifactmapping.EntityLogicalName,
            msdynci_prediction.EntityLogicalName,
            msdynci_segmentmembership.EntityLogicalName,
            msdynci_customermeasure.EntityLogicalName,
        };

        public static readonly IReadOnlyDictionary<msfsi_ArtifactType?, string> ArtifactTypeToEntityName = new Dictionary<msfsi_ArtifactType?, string>
        {
            { msfsi_ArtifactType.Model, msdynci_prediction.EntityLogicalName },
            { msfsi_ArtifactType.Segment, msdynci_segmentmembership.EntityLogicalName },
            { msfsi_ArtifactType.Measure, msdynci_customermeasure.EntityLogicalName }
        };
    }
}
