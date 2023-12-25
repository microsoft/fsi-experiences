namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;
    public partial class msfsi_application : IDeactivatable
    {
        public static string DetailsIdFieldName = nameof(msfsi_application.msfsi_detailsid).GetAttributeLogicalName<msfsi_application>();
        public static string PrimaryApplicantFieldName = nameof(msfsi_application.msfsi_primaryapplicant).GetAttributeLogicalName<msfsi_application>();

        public void Deactivate()
        {
            this.StatusCode = msfsi_application_StatusCode.Inactive;
            this.StateCode = msfsi_applicationState.Inactive;
        }
    }
}