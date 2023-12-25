namespace Microsoft.CloudForFSI.Tables
{
    using Microsoft.CloudForFSI.OptionSets;
    using Xrm.Sdk;

    public partial class Task : IDeactivatable
    {
        public static string TaskDefinitionFieldName = nameof(msfsi_taskdefinition).GetAttributeLogicalName<Task>();
        public static string StatusCodeFieldName = nameof(StatusCode).GetAttributeLogicalName<Task>();
        public static string StateCodeFieldName = nameof(StateCode).GetAttributeLogicalName<Task>();
        public static string ModifiedOnFieldName = nameof(ModifiedOn).GetAttributeLogicalName<Task>();
        public static string CreatedOnFieldName = nameof(CreatedOn).GetAttributeLogicalName<Task>();
        public static string RegardingObjectIdFieldName = nameof(RegardingObjectId).GetAttributeLogicalName<Task>();
        public static string RelatedPartyContractFieldName = nameof(msfsi_relatedpartycontract).GetAttributeLogicalName<Task>();
        public static string CommentNameFieldName = nameof(msfsi_comment).GetAttributeLogicalName<Task>();
        public static string CommentModifiedByFieldName = nameof(msfsi_commentmodifiedby).GetAttributeLogicalName<Task>();
        public static string CommentModifiedOnFieldName = nameof(msfsi_commentmodifiedon).GetAttributeLogicalName<Task>();

        public void Deactivate()
        {
            this.StatusCode = Task_StatusCode.Canceled;
            this.StateCode = TaskState.Canceled;
        }
    }
}