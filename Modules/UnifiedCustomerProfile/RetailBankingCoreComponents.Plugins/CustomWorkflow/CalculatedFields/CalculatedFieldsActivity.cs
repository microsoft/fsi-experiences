namespace Microsoft.CloudForFSI.CustomWorkflow.CI.Integration
{
    using System;
    using System.Activities;
    using Microsoft.CloudForFSI.Infra.CI.Services;
    using Microsoft.CloudForFSI.Infra.CustomWorkflow;
    using Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.CustomWorkflow.CalculatedFields;
    using Xrm.Sdk;
    using Xrm.Sdk.Workflow;
    using Newtonsoft.Json;

    public sealed class CalculatedFieldsActivity : BaseCodeActivity
    {
        [Input("ContactId")]
        public InArgument<string> ContactId { get; set; }
        
        [Output("CalculatedFields")]
        public OutArgument<string> CalculatedFields { get; set; }

        public CiArtifactManager Manager { get; set; }

        private const string EntityType = "contact";

        private string GetExtractedContactId()
        {
            var extractedContactId = this.CodeActivityContext.GetValue(this.ContactId);
            if (this.ContactId == null || string.IsNullOrWhiteSpace(extractedContactId))
            {
                throw new InvalidPluginExecutionException($"Input argument {nameof(this.ContactId)} cannot be empty");
            }

            return extractedContactId;
        }

        public override void RunBusinessLogic()
        {
            var extractedContactId = this.GetExtractedContactId();
            var output = new CalculatedFieldsActivityOutput()
            {
                ContactId = extractedContactId,
                Value = new ContactCalculatedFields()
                {
                    Assets = 0
                }
            };

            try
            {
                this.CalculatedFields.Set(this.CodeActivityContext, JsonConvert.SerializeObject(output));
            }
            catch (Exception e)
            {
                this.TracingService.Trace($"Failed to parse output {output}. error message: {e.Message}");
                this.CalculatedFields.Set(this.CodeActivityContext, string.Empty);
            }
        }
    }
}
