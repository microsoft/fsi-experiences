namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.GetTasks
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Query;

    public class GetTasksDal : BaseCustomApiDal, IGetTasksDal
    {
        public GetTasksDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext) : base(logger, organizationService, executionContext)
        {
        }

        public IEnumerable<msfsi_onboardingform> GetOnboardingForms()
         => RetrieveRecords<msfsi_onboardingform>(msfsi_onboardingform.EntityLogicalName, new string[] 
            { 
                msfsi_onboardingform.FormIdFieldName, 
                msfsi_onboardingform.EntityNameFieldName, 
            }
        );
        public IEnumerable<Task> GetTasksForApplication(string application, string processStage, bool shouldGetCanceledTasks)
        => RetrieveRecords<Task>(new FetchExpression(GetTasksUtils.FetchTasksQuery(application, processStage, shouldGetCanceledTasks)));

        public IEnumerable<msfsi_tasknavigation> GetTaskNavigations(List<Guid> ids)
        => QueryByGuidList(msfsi_tasknavigation.EntityLogicalName, msfsi_tasknavigation.PrimaryIdAttribute, ids, new string[]
            {
                msfsi_tasknavigation.PrimaryIdAttribute,
                msfsi_tasknavigation.TaskFormFieldName,
            }
        ).Cast<msfsi_tasknavigation>();
    }
}