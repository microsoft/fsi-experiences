namespace Microsoft.CloudForFSI.Tables
{
    public partial class msfsi_onboardingform
    {
        public static string FormIdFieldName = nameof(msfsi_onboardingform.msfsi_formid).GetAttributeLogicalName<msfsi_onboardingform>();
        public static string EntityNameFieldName = nameof(msfsi_onboardingform.msfsi_entityname).GetAttributeLogicalName<msfsi_onboardingform>();
        public msfsi_onboardingform(SystemForm systemFormEntity)
        {
            this.msfsi_onboardingformId = systemFormEntity.Id;
            this.msfsi_name = systemFormEntity.Name;
            this.msfsi_entityname = systemFormEntity.ObjectTypeCode;
            this.msfsi_formid = systemFormEntity.FormId.ToString();
        }
    }
}
