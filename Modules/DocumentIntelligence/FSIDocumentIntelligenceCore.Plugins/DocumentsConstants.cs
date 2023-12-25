namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins
{
    using Microsoft.CloudForFSI.Tables;

    public class DocumentsConstants
    {
        public const string UploadMessageName = "msfsi_UploadDocument";
        public const string DeleteMessageName = "msfsi_DeleteDocument";

        public const string Upload_DocumentRequestResponse = "DocumentRequestId";
        public const string DocumentResponse = "DocumentId";
        public const string AnnotationResponse = "AnnotationId";

        public const string Delete_DocumentRequestResponse = "DocumentRequestId";

        public const int DefaultMaxSize = 5120;

        public const string SupportedTypesEnvVariableName = "msfsi_supportedfiletypes";

        public static readonly string[] DocumentRequestColumnsNames = new string[]
        {
            msfsi_documentrequest.PrimaryIdAttribute,
            msfsi_documentrequest.PrimaryNameAttribute,
            nameof(msfsi_documentrequest.msfsi_document).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.msfsi_documentdefinition).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.msfsi_state).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.msfsi_stateupdatedon).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.msfsi_isautoupdated).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.msfsi_uploadedon).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.VersionNumber).GetAttributeLogicalName<msfsi_documentrequest>(),
            nameof(msfsi_documentrequest.msfsi_hasautomaticflow).GetAttributeLogicalName<msfsi_documentrequest>(),
        };

        public static readonly string[] DocumentColumnsNames = new string[]
        {
            msfsi_document.PrimaryIdAttribute,
            nameof(msfsi_document.msfsi_sentdate).GetAttributeLogicalName<msfsi_document>(),
        };
    }
}