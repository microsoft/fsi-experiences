namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins
{
    using Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.UploadDocument;
    using Microsoft.CloudForFSI.Infra;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Messages;
    using Microsoft.Xrm.Sdk.Query;
    using Newtonsoft.Json;

    public class DocumentDal : BaseCustomApiDal, IDocumentDal
    {
        public DocumentDal(PluginParameters pluginParameters)
            : base(pluginParameters.LoggerService, pluginParameters.OrganizationService, pluginParameters.ExecutionContext)
        {
        }

        public PluginResult<msfsi_documentrequest> GetDocumentRequest(EntityReference documentRequestId)
        {
            var relationshipQuery = new RelationshipQueryCollection();
            var relateddefinition = new QueryExpression(msfsi_documentdefinition.EntityLogicalName);
            relateddefinition.ColumnSet = new ColumnSet(
                nameof(msfsi_documentdefinition.msfsi_type).GetAttributeLogicalName<msfsi_documentdefinition>(),
                nameof(msfsi_documentdefinition.msfsi_hasautomaticflow).GetAttributeLogicalName<msfsi_documentdefinition>());
            var definitionRelationship = new Relationship(nameof(msfsi_documentrequest.msfsi_msfsi_documentrequest_documentdefinition_).GetRelationshipSchemaName<msfsi_documentrequest>());

            relationshipQuery.Add(definitionRelationship, relateddefinition);

            var request = new RetrieveRequest()
            {
                ColumnSet = new ColumnSet(DocumentsConstants.DocumentRequestColumnsNames),
                RelatedEntitiesQuery = relationshipQuery,
                Target = documentRequestId,
            };
            
            try
            {
                var response = (RetrieveResponse)this.organizationService.Execute(request);
                return PluginResult.Ok(response.Entity.ToEntity<msfsi_documentrequest>());
            }
            catch
            {
                return PluginResult.Fail<msfsi_documentrequest>($"Failed to fetch document request", FSIErrorCodes.FSIErrorCode_IllegalUserInput, string.Empty);
            }
        }

        public int GetFileMaxSizeInBytes()
        {
            var organizationEntity = this.RetrieveRecord<Organization>(
                Organization.EntityLogicalName,
                executionContext.OrganizationId,
                new string[] { nameof(Organization.MaxUploadFileSize).GetAttributeLogicalName<Organization>() });

            return organizationEntity.MaxUploadFileSize ?? DocumentsConstants.DefaultMaxSize;
        }

        public PluginResult<string[]> GetSupportedTypesFromEnvironment()
        {
            var environmentVariable = this.RetrieveEnvironmentVariableValueOrDefault(DocumentsConstants.SupportedTypesEnvVariableName);
            if (environmentVariable == default ||
                environmentVariable.Value == default ||
                !environmentVariable.Value.TryGetAttributeValue<string>(environmentVariable.FieldToQuery, out var result))
            {
                return PluginResult.Fail<string[]>($"Failed to fetch enviroment variable {DocumentsConstants.SupportedTypesEnvVariableName}", FSIErrorCodes.FSIErrorCode_ConfigurationError, string.Empty);
            }

            try
            {
                var supportedTypes =JsonConvert.DeserializeObject<SupportedFileTypeObject>(result)?.mimeTypes;
                return supportedTypes == default ?
                    PluginResult.Fail<string[]>($"Failed to parse enviroment variable {DocumentsConstants.SupportedTypesEnvVariableName}, mimeTypes is missing.", FSIErrorCodes.FSIErrorCode_ConfigurationError, string.Empty) :
                    PluginResult.Ok(supportedTypes);
            }
            catch
            {
                return PluginResult.Fail<string[]>($"Failed to parse enviroment variable {DocumentsConstants.SupportedTypesEnvVariableName}, invalid json value", FSIErrorCodes.FSIErrorCode_ConfigurationError, string.Empty);
            }
        }
    }
}