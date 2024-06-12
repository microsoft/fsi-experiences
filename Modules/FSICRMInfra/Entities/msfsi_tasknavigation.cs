namespace Microsoft.CloudForFSI.Tables
{
    public partial class msfsi_tasknavigation
    {
        public static string DetailsFieldName = nameof(msfsi_navigationdetails).GetAttributeLogicalName<msfsi_tasknavigation>();
        public static string TypeFieldName = nameof(msfsi_navigationtype).GetAttributeLogicalName<msfsi_tasknavigation>();
        public static string TaskFormFieldName = nameof(msfsi_taskform).GetAttributeLogicalName<msfsi_tasknavigation>();
    }
}
