namespace Microsoft.CloudForFSI.Tables
{
    public partial class SystemUser
    {
        public static string ModifiedByFieldName = nameof(SystemUser.ModifiedBy).GetAttributeLogicalName<SystemUser>();
        public static string FullNameFieldName = nameof(SystemUser.FullName).GetAttributeLogicalName<SystemUser>();
    }
}
