namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.DeleteTaskDefinition
{
    using System;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;

    public interface IDeleteTaskDefinitionDal : IBasePluginDal
    {
        bool HasRelatedTasks();
    }
}
