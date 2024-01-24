namespace Microsoft.CloudForFSI.Infra.CustomWorkflow
{
    using System.Activities;
    using Xrm.Sdk;
    using Xrm.Sdk.Workflow;

    public abstract class BaseCodeActivity : CodeActivity
    {
        public CodeActivityContext CodeActivityContext { get; private set; }

        public ITracingService TracingService { get; private set; }

        public IWorkflowContext WorkflowContext { get; private set; }

        public IOrganizationService OrganizationService { get; private set; }

        protected override void Execute(CodeActivityContext codeActivityContext)
        {
            this.CodeActivityContext = codeActivityContext ?? 
                               throw new InvalidPluginExecutionException("ExecutionContext cannot be null.");

            this.TracingService = codeActivityContext.GetExtension<ITracingService>() ?? 
                                  throw new InvalidPluginExecutionException("Failed to get TracingService.");

            this.WorkflowContext = codeActivityContext.GetExtension<IWorkflowContext>() ??
                                   throw new InvalidPluginExecutionException("Failed to get WorkflowContext.");
            
            var serviceFactory = codeActivityContext.GetExtension<IOrganizationServiceFactory>() ??
                                 throw new InvalidPluginExecutionException("Failed to get OrganizationServiceFactory.");

            this.OrganizationService = serviceFactory.CreateOrganizationService(this.WorkflowContext.UserId) ??
                                       throw new InvalidPluginExecutionException("Failed to get OrganizationService for UserId = " + this.WorkflowContext.UserId);

            this.RunBusinessLogic();
        }

        public abstract void RunBusinessLogic();
    }
}
