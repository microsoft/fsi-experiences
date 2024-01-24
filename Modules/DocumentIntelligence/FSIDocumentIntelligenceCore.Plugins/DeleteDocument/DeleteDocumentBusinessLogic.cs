namespace Microsoft.CloudForFSI.FSIDocumentIntelligenceCore.Plugins.DeleteDocument
{
    using System;
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Infra.Plugins.Validation;
    using Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules;
    using Microsoft.CloudForFSI.OptionSets;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class DeleteDocumentBusinessLogic
    {
        private readonly IDocumentDal documentDal;
        private readonly ILoggerService logger;
        private readonly TransactionCollectionOperation operation;

        private readonly string loggerContext;
        private DeleteDocumentParameters deleteDocumentRequestParameters;

        public DeleteDocumentBusinessLogic(IDocumentDal documentDal, ILoggerService logger)
        {
            this.documentDal = documentDal;
            this.logger = logger;
            this.deleteDocumentRequestParameters = new DeleteDocumentParameters();
            this.loggerContext = this.GetType().Name;
            this.operation = new TransactionCollectionOperation();
        }

        public PluginResult Execute()
        {
            ParseRequiredParameters();
            
            var result = ValidateInputParameters();

            if (result.IsFailure)
            {
                return result;
            }

            var documentRequest = GetDocumentRequest();

            if (documentRequest == null)
            {
                return PluginResult.Fail<msfsi_documentrequest>($"Failed to fetch document request", FSIErrorCodes.FSIErrorCode_IllegalUserInput, string.Empty);
            }

            DeleteDocumentAndAnnotation(documentRequest);

            DeleteOrUpdateDocumentRequest(documentRequest);
            
            var executeResult = documentDal.ExecuteInOneTransaction(operation.requests);

            if (executeResult.IsFailure)
            {
                return executeResult;
            }

            logger.LogInformation($"Delete the records related to document request {documentRequest.Id}.", loggerContext);

            this.documentDal.SetOutput(DocumentsConstants.Delete_DocumentRequestResponse, deleteDocumentRequestParameters.Target);
            return PluginResult.Ok();
        }

        private void DeleteDocumentAndAnnotation(msfsi_documentrequest documentRequest)
        {
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
                    LogDeleteOperation(entityReference, loggerContext, documentRequest.Id);
                }

                operation.AddDeleteRequest(documentRequest.msfsi_document);
                LogDeleteOperation(documentRequest.msfsi_document, loggerContext, documentRequest.Id);
            }
        }

        private void DeleteOrUpdateDocumentRequest(msfsi_documentrequest documentRequest)
        {
            if (deleteDocumentRequestParameters.DeleteRequest)
            {
                operation.AddDeleteRequest(deleteDocumentRequestParameters.Target);
                LogDeleteOperation(deleteDocumentRequestParameters.Target, loggerContext);
            }
            else
            {
                UpdateDocumentRequestFields(documentRequest);
                operation.AddUpdateRequest(documentRequest);
            }
        }

        private void ParseRequiredParameters()
        {
            documentDal.TryGetInputParameter(nameof(deleteDocumentRequestParameters.Target), out deleteDocumentRequestParameters.Target);
            documentDal.TryGetInputParameter(nameof(deleteDocumentRequestParameters.DeleteRequest), out deleteDocumentRequestParameters.DeleteRequest);
        }

        private msfsi_documentrequest GetDocumentRequest()
        {
            return documentDal.RetrieveRecord<msfsi_documentrequest>(
                msfsi_documentrequest.EntityLogicalName,
                deleteDocumentRequestParameters.Target.Id,
                new string[] { nameof(msfsi_documentrequest.msfsi_document).GetAttributeLogicalName<msfsi_documentrequest>() });
        }

        private PluginResult ValidateInputParameters()
        {
            return new Validator<DeleteDocumentParameters>()
                .AddRule(new MandatoryFieldValidationRule<DeleteDocumentParameters>(nameof(deleteDocumentRequestParameters.Target)))
                .Validate(deleteDocumentRequestParameters);
        }

        private void UpdateDocumentRequestFields(msfsi_documentrequest documentRequest)
        {
            documentRequest.msfsi_state = msfsi_Documentstate.Missingfile;
            documentRequest.msfsi_stateupdatedon = DateTime.UtcNow;
            documentRequest.msfsi_isautoupdated = false;
            documentRequest.msfsi_uploadedon = null;
            documentRequest.msfsi_latestpipeline = null;
            documentRequest.msfsi_document = null;
        }

        private void LogDeleteOperation(EntityReference entityReference, string context, Guid relatedRequestId = default)
        {
            logger.LogInformation($"Delete {entityReference.LogicalName} {entityReference.Id}" +
                $"{(relatedRequestId != default ? $" related to document request {relatedRequestId}" : "")}.", context);
        }
    }
}
