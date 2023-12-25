namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.GetTasks
{
    using System;
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;

    public interface IGetTasksDal : IBaseCustomApiDal
    {
        IEnumerable<msfsi_onboardingform> GetOnboardingForms();
        IEnumerable<Task> GetTasksForApplication(string application, string processStage, bool shouldGetCanceledTasks);
        IEnumerable<msfsi_tasknavigation> GetTaskNavigations(List<Guid> ids);
    }
}