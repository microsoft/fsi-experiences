namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins
{
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public interface IDocumentDal : IBaseCustomApiDal
    {
        PluginResult<msfsi_documentrequest> GetDocumentRequest(EntityReference documentRequestId);
        int GetFileMaxSizeInBytes();
        PluginResult<string[]> GetSupportedTypesFromEnvironment();
    }
}