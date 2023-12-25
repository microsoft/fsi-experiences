namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.DeleteTaskDefinition
{
    using System;
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Dtp.Bas.FSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class DeleteTaskDefinitionDal : BasePluginDal, IDeleteTaskDefinitionDal
    {
        private Guid preImageTaskDefinitionGuid;
        private readonly string PreImageTaskDefinitionName = "PreImageTaskDefinitionName";
        public DeleteTaskDefinitionDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext)
            : base(logger, organizationService, executionContext)
        {
            var isSuccess = TryGetPreImage<msfsi_taskdefinition>(PreImageTaskDefinitionName, out var taskDefinition);
            if (isSuccess)
            {
                preImageTaskDefinitionGuid = (Guid)taskDefinition.Attributes[msfsi_taskdefinition.PrimaryIdAttribute];
            }
            else
            {
                logger.LogError("Deleted task definition was not found in the system.");
            }
        }

        public bool HasRelatedTasks()
        => QueryByGuid(Task.EntityLogicalName,
              nameof(Task.msfsi_taskdefinition).GetAttributeLogicalName<Task>(),
              preImageTaskDefinitionGuid).Any();
        }
}
