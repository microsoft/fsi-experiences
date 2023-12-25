namespace Microsoft.CloudForFSI.OnboardingEssentialsBase.Plugins.SetProcess
{
    using Microsoft.Crm.Sdk.Messages;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Workflow;
    using System.Activities;
    using Microsoft.CloudForFSI.Infra.CustomWorkflow;

    public class SetProcess: BaseCodeActivity
    {
        [RequiredArgument]
        [Input("Application")]
        [ReferenceTarget("msfsi_application")]
        public InArgument<EntityReference> Application { get; set; }

        [RequiredArgument]
        [Input("ProcessId")]
        [ReferenceTarget("workflow")]
        public InArgument<EntityReference> ProcessId { get; set; }

        private EntityReference GetExtractedApplication()
        {
            var extractedApplication = this.Application.Get(this.CodeActivityContext);
            if (this.Application == null )
            {
                throw new InvalidPluginExecutionException($"Input argument {nameof(this.Application)} cannot be empty");
            }

            return extractedApplication;
        }

        private EntityReference GetExtractedProcess()
        {
            var extractedProcessId = this.ProcessId.Get(this.CodeActivityContext);
            if (this.ProcessId == null)
            {
                throw new InvalidPluginExecutionException($"Input argument {nameof(this.ProcessId)} cannot be empty");
            }

            return extractedProcessId;
        }

        public override void RunBusinessLogic()
        {
            var extractedApplication = this.GetExtractedApplication();
            var extractedProcess = this.GetExtractedProcess();

            SetProcessRequest req = new SetProcessRequest();
            req.Target = extractedApplication;
            req.NewProcess = extractedProcess;
            SetProcessResponse res = (SetProcessResponse)this.OrganizationService.Execute(req);
        }
    }
}
