namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.UploadDocument
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    public class SupportedFileTypeObject
    {
        public string[] extensions { get; set; }
        public string[] mimeTypes { get; set; }
    }
}
