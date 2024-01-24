namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.UploadDocument
{
    using Microsoft.Xrm.Sdk;

    public class UploadDocumentRequestParameters
    {
        public EntityReference Target;
        public string FileType;
        public string FileName;
        public string FileBody;
    }
}
