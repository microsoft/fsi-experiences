namespace Microsoft.CloudForFSI.Tables
{
    public partial class msfsi_taskdefinition
    {
        public static string NameFieldName = nameof(msfsi_Name).GetAttributeLogicalName<msfsi_taskdefinition>();
        public static string AssociationTypeFieldName = nameof(msfsi_associationtype).GetAttributeLogicalName<msfsi_taskdefinition>();
        public static string TaskGroupFieldName = nameof(msfsi_taskgroup).GetAttributeLogicalName<msfsi_taskdefinition>();
        public static string TaskNavigationFieldName = nameof(msfsi_tasknavigation).GetAttributeLogicalName<msfsi_taskdefinition>();
        public static string ProcessStageFieldName = nameof(msfsi_processstage).GetAttributeLogicalName<msfsi_taskdefinition>();
        public static string TaskTypeName = nameof(msfsi_tasktype).GetAttributeLogicalName<msfsi_taskdefinition>();
    }
}
