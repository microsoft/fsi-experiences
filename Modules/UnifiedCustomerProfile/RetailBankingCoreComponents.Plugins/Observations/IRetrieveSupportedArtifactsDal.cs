namespace Microsoft.CloudForFSI.FSIRetailBankingCoreComponents.Plugins.Observations
{
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.Xrm.Sdk.Metadata;

    public interface IRetrieveSupportedArtifactsDal : IBaseCustomApiDal
    {
        EntityMetadata[] observationsEntities { get; }
        bool IsEntityExists(string entityName);
    }
}
