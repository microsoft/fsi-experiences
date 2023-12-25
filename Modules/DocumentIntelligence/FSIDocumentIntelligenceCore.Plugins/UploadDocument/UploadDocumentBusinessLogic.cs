namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.UploadDocument
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins;
    using Microsoft.CloudForFSI.Infra;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Infra.Plugins.Validation;
    using Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules;
    using Microsoft.CloudForFSI.OptionSets;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class UploadDocumentBusinessLogic
    {
        private readonly IDocumentDal documentDal;
        private readonly ILoggerService logger;
        private readonly TransactionCollectionOperation operation;

        private UploadDocumentRequestParameters uploadDocumentRequestParameters;
        private readonly string loggerContext;

        public UploadDocumentBusinessLogic(IDocumentDal documentDal, ILoggerService logger)
        {
            this.documentDal = documentDal;
            this.logger = logger;
            this.uploadDocumentRequestParameters = new UploadDocumentRequestParameters();
            this.loggerContext = this.GetType().Name;
            this.operation = new TransactionCollectionOperation();
        }

        public PluginResult Execute()
        {
            ParseRequiredParameters();
            var requiredParametersValidation = ValidateInputParameters(uploadDocumentRequestParameters);
            
            if (requiredParametersValidation.IsFailure)
            {
                return requiredParametersValidation;
            }

            var typeAndSizeValidation = ValidateTypeAndSize();

            if (typeAndSizeValidation.IsFailure)
            {
                return typeAndSizeValidation;
            }

            var documentRequestResult = documentDal.GetDocumentRequest(uploadDocumentRequestParameters.Target);

            if (documentRequestResult.IsFailure)
            {
                return documentRequestResult;
            }

            var documentRequest = documentRequestResult.Value;
            var relatedDefinition = GetRelatedDocumentDefinition(documentRequest);
            var uploadTime = DateTime.UtcNow;

            CreateNewDocumentOrUpdateExisting(documentRequest, relatedDefinition, uploadTime);

            var annotation = new Annotation
            {
                AnnotationId = Guid.NewGuid(),
                Subject = documentRequest.msfsi_Name,
                FileName = uploadDocumentRequestParameters.FileName,
                MimeType = uploadDocumentRequestParameters.FileType,
                DocumentBody = uploadDocumentRequestParameters.FileBody,
                ObjectId = documentRequest.msfsi_document,
                IsDocument = true,
            };

            UpdateDocumentRequestFields(documentRequest, relatedDefinition, uploadTime);

            operation.AddCreateRequest(annotation);
            operation.AddUpdateRequest(documentRequest, true); // if trying to update the same documentRequest, operation will fail

            var executeResult = documentDal.ExecuteInOneTransaction(operation.requests);

            if (executeResult.IsFailure)
            {
                return executeResult;
            }

            logger.LogInformation($"Upload document successfully to request with id {documentRequest.Id}.", loggerContext);

            this.documentDal.SetOutput(DocumentsConstants.Upload_DocumentRequestResponse, uploadDocumentRequestParameters.Target);
            this.documentDal.SetOutput(DocumentsConstants.DocumentResponse, documentRequest.msfsi_document);
            this.documentDal.SetOutput(DocumentsConstants.AnnotationResponse, annotation.ToEntityReference());
            return typeAndSizeValidation;
        }

        private msfsi_documentdefinition GetRelatedDocumentDefinition(msfsi_documentrequest documentRequest)
        {
            var relationship = new Relationship(nameof(msfsi_documentrequest.msfsi_msfsi_documentrequest_documentdefinition_).GetRelationshipSchemaName<msfsi_documentrequest>());
            if (documentRequest.RelatedEntities.TryGetValue(relationship, out var relatedDefinition))
            {
                return relatedDefinition?.Entities?.FirstOrDefault()?.ToEntity<msfsi_documentdefinition>();
            }

            return new msfsi_documentdefinition();
        }

        private void CreateNewDocumentOrUpdateExisting(msfsi_documentrequest documentRequest, msfsi_documentdefinition relatedDefinition, DateTime uploadTime)
        {
            msfsi_document document;
            if (documentRequest?.msfsi_document != default)
            {
                var annotations = documentDal.RetrieveRecords<Annotation>(
                    Annotation.EntityLogicalName,
                    Array.Empty<string>(),
                    new Dictionary<string, object>()
                    {
                        { nameof(Annotation.ObjectId).GetAttributeLogicalName<Annotation>(), documentRequest.msfsi_document.Id },
                        { nameof(Annotation.IsDocument).GetAttributeLogicalName<Annotation>(), true },
                    });

                foreach (var note in annotations)
                {
                    var entityReference = note.ToEntityReference();
                    operation.AddDeleteRequest(entityReference);
                    logger.LogInformation($"Delete {entityReference.LogicalName} {entityReference.Id}" +
                        $"{(documentRequest.Id != default ? $" related to document request {documentRequest.Id}" : "")}.", loggerContext);

                }

                document = documentDal.RetrieveRecord<msfsi_document>(
                    msfsi_document.EntityLogicalName,
                    documentRequest.msfsi_document.Id,
                    DocumentsConstants.DocumentColumnsNames);

                document.msfsi_sentdate = uploadTime;
                operation.AddUpdateRequest(document);
            }
            else
            {
                document = new msfsi_document
                {
                    msfsi_documentId = Guid.NewGuid(),
                    msfsi_name = documentRequest.msfsi_Name,
                    msfsi_sentdate = uploadTime,
                    msfsi_type = relatedDefinition?.msfsi_type,
                };

                documentRequest.msfsi_document = document.ToEntityReference();
                operation.AddCreateRequest(document);
            }
        }

        private void UpdateDocumentRequestFields(msfsi_documentrequest documentRequest, msfsi_documentdefinition relatedDefinition, DateTime uploadTime)
        {
            documentRequest.msfsi_state = msfsi_Documentstate.Pendingreview;
            documentRequest.msfsi_stateupdatedon = uploadTime;
            documentRequest.msfsi_uploadedon = uploadTime;
            documentRequest.msfsi_isautoupdated = false;
            documentRequest.msfsi_latestpipeline = null;
            documentRequest.msfsi_hasautomaticflow = relatedDefinition?.msfsi_hasautomaticflow;
            documentRequest.RelatedEntities.Clear();
        }

        private void ParseRequiredParameters()
        {
            documentDal.TryGetInputParameter(nameof(uploadDocumentRequestParameters.Target), out uploadDocumentRequestParameters.Target);
            documentDal.TryGetInputParameter(nameof(uploadDocumentRequestParameters.FileName), out uploadDocumentRequestParameters.FileName);
            documentDal.TryGetInputParameter(nameof(uploadDocumentRequestParameters.FileType), out uploadDocumentRequestParameters.FileType);
            documentDal.TryGetInputParameter(nameof(uploadDocumentRequestParameters.FileBody), out uploadDocumentRequestParameters.FileBody);
        }

        private int BytesCountToBase64Length(int bytesCount)
        {
            return ((4 * bytesCount / 3) + 3) & ~3;
        }

        private PluginResult ValidateInputParameters(UploadDocumentRequestParameters requestParameters)
        {
            var result = new Validator<UploadDocumentRequestParameters>()
                .AddRule(new MandatoryFieldValidationRule<UploadDocumentRequestParameters>(nameof(requestParameters.Target)))
                .AddRule(new MandatoryFieldValidationRule<UploadDocumentRequestParameters>(nameof(requestParameters.FileName)))
                .AddRule(new MandatoryFieldValidationRule<UploadDocumentRequestParameters>(nameof(requestParameters.FileType)))
                .AddRule(new MandatoryFieldValidationRule<UploadDocumentRequestParameters>(nameof(requestParameters.FileBody)))
                .Validate(requestParameters);

            return result;
        }

        private PluginResult ValidateTypeAndSize()
        {
            var supportedTypesResult = documentDal.GetSupportedTypesFromEnvironment();
            if (supportedTypesResult.IsFailure)
            {
                return supportedTypesResult;
            }

            if (!supportedTypesResult.Value.Contains(uploadDocumentRequestParameters.FileType))
            {
                return PluginResult.Fail($"Type {uploadDocumentRequestParameters.FileType} is not supported. Supported types: " +
                    $"{string.Join(", ", supportedTypesResult.Value)}.", FSIErrorCodes.FSIErrorCode_IllegalUserInput, string.Empty);
            }

            var maxSizeInBytes = documentDal.GetFileMaxSizeInBytes();
            if (uploadDocumentRequestParameters.FileBody.Length > BytesCountToBase64Length(maxSizeInBytes))
            {
                return PluginResult.Fail(
                    $"File too big, max permitted size is {maxSizeInBytes} bytes.",
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    string.Empty);
            }

            return PluginResult.Ok();
        }
    }
}
